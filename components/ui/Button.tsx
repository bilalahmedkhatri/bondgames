/**
 * ui/Button.tsx
 * Reusable button with multiple variants and loading state.
 */
import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string;
  asChild?: boolean;
}

const VARIANTS = {
  primary:
    'bg-gradient-to-r from-brand-red to-brand-purple text-white hover:brightness-110 shadow-lg shadow-brand-red/30',
  secondary:
    'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700',
  ghost: 'text-slate-300 hover:text-white hover:bg-slate-800',
  danger: 'bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-900/40',
  outline:
    'border border-slate-600 text-slate-300 hover:border-brand-cyan hover:text-brand-cyan bg-transparent',
};

const SIZES = {
  xs: 'px-2.5 py-1 text-xs rounded gap-1',
  sm: 'px-3.5 py-1.5 text-sm rounded gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-md gap-2',
  lg: 'px-7 py-3.5 text-base rounded-lg gap-2.5',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60 disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        iconPosition === 'left' && icon && icon
      )}
      {children}
      {!loading && iconPosition === 'right' && icon && icon}
    </button>
  );
}
