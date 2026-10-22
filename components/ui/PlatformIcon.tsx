/**
 * ui/PlatformIcon.tsx
 * Platform icon chip — PS5, Xbox, PC, Nintendo, Mobile
 */
import React from 'react';
import { Monitor, Gamepad2, Smartphone } from 'lucide-react';

const PLATFORM_COLORS: Record<string, string> = {
  PS5: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  PS4: 'text-blue-300 bg-blue-400/10 border-blue-400/30',
  Xbox: 'text-green-400 bg-green-500/10 border-green-500/30',
  'Xbox Series X': 'text-green-400 bg-green-500/10 border-green-500/30',
  'Xbox One': 'text-green-300 bg-green-400/10 border-green-400/30',
  PC: 'text-slate-300 bg-slate-600/20 border-slate-500/30',
  Nintendo: 'text-red-400 bg-red-500/10 border-red-500/30',
  'Nintendo Switch': 'text-red-400 bg-red-500/10 border-red-500/30',
  Mobile: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
};

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  PC: <Monitor className="w-3 h-3" />,
  Mobile: <Smartphone className="w-3 h-3" />,
};

interface PlatformIconProps {
  platform: string;
  showLabel?: boolean;
  size?: 'xs' | 'sm';
  className?: string;
}

export function PlatformIcon({ platform, showLabel = true, size = 'xs', className = '' }: PlatformIconProps) {
  const colors = PLATFORM_COLORS[platform] ?? 'text-slate-400 bg-slate-700/20 border-slate-600/30';
  const icon = PLATFORM_ICONS[platform] ?? <Gamepad2 className="w-3 h-3" />;
  const label = platform.replace('Nintendo ', '').replace('Xbox Series X', 'XSX').replace('Xbox One', 'XBO');
  const sizeClass = size === 'sm' ? 'px-2.5 py-1 text-xs gap-1.5' : 'px-2 py-0.5 text-[10px] gap-1';

  return (
    <span
      className={`inline-flex items-center ${sizeClass} rounded border font-semibold ${colors} ${className}`}
    >
      {icon}
      {showLabel && <span>{label}</span>}
    </span>
  );
}

interface PlatformListProps {
  platforms: string[];
  max?: number;
  className?: string;
}

export function PlatformList({ platforms, max = 3, className = '' }: PlatformListProps) {
  const visible = platforms.slice(0, max);
  const extra = platforms.length - max;
  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {visible.map((p) => (
        <PlatformIcon key={p} platform={p} />
      ))}
      {extra > 0 && (
        <span className="text-[10px] text-muted-text px-1.5 py-0.5 border border-slate-700 rounded">
          +{extra}
        </span>
      )}
    </div>
  );
}
