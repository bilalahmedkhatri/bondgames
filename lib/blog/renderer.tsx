import React, { createElement, type ReactNode } from 'react';
import type { DocNode } from './document';
import type { Asset } from './types';
import { mediaUrl, safeLink, youtubeUrl } from './urls';
import { blogConfig } from './config';

const label = (value: unknown) => typeof value === 'string' ? value.slice(0, 1000) : '';

// Accept only a validated document. React escapes every text and attribute.
export function BlogContent({ document, assets }: { document: DocNode | null; assets: Asset[] }) {
  if (!document) return <p role="status">This article content is not available in a supported format.</p>;
  const byId = new Map(assets.map(asset => [asset.id, asset]));
  const byUrl = new Map(assets.map(asset => [asset.public_url, asset]));
  let heading = 0;
  function resolveAsset(node: DocNode) {
    const attrs = node.attrs || {};
    return typeof attrs.src === 'string' ? byUrl.get(attrs.src) : typeof attrs.asset_id === 'number' ? byId.get(attrs.asset_id) : undefined;
  }
  function renderChildren(node: DocNode): ReactNode[] {
    const result: ReactNode[] = [];
    const nodes = node.content || [];
    for (let index = 0; index < nodes.length; index++) {
      const child = nodes[index];
      const next = nodes[index + 1];
      const asset = ['image', 'customImage'].includes(child.type) ? resolveAsset(child) : undefined;
      // The admin saves image attribution as ordinary text/link nodes directly
      // after the image. Associate only this known format with a rendered image.
      const isCredit = next?.type === 'paragraph' && /^\s*(Image credit:|License:)\s*/.test((next.content || []).map(part => part.text || '').join(''));
      const credit = asset?.media_type.startsWith('image/') && asset.media_type !== 'image/svg+xml' && mediaUrl(asset.public_url) && isCredit ? next : undefined;
      result.push(render(child, index, credit));
      if (credit) index++;
    }
    return result;
  }
  function render(node: DocNode, key: number, attribution?: DocNode): ReactNode {
    const attrs = node.attrs || {};
    const headingId = node.type === 'heading' ? `article-heading-${heading++}` : undefined;
    const children = renderChildren(node);
    if (node.type === 'text') {
      let text: ReactNode = node.text;
      for (const mark of node.marks || []) {
        const tag = ({ bold: 'strong', italic: 'em', underline: 'u', strike: 's', code: 'code' } as Record<string, string>)[mark.type];
        if (tag) text = createElement(tag, {}, text);
        if (mark.type === 'link') {
          const href = safeLink(mark.attrs?.href);
          if (href) {
            const external = href.startsWith('https://') && new URL(href).origin !== new URL(blogConfig.origin).origin;
            text = <a href={href} target="_blank" rel={external ? 'nofollow noopener noreferrer' : 'noopener noreferrer'} className="text-brand-cyan underline underline-offset-4">{text}</a>;
          }
        }
      }
      return <React.Fragment key={key}>{text}</React.Fragment>;
    }
    if (node.type === 'doc') return <React.Fragment key={key}>{children}</React.Fragment>;
    if (node.type === 'hardBreak') return <br key={key} />;
    if (node.type === 'horizontalRule') return <hr key={key} className="my-10 border-brand-border" />;
    if (node.type === 'heading') return createElement(`h${attrs.level}`, { key, id: headingId, className: 'scroll-mt-28 text-2xl md:text-3xl font-bold text-white mt-10 mb-4 leading-tight' }, children);
    if (node.type === 'paragraph') {
      // Uploaded videos use the standard paragraph + Link schema in the editor.
      // Enhance only a standalone link resolved to a video in this app's DB.
      const child = node.content?.length === 1 ? node.content[0] : undefined;
      const href = child?.type === 'text' ? child.marks?.find(mark => mark.type === 'link')?.attrs?.href : undefined;
      const video = typeof href === 'string' ? byUrl.get(href) : undefined;
      const src = video?.media_type.startsWith('video/') ? mediaUrl(video.public_url) : undefined;
      if (src && video) return <figure key={key} className="my-8"><video controls preload="metadata" aria-label={child?.text || video.original_filename} className="w-full rounded-xl"><source src={src} type={video.media_type} /><a href={src}>{child?.text || video.original_filename}</a></video></figure>;
      return <p key={key} className="text-lg leading-[1.85] text-slate-300 mb-5">{children}</p>;
    }
    if (node.type === 'bulletList') return <ul key={key} className="list-disc pl-7 my-5">{children}</ul>;
    if (node.type === 'orderedList') return <ol key={key} start={typeof attrs.start === 'number' ? attrs.start : 1} type={['1', 'a', 'A', 'i', 'I'].includes(String(attrs.type)) ? attrs.type as '1' | 'a' | 'A' | 'i' | 'I' : '1'} className="list-decimal pl-7 my-5">{children}</ol>;
    if (node.type === 'listItem') return <li key={key}>{children}</li>;
    if (node.type === 'blockquote') return <blockquote key={key} className="border-l-4 border-brand-red pl-6 my-8">{children}</blockquote>;
    if (node.type === 'codeBlock') return <pre key={key} className="overflow-x-auto rounded-xl bg-brand-bg text-white p-6 my-6"><code>{children}</code></pre>;
    if (node.type === 'table') return <div key={key} className="my-8 max-w-full overflow-x-auto rounded-xl border border-brand-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan" tabIndex={0} role="region" aria-label="Article table"><table className="w-full min-w-[36rem] border-collapse text-sm"><tbody>{children}</tbody></table></div>;
    if (node.type === 'tableRow') return <tr key={key} className="border-b border-brand-border last:border-b-0">{children}</tr>;
    if (node.type === 'tableCell' || node.type === 'tableHeader') {
      const alignment = ['left', 'center', 'right'].includes(String(attrs.align)) ? attrs.align as 'left' | 'center' | 'right' : undefined;
      return createElement(node.type === 'tableHeader' ? 'th' : 'td', {
        key, colSpan: Number(attrs.colspan ?? 1), rowSpan: Number(attrs.rowspan ?? 1),
        style: alignment ? { textAlign: alignment } : undefined,
        className: `border-r border-brand-border last:border-r-0 px-5 py-4 text-left align-top [&>p]:text-sm [&>p]:leading-7 [&>p:last-child]:mb-0 ${node.type === 'tableHeader' ? 'bg-brand-surface font-semibold text-white' : 'text-slate-300'}`,
      }, children);
    }
    const asset = resolveAsset(node);
    const src = asset && mediaUrl(asset.public_url);
    const caption = asset?.caption || label(attrs.caption);
    if (node.type === 'youtube' || (node.type === 'customVideo' && attrs.asset_id == null)) {
      const embed = youtubeUrl(attrs.src);
      const start = Number.isInteger(attrs.start) && Number(attrs.start) > 0 ? `?start=${attrs.start}` : '';
      return embed ? <iframe key={key} src={embed + start} title={label(attrs.title) || 'YouTube video'} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen className="aspect-video w-full my-8 rounded-xl" /> : null;
    }
    if (!asset || !src) return null;
    let media: ReactNode;
    if (['image', 'customImage'].includes(node.type) && asset.media_type.startsWith('image/') && asset.media_type !== 'image/svg+xml') media = <img src={src} alt={asset.alt_text || label(attrs.alt) || asset.original_filename} width={asset.width || undefined} height={asset.height || undefined} loading="lazy" decoding="async" className="w-full h-auto" />;
    else if (node.type === 'customVideo' && asset.media_type.startsWith('video/')) media = <video controls preload="metadata" aria-label={caption || asset.original_filename} className="w-full"><source src={src} type={asset.media_type} /><a href={src}>Download video</a></video>;
    else if (['audio', 'customAudio'].includes(node.type) && asset.media_type.startsWith('audio/')) media = <audio controls preload="none" aria-label={caption || asset.original_filename} className="w-full"><source src={src} type={asset.media_type} /><a href={src}>Download audio</a></audio>;
    else if (node.type === 'customFileAttachment' && ['application/pdf', 'text/plain', 'text/csv', 'application/zip', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'].includes(asset.media_type)) media = <a href={src} target="_blank" rel="noopener noreferrer" className="text-brand-cyan underline" download>{asset.original_filename}</a>;
    else return null;
    return <figure key={key} className="my-8 overflow-hidden rounded-2xl border border-brand-border bg-brand-surface">{media}{(caption || attribution) && <figcaption className="px-5 py-4 text-sm leading-relaxed text-brand-muted">{caption}{attribution && <span className={caption ? 'mt-1 block' : 'block'}>{renderChildren(attribution)}</span>}</figcaption>}</figure>;
  }
  return <div className="max-w-4xl break-words">{render(document, 0)}</div>;
}
