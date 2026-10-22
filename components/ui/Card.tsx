/**
 * ui/Card.tsx
 * Base card container — glass, dark, and bordered variants.
 */
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'dark' | 'glass' | 'bordered' | 'highlight';
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

const VARIANTS = {
  dark: 'bg-brand-card border border-slate-800',
  glass: 'bg-slate-900/60 backdrop-blur-md border border-slate-700/50',
  bordered: 'bg-transparent border border-slate-700',
  highlight: 'bg-gradient-to-br from-brand-red/10 to-brand-purple/10 border border-brand-red/20',
};

export function Card({ children, variant = 'dark', hover = false, className = '', onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl overflow-hidden ${VARIANTS[variant]} ${hover ? 'hover:border-brand-purple/60 hover:shadow-xl hover:shadow-brand-purple/10 transition-all duration-300 cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-5 pt-5 ${className}`}>{children}</div>;
}

export function CardBody({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-5 py-4 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-5 pb-5 border-t border-slate-800 pt-4 ${className}`}>{children}</div>;
}
