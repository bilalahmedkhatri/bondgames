-- Schema for BondsGame on Neon PostgreSQL

CREATE TABLE IF NOT EXISTS games (
  id VARCHAR(64) PRIMARY KEY,
  slug VARCHAR(128) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  excerpt TEXT,
  cover_image TEXT,
  hero_image TEXT,
  genres TEXT[] NOT NULL,
  platforms TEXT[] NOT NULL,
  release_date VARCHAR(64),
  release_status VARCHAR(32),
  developer VARCHAR(128),
  publisher VARCHAR(128),
  rating NUMERIC(3, 1),
  metacritic_score INT,
  verdict JSONB,
  specs JSONB,
  purchase_links JSONB,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS articles (
  id VARCHAR(64) PRIMARY KEY,
  slug VARCHAR(128) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  subtitle TEXT,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  category VARCHAR(64) NOT NULL,
  platform VARCHAR(64),
  author JSONB NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  read_time VARCHAR(32),
  comment_count INT DEFAULT 0,
  view_count INT DEFAULT 0,
  tags TEXT[],
  is_lead BOOLEAN DEFAULT FALSE,
  is_breaking BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS comments (
  id VARCHAR(64) PRIMARY KEY,
  article_slug VARCHAR(128) NOT NULL,
  author_name VARCHAR(128) NOT NULL,
  author_avatar TEXT,
  content TEXT NOT NULL,
  upvotes INT DEFAULT 0,
  downvotes INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS guest_posts (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  draft_url TEXT NOT NULL,
  author_name VARCHAR(128) NOT NULL,
  author_email VARCHAR(128) NOT NULL,
  author_bio TEXT,
  package_type VARCHAR(64) NOT NULL,
  payment_method VARCHAR(64),
  status VARCHAR(32) DEFAULT 'Pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ad_inquiries (
  id VARCHAR(64) PRIMARY KEY,
  company_name VARCHAR(128) NOT NULL,
  contact_name VARCHAR(128) NOT NULL,
  email VARCHAR(128) NOT NULL,
  budget_range VARCHAR(64),
  campaign_objective VARCHAR(128),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(128) NOT NULL,
  email VARCHAR(128) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  department VARCHAR(64) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS poll_votes (
  id SERIAL PRIMARY KEY,
  poll_id VARCHAR(64) NOT NULL,
  option_id VARCHAR(64) NOT NULL,
  voter_ip VARCHAR(64),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bookmarks (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL,
  item_type VARCHAR(32) NOT NULL, -- 'game' | 'article'
  item_slug VARCHAR(128) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, item_type, item_slug)
);
