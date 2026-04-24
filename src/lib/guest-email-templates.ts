import { content } from '../content/site';

export type GuestEmailVariant = 'ceremony' | 'receptionOnly';

export type GuestEmailTemplateOptions = {
  guestName?: string;
  websiteUrl?: string;
  senderNames?: string;
};

export type GuestEmailTemplate = {
  variant: GuestEmailVariant;
  label: string;
  subject: string;
  previewText: string;
  html: string;
  text: string;
};

const defaultWebsiteUrl = 'https://adam-and-jenny.vercel.app';
const defaultSenderNames = 'Adam & Jenny';
const emailFontStack =
  'Iowan Old Style, Palatino Linotype, URW Palladio L, Georgia, serif';

const emailStyles = {
  background: '#191919',
  foreground: '#fafafa',
  muted: '#b8b8b8',
  border: 'rgba(255, 255, 255, 0.12)',
  card: 'rgba(22, 22, 22, 0.48)',
  primary: '#84cde8',
  primaryForeground: '#143044',
  orangeGlow: 'rgba(254, 215, 170, 0.28)',
  blueGlow: 'rgba(125, 211, 252, 0.24)',
};

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getFirstName(guestName?: string) {
  const trimmedName = guestName?.trim();

  if (!trimmedName) {
    return 'there';
  }

  return trimmedName.split(/\s+/)[0];
}

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, '');
}

