import { type ReactNode } from 'react';

import { cn } from '@/lib/utils';

type ContentCardProps = {
  as?: 'article' | 'div' | 'section';
  size?: 'sm' | 'md' | 'lg';
  eyebrow?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
  bodyClassName?: string;
  headerClassName?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
};

export function ContentCard({
  as: Component = 'section',
  size = 'md',
  eyebrow,
  title,
  subtitle,
  description,
  children,
  className,
  bodyClassName,
  headerClassName,
  eyebrowClassName,
  titleClassName,
  subtitleClassName,
  descriptionClassName,
}: ContentCardProps) {
  const hasHeader = eyebrow || title || subtitle || description;

  return (
    <Component
      className={cn(
        'rounded-3xl border border-border bg-card/50 shadow-sm',
        size === 'lg' && 'p-12',
        size === 'md' && 'p-8',
        size === 'sm' && 'p-5',
        className,
      )}
    >
      <div className={cn('space-y-4', bodyClassName)}>
        {hasHeader && (
          <div className={headerClassName}>
            {eyebrow && (
              <p
                className={cn(
                  'text-xs uppercase tracking-[0.35em] text-primary/80',
                  eyebrowClassName,
                )}
              >
                {eyebrow}
              </p>
            )}

            {title && (
              <h2
                className={cn(
                  'font-semibold tracking-tight text-foreground mb-2',
                  size === 'lg' && 'text-4xl mt-4',
                  size === 'md' && 'text-2xl mt-3',
                  size === 'sm' && 'text-lg',
                  titleClassName,
                )}
              >
                {title}
              </h2>
            )}

            {subtitle && (
              <p
                className={cn(
                  'text-lg font-medium text-foreground my-1',
                  subtitleClassName,
                )}
              >
                {subtitle}
              </p>
            )}

            {description && (
              <p
                className={cn(
                  'leading-7 text-muted-foreground',
                  size === 'lg' && 'text-lg',
                  size === 'md' && 'text-sm',
                  size === 'sm' && 'leading-6',
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}

        {children}
      </div>
    </Component>
  );
}
