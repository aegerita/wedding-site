#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import tls from 'node:tls';
import { fileURLToPath } from 'node:url';

import { createJiti } from 'jiti';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const defaultCsvPath = path.join(repoRoot, 'docs/guest-email-recipients.csv');
const defaultWebsiteUrl = 'https://adam-and-jenny.vercel.app';
const smtpHost = 'smtp.gmail.com';
const smtpPort = 465;

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const match = /^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.exec(trimmed);

    if (!match) {
      continue;
    }

    const [, key, rawValue] = match;
    const value = rawValue
      .trim()
      .replace(/^"(.*)"$/, '$1')
      .replace(/^'(.*)'$/, '$1');

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function parseArgs(argv) {
  const args = {
    csvPath: defaultCsvPath,
    send: false,
    testName: 'Jenny',
    testTo: undefined,
    testVariant: 'ceremony',
    websiteUrl: defaultWebsiteUrl,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--send') {
      args.send = true;
      continue;
    }

    if (arg === '--csv') {
      args.csvPath = path.resolve(repoRoot, argv[index + 1]);
      index += 1;
      continue;
    }

    if (arg === '--test-name') {
      args.testName = argv[index + 1];
      index += 1;
      continue;
    }

    if (arg === '--test-to') {
      args.testTo = argv[index + 1];
      index += 1;
      continue;
    }

    if (arg === '--test-variant') {
      args.testVariant = argv[index + 1];
      index += 1;
      continue;
    }

    if (arg === '--website-url') {
      args.websiteUrl = argv[index + 1];
      index += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  if (args.testVariant !== 'ceremony' && args.testVariant !== 'receptionOnly') {
    throw new Error('--test-variant must be ceremony or receptionOnly');
  }

  return args;
}

function parseCsvLine(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const nextChar = line[index + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      current += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === ',' && !inQuotes) {
      fields.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  fields.push(current.trim());

  return fields;
}

function readRecipients(csvPath) {
  const csv = fs.readFileSync(csvPath, 'utf8').trim();
  const [headerLine, ...dataLines] = csv.split(/\r?\n/).filter(Boolean);
  const headers = parseCsvLine(headerLine);

  return dataLines.map((line) => {
    const values = parseCsvLine(line);
    const row = Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']));

    return {
      fullName: row.full_name,
      email: row.email,
      attendingCityHall: row.attending_city_hall === 'true',
    };
  });
}

function getEmailConfig() {
  const gmailUser = process.env.GMAIL_USER?.trim();
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.trim();
  const from = process.env.GUEST_REMINDER_FROM_EMAIL?.trim() || gmailUser;
  const replyTo = process.env.GUEST_REMINDER_REPLY_TO?.trim();

  return {
    from,
    gmailAppPassword,
    gmailUser,
    replyTo,
  };
}

function getVariant(recipient) {
  return recipient.attendingCityHall ? 'ceremony' : 'receptionOnly';
}

function log(message = '') {
  process.stdout.write(`${message}\n`);
}

function printDryRun(emails, skipped) {
  const ceremonyCount = emails.filter((email) => email.variant === 'ceremony').length;
  const receptionOnlyCount = emails.filter((email) => email.variant === 'receptionOnly').length;

  log('Dry run only. No emails were sent.');
  log();
  log(`Will send personalized emails to ${emails.length} people:`);
  log(`- Ceremony and reception: ${ceremonyCount}`);
  log(`- Reception only: ${receptionOnlyCount}`);

  if (skipped.length > 0) {
    log(`- Skipped because email is blank: ${skipped.map((row) => row.fullName).join(', ')}`);
  }

  log();
  log('Recipients:');

  for (const email of emails) {
    log(`- ${email.fullName} <${email.to}>: ${email.subject}`);
  }

  log();
  log('Run with --send to send these through Gmail SMTP.');
}

function extractEmailAddress(value) {
  const match = /<([^>]+)>/.exec(value);

  return match ? match[1].trim() : value.trim();
}

function escapeHeaderAddress(value) {
  const email = extractEmailAddress(value);

  if (email === value) {
    return email;
  }

  const name = value.replace(/<[^>]+>/, '').trim().replaceAll('"', '\\"');

  return `"${name}" <${email}>`;
}

function encodeHeader(value) {
  if (/^[\x00-\x7F]*$/.test(value)) {
    return value;
  }

  return `=?UTF-8?B?${Buffer.from(value, 'utf8').toString('base64')}?=`;
}

function buildMimeMessage(email, config) {
  const boundary = `wedding-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const headers = [
    `From: ${escapeHeaderAddress(config.from)}`,
    `To: ${email.fullName} <${email.to}>`,
    `Subject: ${encodeHeader(email.subject)}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ];

  if (config.replyTo) {
    headers.push(`Reply-To: ${escapeHeaderAddress(config.replyTo)}`);
  }

  return [
    ...headers,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    email.text,
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    email.html,
    '',
    `--${boundary}--`,
    '',
  ].join('\r\n');
}

function dotStuffMessage(message) {
  return message.replace(/\r?\n\./g, '\r\n..');
}

function readSmtpResponse(socket) {
  return new Promise((resolve, reject) => {
    let buffer = '';

    function cleanup() {
      socket.off('data', onData);
      socket.off('error', onError);
    }

    function onError(error) {
      cleanup();
      reject(error);
    }

    function onData(chunk) {
      buffer += chunk.toString('utf8');

      const lines = buffer.split(/\r?\n/).filter(Boolean);
      const lastLine = lines.at(-1);

      if (lastLine && /^\d{3} /.test(lastLine)) {
        cleanup();
        resolve(buffer);
      }
    }

    socket.on('data', onData);
    socket.on('error', onError);
  });
}

async function writeSmtpCommand(socket, command, expectedCodes, displayCommand = command) {
  socket.write(`${command}\r\n`);

  const response = await readSmtpResponse(socket);
  const code = Number(response.slice(0, 3));

  if (!expectedCodes.includes(code)) {
    throw new Error(`SMTP command failed: ${displayCommand}. Response: ${response.trim()}`);
  }

  return response;
}

async function withSmtpConnection(callback) {
  const socket = tls.connect({
    host: smtpHost,
    port: smtpPort,
    servername: smtpHost,
  });

  try {
    await new Promise((resolve, reject) => {
      socket.once('secureConnect', resolve);
      socket.once('error', reject);
    });

    const greeting = await readSmtpResponse(socket);

    if (!greeting.startsWith('220')) {
      throw new Error(`SMTP greeting failed: ${greeting.trim()}`);
    }

    await callback(socket);
    await writeSmtpCommand(socket, 'QUIT', [221]);
  } finally {
    socket.end();
  }
}

async function authenticateGmail(socket, config) {
  await writeSmtpCommand(socket, 'EHLO localhost', [250]);
  await writeSmtpCommand(socket, 'AUTH LOGIN', [334]);
  await writeSmtpCommand(
    socket,
    Buffer.from(config.gmailUser).toString('base64'),
    [334],
    '[gmail username]',
  );
  await writeSmtpCommand(
    socket,
    Buffer.from(config.gmailAppPassword).toString('base64'),
    [235],
    '[gmail app password]',
  );
}

async function sendEmail(email, config) {
  const message = buildMimeMessage(email, config);

  await withSmtpConnection(async (socket) => {
    await authenticateGmail(socket, config);
    await writeSmtpCommand(socket, `MAIL FROM:<${config.gmailUser}>`, [250]);
    await writeSmtpCommand(socket, `RCPT TO:<${email.to}>`, [250, 251]);
    await writeSmtpCommand(socket, 'DATA', [354]);

    socket.write(`${dotStuffMessage(message)}\r\n.\r\n`);

    const response = await readSmtpResponse(socket);
    const code = Number(response.slice(0, 3));

    if (code !== 250) {
      throw new Error(`Failed to send to ${email.to}. SMTP response: ${response.trim()}`);
    }
  });
}

async function main() {
  loadEnvFile(path.join(repoRoot, '.env.local'));
  loadEnvFile(path.join(repoRoot, '.env'));

  const args = parseArgs(process.argv.slice(2));
  const jiti = createJiti(import.meta.url);
  const { buildGuestEmailTemplate } = jiti('../src/lib/guest-email-templates.ts');
  const recipients = args.testTo
    ? [
        {
          attendingCityHall: args.testVariant === 'ceremony',
          email: args.testTo,
          fullName: args.testName,
        },
      ]
    : readRecipients(args.csvPath);
  const skipped = args.testTo ? [] : recipients.filter((recipient) => !recipient.email);
  const emails = recipients
    .filter((recipient) => recipient.email)
    .map((recipient) => {
      const variant = args.testTo ? args.testVariant : getVariant(recipient);
      const template = buildGuestEmailTemplate(variant, {
        guestName: recipient.fullName,
        websiteUrl: args.websiteUrl,
      });

      return {
        fullName: recipient.fullName,
        html: template.html,
        subject: template.subject,
        text: template.text,
        to: recipient.email,
        variant,
      };
    });

  if (!args.send) {
    printDryRun(emails, skipped);
    return;
  }

  const config = getEmailConfig();

  if (!config.gmailUser || !config.gmailAppPassword || !config.from) {
    throw new Error(
      'Set GMAIL_USER and GMAIL_APP_PASSWORD before sending. GUEST_REMINDER_FROM_EMAIL is optional and defaults to GMAIL_USER.',
    );
  }

  log(`Sending ${emails.length} personalized emails...`);

  for (const email of emails) {
    await sendEmail(email, config);
    log(`Sent ${email.fullName} <${email.to}>`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