function buildUrl(websiteUrl: string, path = '') {
  const baseUrl = trimTrailingSlash(websiteUrl);

  if (!path) {
    return baseUrl;
  }

  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

function buildDetailsList(items: Array<{ label: string; value: string }>) {
  return items
    .map(
      (item) => `
        <tr>
          <td style="padding: 14px 0; border-top: 1px solid ${emailStyles.border};">
            <p style="margin: 0 0 4px; color: ${emailStyles.primary}; font: 700 13px/1.4 ${emailFontStack}; text-transform: uppercase; letter-spacing: 0.14em;">${escapeHtml(item.label)}</p>
            <p style="margin: 0; color: ${emailStyles.foreground}; font: 400 16px/1.6 ${emailFontStack};">${escapeHtml(item.value)}</p>
          </td>
        </tr>
      `,
    )
    .join('');
}

function buildButton(label: string, href: string, isPrimary = false) {
  const background = isPrimary ? emailStyles.primary : emailStyles.card;
  const color = isPrimary ? emailStyles.primaryForeground : emailStyles.foreground;
  const border = isPrimary ? emailStyles.primary : emailStyles.border;

  return `
    <a href="${escapeHtml(href)}" style="display: inline-block; margin: 0 8px 10px 0; padding: 12px 18px; border: 1px solid ${border}; border-radius: 999px; background: ${background}; color: ${color}; font: 700 14px/1 ${emailFontStack}; text-decoration: none;">
      ${escapeHtml(label)}
    </a>
  `;
}

function buildHtmlLayout({
  eyebrow,
  title,
  body,
  details,
  websiteUrl,
  scheduleUrl,
  discordUrl,
  senderNames,
  previewText,
}: {
  eyebrow: string;
  title: string;
  body: string;
  details: Array<{ label: string; value: string }>;
  websiteUrl: string;
  scheduleUrl: string;
  discordUrl: string;
  senderNames: string;
  previewText: string;
}) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="dark">
    <meta name="supported-color-schemes" content="dark">
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin: 0; background: ${emailStyles.background}; color: ${emailStyles.foreground}; font-family: ${emailFontStack};">
    <div style="display: none; max-height: 0; overflow: hidden; opacity: 0;">${escapeHtml(previewText)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: ${emailStyles.background}; border-collapse: collapse;">
      <tr>
        <td align="center" style="padding: 36px 18px; background-color: ${emailStyles.background}; background-image: radial-gradient(circle at 8% 10%, ${emailStyles.blueGlow} 0, rgba(125, 211, 252, 0.14) 90px, transparent 210px), radial-gradient(circle at 92% 22%, ${emailStyles.orangeGlow} 0, rgba(254, 215, 170, 0.12) 110px, transparent 260px), radial-gradient(circle at 22% 92%, ${emailStyles.orangeGlow} 0, rgba(254, 215, 170, 0.10) 140px, transparent 300px);">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width: 100%; max-width: 640px; border-collapse: collapse;">
            <tr>
              <td style="padding: 0 0 18px;">
                <p style="margin: 0; color: ${emailStyles.muted}; font: 700 12px/1.6 ${emailFontStack}; text-transform: uppercase; letter-spacing: 0.32em;">May 1, 2026 · Toronto</p>
                <h1 style="margin: 12px 0 0; color: ${emailStyles.foreground}; font: 700 44px/1.05 ${emailFontStack}; letter-spacing: 0;">Adam &amp; Jenny</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 0;">
                <div style="border: 1px solid ${emailStyles.border}; border-radius: 24px; background-color: ${emailStyles.card}; background-image: linear-gradient(135deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); overflow: hidden; padding: 30px;">
                  <p style="margin: 0 0 12px; color: ${emailStyles.primary}; font: 700 12px/1.6 ${emailFontStack}; text-transform: uppercase; letter-spacing: 0.26em;">${escapeHtml(eyebrow)}</p>
                  <h2 style="margin: 0 0 18px; color: ${emailStyles.foreground}; font: 700 30px/1.15 ${emailFontStack}; letter-spacing: 0;">${escapeHtml(title)}</h2>
                  <div style="color: ${emailStyles.foreground}; font: 400 17px/1.7 ${emailFontStack};">
                    ${body}
                  </div>
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 24px 0 8px; border-collapse: collapse;">
                    ${buildDetailsList(details)}
                  </table>
                  <div style="margin-top: 24px;">
                    ${buildButton('Full schedule', scheduleUrl, true)}
                    ${buildButton('Wedding website', websiteUrl)}
                    ${buildButton('Discord', discordUrl)}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding: 18px 2px 0;">
                <p style="margin: 0; color: ${emailStyles.muted}; font: 400 13px/1.7 ${emailFontStack};">
                  Questions or day-of issues? Use Discord if you need help finding the room.
                </p>
                <p style="margin: 12px 0 0; color: ${emailStyles.foreground}; font: 700 14px/1.7 ${emailFontStack};">
                  ${escapeHtml(senderNames)}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function buildGuestEmailTemplate(
  variant: GuestEmailVariant,
  options: GuestEmailTemplateOptions = {},
): GuestEmailTemplate {
  const { home, schedule } = content;
  const firstName = getFirstName(options.guestName);
  const websiteUrl = trimTrailingSlash(options.websiteUrl ?? defaultWebsiteUrl);
  const scheduleUrl = buildUrl(websiteUrl, schedule.link.url);
  const discordUrl = home.link.discordServer.url;
  const senderNames = options.senderNames ?? defaultSenderNames;
  const ceremonyDetails = [
    { label: 'Arrive', value: `${schedule.ceremony.arrivalTime} on Friday, May 1, 2026` },
    { label: 'Ceremony', value: `${schedule.ceremony.time} at ${schedule.ceremony.venue}` },
    { label: 'Where', value: `${schedule.ceremony.address}; ${schedule.ceremony.locationDetails}` },
    { label: 'Reception', value: `${schedule.reception.time} at ${schedule.reception.venue}, ${schedule.reception.address}, call Max Odell or Evelyn Li at the front-door calling machine` },
  ];
  const receptionDetails = [
    { label: 'Reception', value: `${schedule.reception.time}, Friday, May 1, 2026` },
    { label: 'Where', value: `${schedule.reception.venue}, ${schedule.reception.address}` },
    { label: 'Arrival', value: schedule.reception.arrivalNote },
    { label: 'Entry', value: 'Call Max Odell or Evelyn Li at the front-door calling machine.' },
    { label: 'Food', value: 'Snacks and drinks first, then pizza around 5:00 PM.' },
  ];

  if (variant === 'ceremony') {
    const subject = 'Adam & Jenny: Wedding Details for May 1';
    const previewText = 'We are excited to see you at City Hall and the reception afterward.';
    const title = 'We will see you soon';
    const body = `
      <p style="margin: 0 0 16px;">Hi ${escapeHtml(firstName)},</p>
      <p style="margin: 0 0 16px;">We are really looking forward to seeing you on May 1. You are on our list for the City Hall ceremony, and we would love for you to join us at the reception afterward too.</p>
      <p style="margin: 0 0 16px;">The full schedule is on the website with directions, entry notes, dress code, and the Discord link in case anything comes up day-of.</p>
      <p style="margin: 0;">Here are the main details so they are easy to find.</p>
    `;
    const text = [
      `Subject: ${subject}`,
      '',
      `Hi ${firstName},`,
      '',
      'We are really looking forward to seeing you on May 1. You are on our list for the City Hall ceremony, and we would love for you to join us at the reception afterward too.',
      '',
      'The full schedule is on the website with directions, entry notes, dress code, and the Discord link in case anything comes up day-of.',
      '',
      'Details:',
      `- Arrive: ${schedule.ceremony.arrivalTime} on Friday, May 1, 2026`,
      `- Ceremony: ${schedule.ceremony.time} at ${schedule.ceremony.venue}`,
      `- Where: ${schedule.ceremony.address}; ${schedule.ceremony.locationDetails}`,
      `- Reception: ${schedule.reception.time} at ${schedule.reception.venue}, ${schedule.reception.address}`,
      '- Entry: At 116 George St, call Max Odell or Evelyn Li at the front-door calling machine if you cannot get in.',
      '',
      `Wedding website: ${websiteUrl}`,
      `Full schedule: ${scheduleUrl}`,
      `Discord: ${discordUrl}`,
      '',
      'Thank you,',
      senderNames,
    ].join('\n');

    return {
      variant,
      label: 'Ceremony guest',
      subject,
      previewText,
      text,
      html: buildHtmlLayout({
        eyebrow: 'Wedding day details',
        title,
        body,
        details: ceremonyDetails,
        websiteUrl,
        scheduleUrl,
        discordUrl,
        senderNames,
        previewText,
      }),
    };
  }

  const subject = 'Adam & Jenny: Wedding Details for May 1';
  const previewText = 'We are excited to see you at the reception on May 1.';
  const title = 'See you at the reception';
  const body = `
    <p style="margin: 0 0 16px;">Hi ${escapeHtml(firstName)},</p>
    <p style="margin: 0 0 16px;">We are really looking forward to seeing you on May 1. You are on our list for the reception, so you can meet us at the party room after the City Hall ceremony wraps up.</p>
    <p style="margin: 0 0 16px;">The full schedule is on the website with entry notes, food timing, and the Discord link in case you need help finding the room.</p>
    <p style="margin: 0;">Here are the main details so they are easy to find.</p>
  `;
  const text = [
    `Subject: ${subject}`,
    '',
    `Hi ${firstName},`,
    '',
    'We are really looking forward to seeing you on May 1. You are on our list for the reception, so you can meet us at the party room after the City Hall ceremony wraps up.',
    '',
    'The full schedule is on the website with entry notes, food timing, and the Discord link in case you need help finding the room.',
    '',
    'Details:',
    `- Reception: ${schedule.reception.time}, Friday, May 1, 2026`,
    `- Where: ${schedule.reception.venue}, ${schedule.reception.address}`,
    `- Arrival: ${schedule.reception.arrivalNote}`,
    '- Entry: Call Max Odell or Evelyn Li at the front-door calling machine if you cannot get in.',
    '- Food: Snacks and drinks first, then pizza around 5:00 PM.',
    '',
    `Wedding website: ${websiteUrl}`,
    `Full schedule: ${scheduleUrl}`,
    `Discord: ${discordUrl}`,
    '',
    'Thank you,',
    senderNames,
  ].join('\n');

  return {
    variant,
    label: 'Reception-only guest',
    subject,
    previewText,
    text,
    html: buildHtmlLayout({
      eyebrow: 'Wedding day details',
      title,
      body,
      details: receptionDetails,
      websiteUrl,
      scheduleUrl,
      discordUrl,
      senderNames,
      previewText,
    }),
  };
}

export function buildGuestEmailTemplates(options: GuestEmailTemplateOptions = {}) {
  return [
    buildGuestEmailTemplate('ceremony', options),
    buildGuestEmailTemplate('receptionOnly', options),
  ];
}
