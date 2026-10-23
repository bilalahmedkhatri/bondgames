'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import type { ContactMessage } from '@/lib/types';
import { resolveContactDepartment } from '@/lib/contact-departments';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, Send } from 'lucide-react';

export function ContactPageContent({ initialDepartment }: { initialDepartment: ContactMessage['department'] }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [department, setDepartment] = useState<ContactMessage['department']>(initialDepartment);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const staff = [
    {
      name: 'Alex Mercer',
      role: 'Editor-in-Chief & Lead Tech Editor',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    },
    {
      name: 'Sarah Jenkins',
      role: 'Hardware Lab Director & GPU Analyst',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    },
    {
      name: 'Bilal Ahmed',
      role: 'Senior Industry Editor & Features',
      // Option 1: Standard High-Quality Professional Portrait
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
    },
    {
      name: 'Maya Lin',
      role: 'Senior Games Critic & Culture Lead',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !message) {
      return setError('Please provide name, email, and message.');
    }
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          data: {
            name,
            email,
            subject: subject || 'General Contact',
            department,
            message,
          },
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('Transmission failure. Please try again.');
      }
    } catch {
      setError('Connection failure.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto lg:px-0 md:px-4 sm:px-6 py-6 space-y-12">
      <Breadcrumbs items={[{ label: 'Contact & Editorial Board' }]} />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-red bg-brand-red/10 border border-brand-red/30 px-3 py-1 rounded-full">
          Editorial Governance
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl font-black text-white tracking-tight">
          Editorial Board, Press Inquiries & Direct Contact
        </h1>
        <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
          Reach our newsroom, report technical corrections, submit review codes, or speak directly with our editorial leadership.
        </p>
      </div>

      {/* Editorial Staff Grid */}
      <div className="space-y-4">
        <h2 className="font-heading text-xl font-bold text-white border-l-4 border-brand-red pl-3">
          Senior Editorial Roster
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {staff.map((member) => (
            <div
              key={member.name}
              className="bg-brand-surface border border-brand-border rounded-2xl p-5 flex items-center gap-4 shadow-xl"
            >
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-brand-border shrink-0">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="min-w-0">
                <h3 className="font-heading text-sm font-bold text-white truncate">
                  {member.name}
                </h3>
                <p className="text-[10px] text-brand-cyan font-mono truncate uppercase">
                  {member.role}
                </p>
                {/* <p className="text-[11px] text-brand-muted font-mono truncate mt-0.5">
                  {member.email}
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form Container */}
      <div id="contact-form" className="bg-brand-surface border border-brand-border rounded-3xl p-6 sm:p-10 max-w-2xl mx-auto shadow-2xl scroll-mt-28">
        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-heading text-2xl font-black text-white">
              Message Dispatched to Editorial Desk
            </h3>
            <p className="text-sm text-brand-muted max-w-md mx-auto">
              Thank you, <span className="text-white font-semibold">{name}</span>. Your message has been routed to the <span className="text-brand-cyan font-mono">{department}</span> team.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="border-b border-brand-border pb-4">
              <h2 className="font-heading text-xl font-black text-white">
                Dispatch an Editorial Message
              </h2>
              <p className="text-xs text-brand-muted mt-1 font-mono">
                Direct inquiry line to BondsGame editors.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono uppercase text-brand-muted mb-1 font-bold">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full bg-black/40 border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono uppercase text-brand-muted mb-1 font-bold">
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-black/40 border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-department" className="block text-xs font-mono uppercase text-brand-muted mb-1 font-bold">
                    Department
                  </label>
                  <select
                    id="contact-department"
                    value={department}
                    onChange={(e) => setDepartment(resolveContactDepartment(e.target.value))}
                    className="w-full bg-black/40 border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-red font-mono"
                  >
                    <option value="General">General Inquiry</option>
                    <option value="Press">Press & Review Codes</option>
                    <option value="Tech Bug">Technical Corrections / Bug</option>
                    <option value="Advertising">Advertising & Partnerships</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-mono uppercase text-brand-muted mb-1 font-bold">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={subject}
                    id="contact-subject"
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brief subject summary"
                    className="w-full bg-black/40 border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono uppercase text-brand-muted mb-1 font-bold">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can our editorial staff assist you?..."
                  className="w-full bg-black/40 border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-red resize-none"
                />
              </div>
            </div>

            {error && (
              <p className="text-xs font-mono text-red-400 bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                {error}
              </p>
            )}

            <Button
              type="submit"
              loading={submitting}
              className="w-full py-3.5 text-sm font-black uppercase tracking-wider bg-brand-red hover:bg-brand-redDark text-white rounded-xl shadow-lg shadow-brand-red/20"
              icon={<Send className="w-4 h-4" />}
            >
              Send Dispatch
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
