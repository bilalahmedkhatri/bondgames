import React from 'react';
import Link from 'next/link';
import { Gamepad2, RotateCcw } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title = 'No results found',
  description = 'Try adjusting your filters, searching for different keywords, or exploring other categories.',
  actionLabel = 'Reset All Filters',
  actionHref,
  onAction,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-brand-border bg-brand-surface/50 ${className}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-brand-surface border border-brand-border flex items-center justify-center mb-4 shadow-lg shadow-black/40">
        <Gamepad2 className="w-8 h-8 text-brand-red animate-pulse" />
      </div>
      <h3 className="font-heading text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-brand-muted max-w-md mb-6 leading-relaxed">
        {description}
      </p>
      {actionHref ? (
        <Link href={actionHref}>
          <Button variant="secondary" size="sm" icon={<RotateCcw className="w-3.5 h-3.5" />}>
            {actionLabel}
          </Button>
        </Link>
      ) : onAction ? (
        <Button variant="secondary" size="sm" onClick={onAction} icon={<RotateCcw className="w-3.5 h-3.5" />}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
