/**
 * CommentSection.tsx
 * Comment thread with voting — POST to /api/comments.
 */
'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { ThumbsUp, ThumbsDown, MessageCircle, Send } from 'lucide-react';

export interface CommentItem {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
}

interface CommentSectionProps {
  targetId: string;
  targetType: 'game' | 'article';
  initialComments?: CommentItem[];
  className?: string;
}

function CommentRow({ comment }: { comment: CommentItem }) {
  const [votes, setVotes] = useState({ up: comment.upvotes, down: comment.downvotes, myVote: null as 'up' | 'down' | null });

  function vote(dir: 'up' | 'down') {
    setVotes((v) => {
      if (v.myVote === dir) return { ...v, [dir === 'up' ? 'up' : 'down']: v[dir === 'up' ? 'up' : 'down'] - 1, myVote: null };
      const prev = v.myVote;
      return {
        up: dir === 'up' ? v.up + 1 : prev === 'up' ? v.up - 1 : v.up,
        down: dir === 'down' ? v.down + 1 : prev === 'down' ? v.down - 1 : v.down,
        myVote: dir,
      };
    });
  }

  return (
    <div className="flex gap-3 py-4 border-b border-slate-800 last:border-0">
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-purple to-brand-red flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
        {comment.author[0].toUpperCase()}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-white">{comment.author}</span>
          <span className="text-xs text-muted-text">{comment.createdAt}</span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">{comment.content}</p>
        <div className="flex items-center gap-3 mt-2">
          <button onClick={() => vote('up')} className={`flex items-center gap-1 text-xs transition-colors ${votes.myVote === 'up' ? 'text-brand-cyan' : 'text-muted-text hover:text-brand-cyan'}`}>
            <ThumbsUp className="w-3.5 h-3.5" /> {votes.up}
          </button>
          <button onClick={() => vote('down')} className={`flex items-center gap-1 text-xs transition-colors ${votes.myVote === 'down' ? 'text-brand-red' : 'text-muted-text hover:text-brand-red'}`}>
            <ThumbsDown className="w-3.5 h-3.5" /> {votes.down}
          </button>
        </div>
      </div>
    </div>
  );
}

export function CommentSection({ targetId, targetType, initialComments = [], className = '' }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return setError('Name and comment are required.');
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetId, targetType, author, content }),
      });
      if (res.ok) {
        const newComment = await res.json();
        setComments((prev) => [newComment, ...prev]);
        setAuthor('');
        setContent('');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-5 h-5 text-brand-cyan" />
        <h3 className="font-heading text-xl font-bold text-white">Discussion ({comments.length})</h3>
      </div>

      {/* Submit Form */}
      <form onSubmit={handleSubmit} className="bg-brand-card border border-slate-800 rounded-xl p-5 mb-6 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 md:col-span-1">
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-cyan px-4 py-2.5 text-sm"
            />
          </div>
        </div>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts..."
          rows={3}
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
        <div className="flex justify-end">
          <Button type="submit" loading={submitting} icon={<Send className="w-4 h-4" />} iconPosition="right">
            Post Comment
          </Button>
        </div>
      </form>

      {/* Comments List */}
      <div className="bg-brand-card border border-slate-800 rounded-xl px-5 divide-y divide-slate-800">
        {comments.length === 0 ? (
          <p className="text-center text-muted-text text-sm py-10">Be the first to comment!</p>
        ) : (
          comments.map((c) => <CommentRow key={c.id} comment={c} />)
        )}
      </div>
    </div>
  );
}
