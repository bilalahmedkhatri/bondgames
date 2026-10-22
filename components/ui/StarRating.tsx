/**
 * ui/StarRating.tsx
 * Interactive or display-only star rating component.
 */
'use client';
import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

export function StarRating({
  value,
  max = 5,
  size = 'md',
  interactive = false,
  onChange,
  className = '',
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const iconSize = size === 'lg' ? 'w-7 h-7' : size === 'md' ? 'w-5 h-5' : 'w-4 h-4';

  return (
    <div className={`inline-flex gap-0.5 ${className}`}>
      {Array.from({ length: max }, (_, i) => {
        const filled = (hovered ?? value) > i;
        return (
          <Star
            key={i}
            className={`${iconSize} transition-all ${filled ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'} ${interactive ? 'cursor-pointer hover:scale-110' : ''}`}
            onMouseEnter={interactive ? () => setHovered(i + 1) : undefined}
            onMouseLeave={interactive ? () => setHovered(null) : undefined}
            onClick={interactive && onChange ? () => onChange(i + 1) : undefined}
          />
        );
      })}
    </div>
  );
}
