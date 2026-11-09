export type Asset = {
  id: number; public_url: string; media_type: string; original_filename: string;
  alt_text: string; caption: string | null; width: number | null; height: number | null;
};
export type PostRow = {
  id: number; locale: string; title: string; slug: string; excerpt: string;
  content_json?: unknown; content_schema_version: number; metadata_json: Record<string, unknown>;
  author_description?: string | null; author_name: string; author_designation: string | null; author_avatar_url: string | null;
  published_at: Date; updated_at: Date; category_name: string | null; category_slug: string | null;
  cover: Asset | null;
};
