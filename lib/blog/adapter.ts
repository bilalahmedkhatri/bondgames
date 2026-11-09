import type { Article } from '@/lib/types';
import type { PostRow } from './types';
import { documentText, type DocNode } from './document';
import { mediaUrl } from './urls';

export function postArticle(post: PostRow, document: DocNode | null = null): Article {
  const metadata = post.metadata_json || {};
  const words = document ? documentText(document).split(/\s+/).filter(Boolean).length : Number(post.metadata_json?.word_count) || 0;
  const cover = post.cover?.media_type.startsWith('image/') && post.cover.media_type !== 'image/svg+xml' ? mediaUrl(post.cover.public_url) : undefined;
  const stringList = (...keys: string[]) => {
    for (const key of keys) {
      const value = metadata[key];
      if (Array.isArray(value)) {
        const items = value.filter((item): item is string => typeof item === 'string' && Boolean(item.trim())).map(item => item.trim()).slice(0, 12);
        if (items.length) return items;
      }
    }
    return [];
  };
  const authorDescription = post.author_description || (typeof metadata.author_description === 'string' ? metadata.author_description : '');
  return {
    id: `blog-${post.id}`, slug: post.slug, title: post.title, subtitle: post.excerpt,
    excerpt: post.excerpt, content: '', category: post.category_name || 'News',
    thumbnail: cover || '/social-image', coverImage: cover || '/social-image',
    author: post.author_name, authorRole: post.author_designation || '', authorDescription,
    platform: typeof metadata.platform === 'string' ? metadata.platform : undefined,
    isBreaking: metadata.is_breaking === true || metadata.isBreaking === true,
    authorAvatar: mediaUrl(post.author_avatar_url),
    publishedAt: new Date(post.published_at).toISOString(),
    readTime: Math.max(1, Math.ceil(Math.min(200000, Math.max(0, words)) / 200)),
    commentCount: 0, viewCount: 0,
    tags: stringList('tags', 'keywords'),
    highlights: stringList('highlights', 'key_points', 'keyPoints', 'takeaways'),
  };
}
