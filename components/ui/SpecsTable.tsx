import React from 'react';
import type { SystemSpec } from '@/lib/types';
import { Cpu, HardDrive, Monitor, Server, MemoryStick } from 'lucide-react';

interface SpecsTableProps {
  specs: {
    min: SystemSpec;
    recommended: SystemSpec;
  };
  className?: string;
}

export function SpecsTable({ specs, className = '' }: SpecsTableProps) {
  const rows = [
    { label: 'Operating System', icon: Monitor, min: specs.min.os, rec: specs.recommended.os },
    { label: 'Processor (CPU)', icon: Cpu, min: specs.min.cpu, rec: specs.recommended.cpu },
    { label: 'Graphics (GPU)', icon: Server, min: specs.min.gpu, rec: specs.recommended.gpu },
    { label: 'Memory (RAM)', icon: MemoryStick, min: specs.min.ram, rec: specs.recommended.ram },
    { label: 'Storage', icon: HardDrive, min: specs.min.storage, rec: specs.recommended.storage },
  ];

  return (
    <div className={`overflow-x-auto rounded-xl border border-brand-border bg-brand-surface ${className}`}>
      <table className="w-full text-left text-sm border-collapse">
        <thead>
          <tr className="border-b border-brand-border bg-black/40 text-xs font-mono uppercase tracking-wider text-brand-muted">
            <th className="py-3.5 px-4 font-semibold text-white">Component</th>
            <th className="py-3.5 px-4 font-semibold text-brand-cyan">Minimum Specifications</th>
            <th className="py-3.5 px-4 font-semibold text-brand-red">Recommended Specifications</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-border/60">
          {rows.map((row, index) => {
            const Icon = row.icon;
            return (
              <tr key={index} className="hover:bg-brand-surfaceHover/50 transition-colors">
                <td className="py-3 px-4 font-semibold text-white flex items-center gap-2 whitespace-nowrap">
                  <Icon className="w-4 h-4 text-brand-cyan shrink-0" />
                  <span>{row.label}</span>
                </td>
                <td className="py-3 px-4 text-brand-muted text-xs leading-relaxed font-mono">
                  {row.min}
                </td>
                <td className="py-3 px-4 text-slate-200 text-xs font-semibold leading-relaxed font-mono">
                  {row.rec}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
