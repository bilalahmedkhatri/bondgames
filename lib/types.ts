/* ─────────────────────────────────────────────────
   lib/types.ts  — Canonical data models
   ───────────────────────────────────────────────── */

export interface Game {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  description: string;           // longer body text for hero card / detail page
  coverImage: string;
  heroImage: string;
  genres: string[];
  platforms: string[];
  releaseDate: string;
  releaseStatus: 'Released' | 'Upcoming' | 'Early Access';
  developer: string;
  publisher: string;
  score: number;                  // editorial score 0-10
  rating: number;                 // alias / user rating
  metacriticScore?: number;
  trending?: boolean;
  isFeatured?: boolean;
  verdict: {
    summary: string;
    score: number;
    badge: string;                // "Must Play" | "Editors' Choice" | "Recommended" | "Skip It"
    pros: string[];
    cons: string[];
  };
  specs?: {
    min: SystemSpec;
    recommended: SystemSpec;
  };
  purchaseLinks?: {
    steam?: string;
    playstation?: string;
    xbox?: string;
    epic?: string;
  };
  benchmarks?: BenchmarkResult[];
}

export interface SystemSpec {
  os: string;
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
}

export interface BenchmarkResult {
  hardware: string;
  score: number;
  unit?: string;
  resolution?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  thumbnail: string;             // used in cards
  coverImage: string;            // used in hero / full page
  category: 'News' | 'Hardware' | 'Review' | 'Preview' | 'Industry' | 'Deals' | 'Feature';
  platform?: string;
  author: string;                // author display name
  authorAvatar?: string;
  authorRole?: string;
  publishedAt: string;
  readTime: number;              // minutes (number, not string)
  commentCount: number;
  viewCount: number;
  tags: string[];
  isLead?: boolean;
  isBreaking?: boolean;
  isFeatured?: boolean;
}

export interface Comment {
  id: string;
  targetId: string;              // game id or article id
  targetType: 'game' | 'article';
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  replies?: Comment[];
}

export interface HardwareComparison {
  id: string;
  title: string;
  deviceA: ComparisonDevice;
  deviceB: ComparisonDevice;
  metrics: ComparisonMetric[];
}

export interface ComparisonDevice {
  name: string;
  tag: string;
  image: string;
  price: string;
  highlightScore: string;
}

export interface ComparisonMetric {
  category: string;
  label: string;
  valA: string;
  valB: string;
  winner: 'A' | 'B' | 'tie';
}

export interface GuestPostSubmission {
  id: string;
  title: string;
  draftUrl: string;
  authorName: string;
  authorEmail: string;
  authorBio: string;
  packageType: 'Standard ($30)' | 'Featured Editorial ($50)' | 'Enterprise Partner (Custom)';
  paymentMethod: string;
  status: 'Pending' | 'Approved' | 'Reviewing';
  createdAt: string;
}

export interface AdInquiry {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  budgetRange: string;
  campaignObjective: string;
  message: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  department: 'General' | 'Press' | 'Tech Bug' | 'Advertising';
  message: string;
  createdAt: string;
}

export interface PollOption {
  id: string;
  label: string;
  votes: number;
  percent: number;
  color: string;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  endsAt?: string;
}

export interface BenchmarkGame {
  id: string;
  title: string;
  gpuNote: string;
  fps4k: number;
  fps1440p: number;
  fps1080p: number;
  barColor?: string;
}

export interface DashboardBookmark {
  id: string;
  userId: string;
  targetId: string;
  targetType: 'game' | 'article';
  createdAt: string;
}
