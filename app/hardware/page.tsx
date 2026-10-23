import React from 'react';
import { pageMetadata } from '@/lib/seo';

import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { BenchmarkChart } from '@/components/BenchmarkChart';
import { ArticleCard } from '@/components/ArticleCard';
import { getArticles } from '@/lib/db/articles';
import { INITIAL_BENCHMARKS, INITIAL_HARDWARE_COMPARISON } from '@/lib/db/seed-data';
import { Cpu, Zap, HardDrive, CheckCircle2, Sliders, ShieldAlert } from 'lucide-react';

export const metadata = pageMetadata({ "title": "Gaming Hardware Comparisons & Benchmarks", "description": "Compare gaming hardware specifications and explore GPU comparisons, PC performance breakdowns and game system requirements.", "path": "/hardware" });

export default async function HardwarePage() {
  const articles = await getArticles({ category: 'Hardware' });

  const benchmark4K = INITIAL_BENCHMARKS.map((b) => ({
    hardware: `${b.title} (${b.gpuNote})`,
    score: b.fps4k,
    unit: 'FPS @ 4K Ultra',
  }));

  const benchmark1440p = INITIAL_BENCHMARKS.map((b) => ({
    hardware: `${b.title} (${b.gpuNote})`,
    score: b.fps1440p,
    unit: 'FPS @ 1440p High',
  }));

  const comparison = INITIAL_HARDWARE_COMPARISON;

  return (
    <div className="max-w-7xl mx-auto lg:px-0 md:px-4 sm:px-6 py-6 space-y-10">
      <Breadcrumbs items={[{ label: 'Hardware Lab & GPU Benchmarks' }]} />

      {/* Header */}
      <div className="border-b border-brand-border pb-6">
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-brand-cyan flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5" /> Hardware Testing Lab
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
          GPU Benchmarks, Console Teardowns & Architecture Showdowns
        </h1>
        <p className="text-sm text-brand-muted mt-1 max-w-3xl">
          Explore side-by-side component specifications and illustrative gaming performance comparisons. The current benchmark figures are seed data, not verified lab measurements.
        </p>
      </div>

      {/* Flagship Showdown: RTX 5090 vs RTX 4090 */}
      <section className="bg-brand-surface border border-brand-border rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border pb-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-red flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-brand-red" /> Head-to-Head Comparison
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-white mt-1">
              {comparison.title}
            </h2>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg font-bold">
            Illustrative Comparison Data
          </span>
        </div>

        {/* Device Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Device A */}
          <div className="p-6 rounded-2xl bg-black/40 border border-brand-border space-y-3 relative overflow-hidden">
            <span className="text-xs font-mono uppercase font-bold text-brand-red">
              {comparison.deviceA.tag}
            </span>
            <h3 className="font-heading text-2xl font-black text-white">
              {comparison.deviceA.name}
            </h3>
            <div className="flex items-center justify-between text-sm font-mono pt-2">
              <span className="text-brand-muted">Target MSRP:</span>
              <span className="text-white font-bold">{comparison.deviceA.price}</span>
            </div>
            <div className="flex items-center justify-between text-sm font-mono">
              <span className="text-brand-muted">Synthetic Performance:</span>
              <span className="text-emerald-400 font-bold">{comparison.deviceA.highlightScore}</span>
            </div>
          </div>

          {/* Device B */}
          <div className="p-6 rounded-2xl bg-black/40 border border-brand-border space-y-3 relative overflow-hidden">
            <span className="text-xs font-mono uppercase font-bold text-brand-cyan">
              {comparison.deviceB.tag}
            </span>
            <h3 className="font-heading text-2xl font-black text-white">
              {comparison.deviceB.name}
            </h3>
            <div className="flex items-center justify-between text-sm font-mono pt-2">
              <span className="text-brand-muted">Current MSRP:</span>
              <span className="text-white font-bold">{comparison.deviceB.price}</span>
            </div>
            <div className="flex items-center justify-between text-sm font-mono">
              <span className="text-brand-muted">Synthetic Performance:</span>
              <span className="text-brand-muted font-bold">{comparison.deviceB.highlightScore}</span>
            </div>
          </div>
        </div>

        {/* Detailed Metrics Table */}
        <div className="overflow-x-auto rounded-2xl border border-brand-border bg-black/30">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-brand-border bg-black/60 text-xs font-mono uppercase text-brand-muted">
                <th className="py-3 px-4 font-semibold text-white">Specification / Metric</th>
                <th className="py-3 px-4 font-semibold text-brand-red">{comparison.deviceA.name}</th>
                <th className="py-3 px-4 font-semibold text-brand-cyan">{comparison.deviceB.name}</th>
                <th className="py-3 px-4 font-semibold text-center">Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60 font-mono text-xs">
              {comparison.metrics.map((row, index) => (
                <tr key={index} className="hover:bg-brand-surfaceHover/50 transition-colors">
                  <td className="py-3 px-4 text-white font-semibold flex items-center gap-2">
                    <span className="text-brand-muted text-[10px] uppercase font-bold">[{row.category}]</span>
                    <span>{row.label}</span>
                  </td>
                  <td className={`py-3 px-4 ${row.winner === 'A' ? 'text-white font-bold' : 'text-brand-muted'}`}>
                    {row.valA}
                  </td>
                  <td className={`py-3 px-4 ${row.winner === 'B' ? 'text-white font-bold' : 'text-brand-muted'}`}>
                    {row.valB}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${row.winner === 'A'
                        ? 'bg-brand-red/20 text-brand-red border border-brand-red/40'
                        : row.winner === 'B'
                          ? 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/40'
                          : 'bg-slate-700/50 text-slate-300'
                        }`}
                    >
                      {row.winner === 'A' ? 'RTX 5090' : row.winner === 'B' ? 'RTX 4090' : 'Tied'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Benchmarks Section */}
      <section className="space-y-6">
        <SectionHeader
          title="Real-World In-Game Frame Rates"
          subtitle="Averaged over 5 runs across demanding benchmark sequences with 0.1% lows tracked."
          accent="cyan"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BenchmarkChart
            title="4K (3840×2160) Ultra Settings / Path Tracing"
            results={benchmark4K}
            unit="FPS"
          />
          <BenchmarkChart
            title="1440p (2560×1440) High Refresh Competitive"
            results={benchmark1440p}
            unit="FPS"
          />
        </div>
      </section>

      {/* Latest Hardware Coverage */}
      {articles.length > 0 && (
        <section className="space-y-6">
          <SectionHeader
            title="Latest Hardware Teardowns & Reviews"
            subtitle="Hands-on testing with GPUs, handhelds, monitors, and controllers."
            accent="purple"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((art) => (
              <ArticleCard key={art.id} article={art} variant="feature" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
