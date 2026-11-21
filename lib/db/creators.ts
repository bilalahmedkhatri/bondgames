import { Creator } from '../types';

export const INITIAL_CREATORS: Creator[] = [
  {
    id: 'creator-1',
    slug: 'alex-mercer',
    name: 'Alex Mercer',
    handle: '@alexmercer_tech',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1400&q=80',
    role: 'Lead Content Creator & Senior Tech Editor',
    department: 'Hardware Lab & Engine Tech',
    location: 'Seattle, WA (BondsGame Hardware Lab)',
    bio: 'Lead hardware benchmarking specialist and Unreal Engine 5 teardown architect at BondsGame. Obsessed with real-time hardware path tracing, silicon architectures, frame-generation latency, and punishing Souls-like boss choreography.',
    verified: true,
    specialties: ['UE5 Nanite & Lumen', 'GPU Architecture', 'Ray Tracing / DLSS', 'Souls-like RPGs', 'PS5 Pro PSSR'],
    hardware: {
      pcBench: 'NVIDIA GeForce RTX 4090 OC (24GB) / AMD Ryzen 7 7800X3D / 64GB DDR5-6000 / 4TB Gen5 NVMe SSD',
      display: 'ASUS ROG Swift 32" 4K QD-OLED 240Hz + LG C3 42" 4K OLED',
      consoles: 'PlayStation 5 Pro (PSSR Analysis Station) + Steam Deck OLED 1TB',
      peripherals: 'DualSense Edge, Wooting 60HE Hall-Effect Keyboard, Sennheiser HD 660S2 Studio Cans'
    },
    socials: {
      youtube: 'https://youtube.com/@bondsgame',
      twitter: 'https://x.com/alexmercer_bg',
      steam: 'https://steamcommunity.com',
      discord: 'https://discord.gg/bondsgame',
      twitch: 'https://twitch.tv/bondsgame',
      email: 'alex.mercer@bondsgame.click'
    },
    stats: {
      articlesPublished: 48,
      gamesScored: 36,
      monthlyReaders: '185K+',
      averageScore: 9.4,
      yearsActive: '6+ Years'
    },
    featuredArticleSlugs: [
      'gta-vi-leaks-ps5-pro-60fps',
      'nvidia-rtx-5090-specs-benchmark-leak',
      'ps5-pro-pssr-spectral-resolution-analysis'
    ],
    featuredGameSlugs: [
      'black-myth-wukong',
      'elden-ring-shadow-of-the-erdtree',
      'cyberpunk-2077-phantom-liberty'
    ]
  },
  {
    id: 'creator-2',
    slug: 'elena-rostova',
    name: 'Elena Rostova',
    handle: '@elena_rpgs',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80',
    role: 'Senior Games Critic & Narrative Specialist',
    department: 'Editorial Reviews & Narrative',
    location: 'Montreal, QC',
    bio: 'Story, world design, and complex character systems. Over 1,200 combined hours across FromSoftware, Atlus, and CD Projekt RED universes. Believer in uncompromised single-player craftsmanship.',
    verified: true,
    specialties: ['JRPGs & Western RPGs', 'Narrative Architecture', 'Psychological Horror', 'World Building'],
    hardware: {
      pcBench: 'GeForce RTX 4080 Super / Intel Core i7-14700K / 32GB DDR5 / 2TB NVMe',
      display: 'Alienware 34" Curved QD-OLED UWQHD 175Hz',
      consoles: 'PlayStation 5 + Nintendo Switch OLED',
      peripherals: 'DualSense Cosmic Red, SteelSeries Arctis Nova Pro Wireless'
    },
    socials: {
      youtube: 'https://youtube.com/@bondsgame',
      twitter: 'https://x.com/elena_bg',
      discord: 'https://discord.gg/bondsgame'
    },
    stats: {
      articlesPublished: 52,
      gamesScored: 44,
      monthlyReaders: '140K+',
      averageScore: 9.2,
      yearsActive: '5 Years'
    },
    featuredArticleSlugs: [
      'silent-hill-2-remake-review',
      'black-myth-wukong-20-million-copies-industry-shift'
    ],
    featuredGameSlugs: [
      'silent-hill-2-remake',
      'metaphor-refantazio',
      'final-fantasy-vii-rebirth'
    ]
  },
  {
    id: 'creator-3',
    slug: 'marcus-thorne',
    name: 'Marcus Thorne',
    handle: '@mthorne_hw',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=80',
    role: 'Hardware Lab Director & Silicon Analyst',
    department: 'Hardware Benchmarks',
    location: 'Austin, TX',
    bio: 'Frame times, 1% lows, thermals, and silicon engineering. If a graphics card or processor claims 4K Ultra at 120 FPS, Marcus has stressed it past the breaking point in the lab.',
    verified: true,
    specialties: ['GPU Teardowns', 'Frame-Time Latency', 'Thermal Dissipation', 'Overclocking'],
    hardware: {
      pcBench: 'Dual Test Rigs: RTX 4090 Open Bench + Radeon RX 7900 XTX / Ryzen 9 7950X3D Custom Water-Cooled',
      display: 'Dual Samsung Odyssey Neo G9 49" Mini-LED 240Hz',
      consoles: 'Xbox Series X + PlayStation 5 Pro',
      peripherals: 'Thermal Grizzly KryoSheet, Elgato 4K60 Pro Capture Rig'
    },
    socials: {
      youtube: 'https://youtube.com/@bondsgame',
      twitter: 'https://x.com/marcus_hw',
      discord: 'https://discord.gg/bondsgame'
    },
    stats: {
      articlesPublished: 39,
      gamesScored: 28,
      monthlyReaders: '210K+',
      averageScore: 9.1,
      yearsActive: '7 Years'
    },
    featuredArticleSlugs: [
      'nvidia-rtx-5090-specs-benchmark-leak',
      'ps5-pro-pssr-spectral-resolution-analysis'
    ],
    featuredGameSlugs: [
      'dragon-dogma-2',
      'cyberpunk-2077-phantom-liberty'
    ]
  },
  {
    id: 'creator-4',
    slug: 'david-chen',
    name: 'David Chen',
    handle: '@dchen_games',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1400&q=80',
    role: 'Senior Industry Analyst & Financial Editor',
    department: 'Industry & AAA Economics',
    location: 'San Francisco, CA',
    bio: 'Analyzing publisher revenue models, M&A gaming deals, single-player economics vs live-service burnout, and console market share dynamics.',
    verified: true,
    specialties: ['Game Publisher Economics', 'Industry Trends', 'Console Generations', 'Market Reports'],
    hardware: {
      pcBench: 'Custom Compact SFF: RTX 4070 Ti Super / Ryzen 7800X3D / 32GB DDR5',
      display: 'Dell UltraSharp 32" 4K PremierColor',
      consoles: 'PlayStation 5, Xbox Series S, Switch OLED',
      peripherals: 'Logitech MX Master 3S, Sony WH-1000XM5'
    },
    socials: {
      twitter: 'https://x.com/dchen_games',
      discord: 'https://discord.gg/bondsgame'
    },
    stats: {
      articlesPublished: 34,
      gamesScored: 22,
      monthlyReaders: '160K+',
      averageScore: 9.3,
      yearsActive: '4 Years'
    },
    featuredArticleSlugs: [
      'black-myth-wukong-20-million-copies-industry-shift',
      'nintendo-switch-2-announcement-window'
    ],
    featuredGameSlugs: [
      'astro-bot',
      'helldivers-2'
    ]
  }
];

export async function getCreators(): Promise<Creator[]> {
  return INITIAL_CREATORS;
}

export async function getCreatorBySlug(slug: string): Promise<Creator | undefined> {
  return INITIAL_CREATORS.find(c => c.slug === slug) || INITIAL_CREATORS[0];
}

export async function getLeadCreator(): Promise<Creator> {
  return INITIAL_CREATORS[0];
}
