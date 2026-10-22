import type { Game, Article, HardwareComparison, BenchmarkGame, PollOption } from '../types';

export const INITIAL_GAMES: Game[] = [
  {
    id: 'game-1',
    slug: 'black-myth-wukong',
    title: 'Black Myth: Wukong',
    subtitle: 'The Destined One Reclaims His Legend',
    description: 'Game Science\'s groundbreaking action RPG brings Journey to the West to life with breathtaking spectacle. As the Destined One, wield the morphing staff, master Taoist transformation spells, and battle over 80 ferocious yaoguai chiefs across photorealistic Chinese mythological landscapes rendered in Unreal Engine 5.',
    excerpt: 'Game Science\'s groundbreaking Unreal Engine 5 mythic action RPG that took the gaming world by storm.',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop',
    genres: ['Action', 'RPG', 'Souls-like'],
    platforms: ['PC', 'PS5'],
    releaseDate: 'Released',
    releaseStatus: 'Released',
    developer: 'Game Science',
    publisher: 'Game Science',
    score: 9.3,
    rating: 9.3,
    metacriticScore: 82,
    trending: true,
    isFeatured: true,
    verdict: {
      summary: 'Black Myth: Wukong is a monumental achievement in single-player action gaming. Its fluid staff stances, jaw-dropping boss variety, and rich Taoist mythology make it an exhilarating, unforgettable journey.',
      score: 9.3,
      badge: "Editors' Choice",
      pros: [
        'Photorealistic Unreal Engine 5 biomes with full Lumen global illumination and Nanite geometry',
        'Over 80 unique boss encounters with intricate animations and zero copy-paste padding',
        'Staff combat stances (Smash, Pillar, Thrust) feel responsive, impactful, and deeply expressive',
        'Spell transformations let you embody defeated bosses and turn the tide of battle',
      ],
      cons: [
        'Invisible collision walls occasionally interrupt natural exploration in outdoor chapters',
        'Dense particle effects cause minor frame pacing hiccups on mid-range hardware',
      ],
    },
    specs: {
      min: {
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core i5-8400 / AMD Ryzen 5 1600',
        gpu: 'NVIDIA GeForce GTX 1060 (6GB) / AMD Radeon RX 580 (8GB)',
        ram: '16 GB Dual-Channel',
        storage: '130 GB SSD',
      },
      recommended: {
        os: 'Windows 11 64-bit',
        cpu: 'Intel Core i7-12700 / AMD Ryzen 7 7800X3D',
        gpu: 'NVIDIA GeForce RTX 4070 (12GB) / AMD Radeon RX 7800 XT (16GB)',
        ram: '32 GB DDR5',
        storage: '130 GB NVMe Gen4 SSD',
      },
    },
    purchaseLinks: {
      steam: 'https://store.steampowered.com/app/2358720/Black_Myth_Wukong/',
      playstation: 'https://store.playstation.com/en-us/concept/10007802',
      epic: 'https://store.epicgames.com/en-US/p/black-myth-wukong-87a72b',
    },
  },
  {
    id: 'game-2',
    slug: 'astro-bot',
    title: 'Astro Bot',
    subtitle: 'A Pure Celebration of 3D Platforming Joy',
    description: 'Astro returns in a masterclass of playful imagination. Explore over 50 uncharted galaxies to rescue stranded VIP bots — iconic characters spanning 30 years of PlayStation heritage — while experiencing the most inventive utilization of the DualSense controller since the launch of the console.',
    excerpt: 'Team ASOBI delivers an unadulterated masterclass in joy and tactile platforming design.',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop',
    genres: ['Platformer', 'Adventure', 'Family'],
    platforms: ['PS5'],
    releaseDate: 'Released',
    releaseStatus: 'Released',
    developer: 'Team ASOBI',
    publisher: 'Sony Interactive Entertainment',
    score: 9.7,
    rating: 9.7,
    metacriticScore: 94,
    trending: true,
    isFeatured: true,
    verdict: {
      summary: 'Astro Bot is an instant classic and an intoxicating shot of pure dopamine. Team ASOBI has created what may very well be the finest 3D platformer since Super Mario Odyssey.',
      score: 9.7,
      badge: 'Must Play',
      pros: [
        'Every single galaxy introduces a fresh mechanical twist with zero repetition or filler',
        'Peerless DualSense haptic feedback and dynamic adaptive trigger resistance',
        'Heartfelt celebration of gaming history with 300+ lovingly animated VIP bots',
        'Flawless locked 60FPS presentation with responsive, tactile physics interactions',
      ],
      cons: [
        'Optional void challenge trials feature sudden spikes in reflex difficulty',
        'PlayStation 5 exclusive with no immediate PC release announced',
      ],
    },
    specs: {
      min: { os: 'PlayStation 5 OS', cpu: 'Custom AMD Zen 2 (8-Core)', gpu: 'Custom RDNA 2 GPU', ram: '16 GB GDDR6', storage: '66 GB Ultra-High Speed SSD' },
      recommended: { os: 'PlayStation 5 Pro OS', cpu: 'Custom AMD Zen 2 High-Clock', gpu: 'RDNA 3 Enhanced with PSSR', ram: '16 GB GDDR6 + 2GB DDR5', storage: '66 GB SSD' },
    },
    purchaseLinks: {
      playstation: 'https://store.playstation.com/en-us/concept/10008457',
    },
  },
  {
    id: 'game-3',
    slug: 'elden-ring-shadow-of-the-erdtree',
    title: 'Elden Ring: Shadow of the Erdtree',
    subtitle: 'The Land of Shadow Beckons',
    description: 'Guided by Empyrean Miquella, players cross into the Land of Shadow — a realm obscured by the Erdtree where Queen Marika first set foot. Spanning towering castle keeps, subterranean catacombs, and spectral gravestone plains, this massive expansion redefines FromSoftware\'s multi-tiered vertical world design.',
    excerpt: 'A monumental expansion that redefines FromSoftware\'s vertical world design.',
    coverImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1600&auto=format&fit=crop',
    genres: ['Action', 'RPG', 'Souls-like'],
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    releaseDate: 'Released',
    releaseStatus: 'Released',
    developer: 'FromSoftware',
    publisher: 'Bandai Namco',
    score: 9.8,
    rating: 9.8,
    metacriticScore: 95,
    trending: true,
    isFeatured: true,
    verdict: {
      summary: 'Shadow of the Erdtree is larger, denser, and more punishing than most standalone AAA games. Miyazaki delivers an all-time classic expansion that cements Elden Ring\'s legendary status.',
      score: 9.8,
      badge: 'Must Play',
      pros: [
        'Peerless multi-tiered vertical map exploration that constantly defies spatial logic',
        '8 entirely new weapon categories including Martial Arts, Light Greatswords, and Beast Claws',
        'Spectacular boss encounters with unforgettable choral musical arrangements',
        'Enthralling lore that sheds light on Marika\'s tragic origin and Miquella\'s descent',
      ],
      cons: [
        'Scadutree Blessing leveling is strictly mandatory to avoid being one-shot by late bosses',
        'Demanding particle effects during Messmer and Radahn encounters can cause frame drops',
      ],
    },
    specs: {
      min: { os: 'Windows 10 64-bit', cpu: 'Intel Core i5-8400 / AMD Ryzen 3 3300X', gpu: 'NVIDIA GTX 1060 3GB / AMD Radeon RX 580 4GB', ram: '12 GB RAM', storage: '80 GB SSD' },
      recommended: { os: 'Windows 11 64-bit', cpu: 'Intel Core i7-8700K / AMD Ryzen 5 3600X', gpu: 'NVIDIA GeForce RTX 3070 8GB / AMD Radeon RX 6800 XT', ram: '16 GB RAM', storage: '80 GB NVMe SSD' },
    },
    purchaseLinks: {
      steam: 'https://store.steampowered.com/app/2778580/ELDEN_RING_Shadow_of_the_Erdtree/',
      playstation: 'https://store.playstation.com',
      xbox: 'https://www.xbox.com',
    },
  },
  {
    id: 'game-4',
    slug: 'gta-vi',
    title: 'Grand Theft Auto VI',
    subtitle: 'Welcome Back to Vice City & The State of Leonida',
    description: 'Leonida province calls in Rockstar Games\' most technically ambitious and expansive open-world crime thriller yet. Follow the intertwined story of criminal duo Lucia and Jason across the sun-drenched avenues of Vice City, murky Everglades swamps, and neon coastal resorts.',
    excerpt: 'Rockstar\'s boundary-pushing crime saga set across the neon streets and murky swamps of Leonida.',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop',
    genres: ['Action', 'RPG', 'Adventure'],
    platforms: ['PS5', 'Xbox Series X', 'PC'],
    releaseDate: 'Nov 2026',
    releaseStatus: 'Upcoming',
    developer: 'Rockstar North',
    publisher: 'Rockstar Games',
    score: 9.9,
    rating: 9.9,
    metacriticScore: 98,
    trending: true,
    isFeatured: true,
    verdict: {
      summary: 'Grand Theft Auto VI sets an astonishing new benchmark for reactive physics, NPC routine density, and cinematic open-world immersion.',
      score: 9.9,
      badge: 'Most Anticipated',
      pros: [
        'Unparalleled world simulation with thousands of reactive NPC behavioural loops',
        'State-of-the-art volumetric water, cloud physics, and hurricane weather systems',
        'PSSR AI upscaling enabling fluid 60FPS performance modes on upgraded consoles',
        'Dual-protagonist storyline with deeply integrated collaborative heist planning',
      ],
      cons: [
        'Demands cutting-edge hardware architecture for maximum ray-traced global illumination',
        'PC release window staggered behind initial holiday console launch',
      ],
    },
    specs: {
      min: { os: 'Windows 11 64-bit', cpu: 'AMD Ryzen 5 3600 / Intel Core i5-10600K', gpu: 'NVIDIA RTX 2070 Super / AMD Radeon RX 6600 XT', ram: '16 GB DDR4', storage: '150 GB NVMe SSD' },
      recommended: { os: 'Windows 11 64-bit with DirectStorage', cpu: 'AMD Ryzen 7 7800X3D / Intel Core i7-14700K', gpu: 'NVIDIA RTX 4080 Super (16GB) / AMD Radeon RX 7900 XTX', ram: '32 GB DDR5', storage: '200 GB Gen4 NVMe SSD' },
    },
    purchaseLinks: {
      playstation: 'https://store.playstation.com',
      xbox: 'https://www.xbox.com',
      steam: 'https://store.steampowered.com',
    },
  },
  {
    id: 'game-5',
    slug: 'warhammer-40k-space-marine-2',
    title: 'Warhammer 40,000: Space Marine 2',
    subtitle: 'For The Emperor — Purge The Tyranid Swarm',
    description: 'Captain Demetrian Titus returns to the Ultramarines to purge the galaxy of ravenous bio-engineered Tyranid horrors. Saber Interactive\'s proprietary Swarm Engine renders thousands of relentless Tyranids on screen simultaneously as you rip through swarms with chainswords and heavy bolters in campaign, 3-player co-op Operations, and 6v6 PvP.',
    excerpt: 'Saber\'s visceral Swarm Engine powers an adrenaline-soaked slaughter against endless Tyranids.',
    coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600&auto=format&fit=crop',
    genres: ['Action', 'Shooter', 'Co-op'],
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    releaseDate: 'Released',
    releaseStatus: 'Released',
    developer: 'Saber Interactive',
    publisher: 'Focus Entertainment',
    score: 8.9,
    rating: 8.9,
    metacriticScore: 83,
    trending: true,
    isFeatured: true,
    verdict: {
      summary: 'Space Marine 2 is the thunderous, heavy-hitting third-person action spectacle 40K fans have spent over a decade waiting for. The Swarm Engine is a bona fide technical marvel.',
      score: 8.9,
      badge: "Editors' Choice",
      pros: [
        'Breathtaking on-screen swarm density rendering thousands of Tyranids in real time',
        'Weighty, crunchy combat with bone-shattering parries and execution animations',
        'Cooperative 3-player class-based Operations mode with deep perk customization',
        'Monumental Gothic imperial architecture realized with meticulous lore authenticity',
      ],
      cons: [
        'Solo squad AI bots occasionally struggle with target prioritization on higher difficulties',
        'PvP multiplayer mode launched with a modest selection of three battle maps',
      ],
    },
    specs: {
      min: { os: 'Windows 10 64-bit', cpu: 'AMD Ryzen 5 2600X / Intel Core i5-8600K', gpu: 'AMD Radeon RX 580 (8GB) / NVIDIA GeForce GTX 1060 (6GB)', ram: '16 GB Dual-Channel', storage: '75 GB SSD' },
      recommended: { os: 'Windows 11 64-bit', cpu: 'AMD Ryzen 7 5800X / Intel Core i7-12700', gpu: 'AMD Radeon RX 6800 XT / NVIDIA GeForce RTX 3070', ram: '16 GB Dual-Channel', storage: '75 GB NVMe SSD' },
    },
    purchaseLinks: {
      steam: 'https://store.steampowered.com/app/2183900/Warhammer_40000_Space_Marine_2/',
      playstation: 'https://store.playstation.com',
      xbox: 'https://www.xbox.com',
    },
  },
  {
    id: 'game-6',
    slug: 'helldivers-2',
    title: 'Helldivers 2',
    subtitle: 'Spread Managed Democracy Across the Galaxy',
    description: 'Enlist in Super Earth\'s elite strike force in the galaxy\'s premier third-person cooperative shooter. Squad up with three teammates to deploy orbital stratagems, heavy 500kg bombs, and automated turret lines against robotic Automaton legions and flesh-eating Terminids in a community-driven Galactic War orchestrated in real time by Game Master Joel.',
    excerpt: 'Arrowhead\'s chaotic co-op galactic war masterclass of orbital firepower and hilarious friendly fire.',
    coverImage: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=1600&auto=format&fit=crop',
    genres: ['Shooter', 'Co-op', 'Action'],
    platforms: ['PC', 'PS5'],
    releaseDate: 'Released',
    releaseStatus: 'Released',
    developer: 'Arrowhead Game Studios',
    publisher: 'Sony Interactive Entertainment',
    score: 9.1,
    rating: 9.1,
    metacriticScore: 82,
    trending: true,
    isFeatured: true,
    verdict: {
      summary: 'Helldivers 2 captures lightning in a bottle. Its genius blend of satirical jingoism, terrifying alien pressure, and hysterically catastrophic friendly fire turns every match into an epic war story.',
      score: 9.1,
      badge: 'Must Play',
      pros: [
        'Unmatched emergent comedic and heroic moments fueled by lethal physics and stratagems',
        'Dynamic planetary weather hazards (fire tornadoes, ion storms, tremors) alter every drop',
        'Living Galactic War campaign where community major orders genuinely alter game lore',
        'Fair in-game super credit earn rates that respect the player\'s investment and wallet',
      ],
      cons: [
        'Weapon balancing tweaks have sparked recurring debates within the community meta',
        'Tougher mission difficulties practically require coordinated vocal team communication',
      ],
    },
    specs: {
      min: { os: 'Windows 10 64-bit', cpu: 'Intel Core i7-4790K / AMD Ryzen 5 1500X', gpu: 'NVIDIA GeForce GTX 1050 Ti / AMD Radeon RX 470', ram: '8 GB DDR4', storage: '100 GB HDD (SSD recommended)' },
      recommended: { os: 'Windows 11 64-bit', cpu: 'Intel Core i7-9700K / AMD Ryzen 7 3700X', gpu: 'NVIDIA GeForce RTX 2060 / AMD Radeon RX 6600 XT', ram: '16 GB DDR4', storage: '100 GB SSD' },
    },
    purchaseLinks: {
      steam: 'https://store.steampowered.com/app/553850/HELLDIVERS_2/',
      playstation: 'https://store.playstation.com',
    },
  },
  {
    id: 'game-7',
    slug: 'metaphor-refantazio',
    title: 'Metaphor: ReFantazio',
    subtitle: 'The Royal Tournament of Succession',
    description: 'The visionary creative team behind Persona 3, 4, and 5 delivers an ambitious, politically charged fantasy role-playing epic. In the United Kingdom of Euchronia, the assassination of the king triggers an open royal tournament where the throne belongs to whoever earns the people\'s faith. Awaken over 40 Archetype warrior spirits in innovative turn-based hybrid battles.',
    excerpt: 'The Persona creators trade modern high school for a high-stakes royal tournament fantasy epic.',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    genres: ['RPG', 'Fantasy', 'Turn-Based'],
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    releaseDate: 'Released',
    releaseStatus: 'Released',
    developer: 'Studio Zero / Atlus',
    publisher: 'Sega',
    score: 9.4,
    rating: 9.4,
    metacriticScore: 93,
    trending: true,
    isFeatured: true,
    verdict: {
      summary: 'Metaphor: ReFantazio is Atlus operating at the absolute zenith of its creative prowess. By fusing the addictive calendar loop of Persona with deep geopolitical intrigue and the flexible Archetype system, it sets a gold standard for JRPGs.',
      score: 9.4,
      badge: "Editors' Choice",
      pros: [
        'Over 40 Archetype classes offer staggering tactical customization and party synergy',
        'Real-time overworld slashing instantly clears weaker mobs, eliminating tedious grinding',
        'Spellbinding operatic soundtrack by Shoji Meguro blending choral chants and orchestral brass',
        'Nuanced narrative that tackles social inequality, religious zealotry, and political populist rhetoric',
      ],
      cons: [
        'Dungeon visual architecture occasionally leans utilitarian compared to vibrant royal cities',
        'Minor anti-aliasing artifacts on PC hardware require manual configuration adjustments',
      ],
    },
    specs: {
      min: { os: 'Windows 10 64-bit', cpu: 'Intel Core i5-6600 / AMD Ryzen 5 1500X', gpu: 'NVIDIA GeForce GTX 750 Ti / AMD Radeon R7 360', ram: '8 GB RAM', storage: '93 GB SSD' },
      recommended: { os: 'Windows 11 64-bit', cpu: 'Intel Core i7-9700 / AMD Ryzen 7 3700X', gpu: 'NVIDIA GeForce GTX 980 / AMD Radeon RX 5600 XT', ram: '16 GB RAM', storage: '93 GB NVMe SSD' },
    },
    purchaseLinks: {
      steam: 'https://store.steampowered.com/app/2627440/Metaphor_ReFantazio/',
      playstation: 'https://store.playstation.com',
      xbox: 'https://www.xbox.com',
    },
  },
  {
    id: 'game-8',
    slug: 'monster-hunter-wilds',
    title: 'Monster Hunter Wilds',
    subtitle: 'Living Predator Ecosystems in the Forbidden Lands',
    description: 'Dynamic climate shifts, relentless apex leviathans, and seamless hunting party transitions redefine Capcom\'s premiere franchise. Ride the agile Seikret mount across the changing biomes of the Forbidden Lands, swap between two weapon types mid-hunt, and exploit monster wound vulnerabilities using the new directional Focus Mode.',
    excerpt: 'Dynamic climate shifts and apex predator herds redefine Capcom\'s premiere hunting franchise.',
    coverImage: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=1600&q=80',
    genres: ['Action', 'RPG', 'Co-op'],
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    releaseDate: 'Feb 2026',
    releaseStatus: 'Released',
    developer: 'Capcom',
    publisher: 'Capcom',
    score: 9.5,
    rating: 9.5,
    metacriticScore: 91,
    trending: true,
    isFeatured: true,
    verdict: {
      summary: 'Wilds expands on Monster Hunter World in every imaginable direction. Living creature herds and dramatic biome-shifting weather make each expedition feel like an unscripted nature documentary.',
      score: 9.5,
      badge: "Editors' Choice",
      pros: [
        'Directional Focus Mode allows precision targeting on monster flesh wounds and horn breaks',
        'Seikret mount permits fluid on-the-fly weapon swapping without returning to the hub camp',
        'Violent weather transitions (sandstorms, electrical squalls) radically alter apex predator behavior',
        'Universal crossplay fully supported across PC, PlayStation 5, and Xbox Series X at launch',
      ],
      cons: [
        'Intense CPU multithreading required during dense pack migrations and volumetric dust storms',
        'Subtle control complexity with 14 weapon movesets presents a steep initial learning curve',
      ],
    },
    specs: {
      min: { os: 'Windows 10 64-bit', cpu: 'Intel Core i5-10600 / AMD Ryzen 5 3600', gpu: 'NVIDIA RTX 2060 Super (6GB) / AMD Radeon RX 5700 XT', ram: '16 GB Dual-Channel', storage: '140 GB SSD' },
      recommended: { os: 'Windows 11 64-bit', cpu: 'Intel Core i7-13700 / AMD Ryzen 7 7800X3D', gpu: 'NVIDIA RTX 4070 Ti / AMD Radeon RX 7900 XT', ram: '32 GB DDR5', storage: '140 GB Gen4 NVMe' },
    },
    purchaseLinks: {
      steam: 'https://store.steampowered.com/app/2246340/Monster_Hunter_Wilds/',
      playstation: 'https://store.playstation.com',
      xbox: 'https://www.xbox.com',
    },
  },
  {
    id: 'game-9',
    slug: 'silent-hill-2-remake',
    title: 'Silent Hill 2 Remake',
    subtitle: 'The Fog of Psychological Guilt',
    description: 'Bloober Team delivers a respectful, terrifying, and visually stunning reconstruction of the legendary 2001 psychological horror masterpiece in Unreal Engine 5. Guide James Sunderland through the fog-shrouded streets and nightmare hospitals of Silent Hill with over-the-shoulder intimacy and Akira Yamaoka\'s haunting rearranged soundtrack.',
    excerpt: 'James Sunderland\'s psychological terror reimagined in photorealistic Unreal Engine 5.',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80',
    genres: ['Horror', 'Adventure', 'Psychological'],
    platforms: ['PS5', 'PC'],
    releaseDate: 'Released',
    releaseStatus: 'Released',
    developer: 'Bloober Team',
    publisher: 'Konami',
    score: 9.0,
    rating: 9.0,
    metacriticScore: 86,
    trending: true,
    isFeatured: false,
    verdict: {
      summary: 'Bloober Team pulled off what many thought was impossible: an exquisitely faithful, emotionally devastating, and genuinely terrifying remake that honors Team Silent while feeling modern and visceral.',
      score: 9.0,
      badge: "Editors' Choice",
      pros: [
        'Dense volumetric fog, lighting, and 3D spatial acoustics induce relentless psychological dread',
        'Expanded Brookhaven Hospital and Historical Society levels are richly layered with puzzles',
        'Weighty, clumsy combat mechanics preserve James\' vulnerability as a grieving ordinary man',
        'Akira Yamaoka\'s reworked acoustic guitar and industrial score is a masterpiece',
      ],
      cons: [
        'Certain late-game labyrinth combat corridors stretch slightly longer than necessary',
        'Occasional Unreal Engine 5 traversal shader stutter on select PC configurations',
      ],
    },
    specs: {
      min: { os: 'Windows 10 64-bit', cpu: 'Intel Core i7-6700K / AMD Ryzen 5 3600', gpu: 'NVIDIA GeForce GTX 1080 / AMD Radeon RX 5700', ram: '16 GB RAM', storage: '50 GB SSD' },
      recommended: { os: 'Windows 11 64-bit', cpu: 'Intel Core i7-8700K / AMD Ryzen 5 3600X', gpu: 'NVIDIA GeForce RTX 2080 / AMD Radeon RX 6800XT', ram: '16 GB RAM', storage: '50 GB NVMe SSD' },
    },
    purchaseLinks: {
      playstation: 'https://store.playstation.com',
      steam: 'https://store.steampowered.com/app/2124490/SILENT_HILL_2/',
    },
  },
  {
    id: 'game-10',
    slug: 'final-fantasy-vii-rebirth',
    title: 'Final Fantasy VII Rebirth',
    subtitle: 'The Unknown Journey Beyond Midgar',
    description: 'A sprawling masterpiece that expands the nostalgic classic into an expansive, character-driven open-world epic brimming with tactical synergy combat depth, the addictive Queen\'s Blood card game, and emotional storytelling across the iconic regions of the Planet.',
    excerpt: 'A sprawling masterpiece expanding FF7 into a character-driven open-world epic.',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop',
    genres: ['RPG', 'Action', 'Adventure'],
    platforms: ['PS5', 'PC'],
    releaseDate: 'Released',
    releaseStatus: 'Released',
    developer: 'Square Enix',
    publisher: 'Square Enix',
    score: 9.3,
    rating: 9.3,
    metacriticScore: 92,
    isFeatured: true,
    verdict: {
      summary: 'Rebirth balances open-world exploration, phenomenal character camaraderie, and the best hybrid real-time tactical combat system Square Enix has ever produced.',
      score: 9.3,
      badge: "Editors' Choice",
      pros: [
        'Synergy attacks and abilities make party composition and combat rotations endlessly engaging',
        'Queen\'s Blood mini-game is so deep and addictive it could stand as a standalone release',
        'Campfire interactions and character bonds bring Cloud, Tifa, and Aerith to life with emotional warmth',
        'Sweeping orchestral soundtrack celebrating Nobuo Uematsu\'s classic themes',
      ],
      cons: [
        'Performance mode initially suffered from soft image reconstruction before post-launch patches',
        'Regional Chadley research towers feel formulaic across late-game open zones',
      ],
    },
    specs: {
      min: { os: 'PlayStation 5 OS', cpu: 'Custom Zen 2', gpu: 'Custom RDNA 2', ram: '16 GB GDDR6', storage: '145 GB SSD' },
      recommended: { os: 'PlayStation 5 Pro OS', cpu: 'Custom Zen 2 Boosted', gpu: 'RDNA 3 with PSSR 60FPS', ram: '16 GB GDDR6', storage: '145 GB SSD' },
    },
    purchaseLinks: {
      playstation: 'https://store.playstation.com',
    },
  },
  {
    id: 'game-11',
    slug: 'dragons-dogma-2',
    title: 'Dragon\'s Dogma 2',
    subtitle: 'The Arisen & The Emergent Fantasy Sandbox',
    description: 'Hideaki Itsuno\'s unapologetic fantasy simulator where Pawns, physics, and roaming mythical monsters generate unscripted chaos. Climb atop the backs of flying Gryphons, sever bridge cables across gorges, and embark on a grand journey without hand-holding mini-map markers.',
    excerpt: 'An emergent fantasy simulator where Pawns, physics, and colossal beasts create unscripted chaos.',
    coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600&auto=format&fit=crop',
    genres: ['Action', 'RPG', 'Open World'],
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    releaseDate: 'Released',
    releaseStatus: 'Released',
    developer: 'Capcom',
    publisher: 'Capcom',
    score: 8.9,
    rating: 8.9,
    metacriticScore: 87,
    verdict: {
      summary: 'Dragon\'s Dogma 2 is a magnificent, idiosyncratic fantasy adventure that doubles down on friction, discovery, and unscripted emergent combat thrills.',
      score: 8.9,
      badge: 'Recommended',
      pros: [
        'Colossal monster climbing combat makes every battle against a Gryphon or Drake feel heroic',
        'Pawn companion AI develops idiosyncratic personalities and imparts secrets learned in other players\' games',
        'Organic cartography and absence of map clutter encourages genuine wilderness exploration',
        'Spectacular high-tier spellcasting with screen-clearing tornadoes and meteor tempests',
      ],
      cons: [
        'Dense capital cities like Vernworth trigger heavy CPU bottlenecking across all platforms',
        'Strict fast-travel limitations can test the patience of convenience-oriented players',
      ],
    },
    specs: {
      min: { os: 'Windows 10 64-bit', cpu: 'Intel Core i5-10600 / AMD Ryzen 5 3600', gpu: 'NVIDIA GeForce GTX 1070 / AMD Radeon RX 5500 XT', ram: '16 GB RAM', storage: '100 GB SSD' },
      recommended: { os: 'Windows 11 64-bit', cpu: 'Intel Core i7-10700 / AMD Ryzen 5 3600X', gpu: 'NVIDIA GeForce RTX 2080 / AMD Radeon RX 6700', ram: '16 GB RAM', storage: '100 GB NVMe SSD' },
    },
    purchaseLinks: {
      steam: 'https://store.steampowered.com/app/2054970/Dragons_Dogma_2/',
      playstation: 'https://store.playstation.com',
      xbox: 'https://www.xbox.com',
    },
  },
  {
    id: 'game-12',
    slug: 'stalker-2-heart-of-chornobyl',
    title: 'S.T.A.L.K.E.R. 2: Heart of Chornobyl',
    subtitle: 'Survive The Chornobyl Radioactive Exclusion Zone',
    description: 'Unforgiving, atmospheric, and technically ambitious. Step into the 64-square-kilometer radioactive Chornobyl Exclusion Zone as Skif. Survive gravitational anomalies, lethal mutants, and multi-faction firefights driven by the unscripted A-Life 2.0 simulation system in photorealistic Unreal Engine 5.',
    excerpt: 'Unforgiving and atmospheric — unrivaled in post-apocalyptic immersion and environmental storytelling.',
    coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600&auto=format&fit=crop',
    genres: ['FPS', 'Survival', 'Horror'],
    platforms: ['PC', 'Xbox Series X'],
    releaseDate: 'Released',
    releaseStatus: 'Released',
    developer: 'GSC Game World',
    publisher: 'GSC Game World',
    score: 8.6,
    rating: 8.6,
    metacriticScore: 82,
    verdict: {
      summary: 'A triumph of perseverance, delivering one of the most haunting, dangerous virtual post-apocalyptic worlds ever rendered in Unreal Engine 5.',
      score: 8.6,
      badge: 'Great',
      pros: [
        'A-Life 2.0 makes faction skirmishes and mutant encounters feel completely unscripted',
        'Astonishingly authentic sound design from howling radioactive winds to Geiger counters',
        'Hardcore ballistics and survival systems with bleeding, weapon jamming, and fatigue',
        'Photorealistic derelict Soviet concrete architecture realized through Nanite and Lumen',
      ],
      cons: [
        'High-end hardware required to maintain stable 60FPS in complex anomaly storm fields',
        'Steep initial learning curve with punishing health and ammunition scarcity',
      ],
    },
    specs: {
      min: { os: 'Windows 10 / 11 64-bit', cpu: 'AMD Ryzen 5 3600X / Intel Core i7-7700K', gpu: 'AMD Radeon RX 5700 XT 8GB / NVIDIA RTX 2070 8GB', ram: '16 GB Dual-channel', storage: '160 GB SSD' },
      recommended: { os: 'Windows 11 64-bit', cpu: 'AMD Ryzen 7 7700X / Intel Core i7-13700KF', gpu: 'AMD Radeon RX 7900 XTX 24GB / NVIDIA RTX 4080 16GB', ram: '32 GB DDR5', storage: '160 GB NVMe SSD' },
    },
    purchaseLinks: {
      steam: 'https://store.steampowered.com',
      xbox: 'https://www.xbox.com',
    },
  },
  {
    id: 'game-13',
    slug: 'cyberpunk-2077-phantom-liberty',
    title: 'Cyberpunk 2077: Phantom Liberty',
    subtitle: 'Night City High-Stakes Espionage Thriller',
    description: 'Return as cyber-enhanced mercenary V in an espionage thriller set in the lawless walled district of Dogtown. Partner with FIA sleeper agent Solomon Reed (played by Idris Elba) to save the President of the NUSA, featuring overhauled cyberware systems, vehicular combat, and full path tracing overdrive support.',
    excerpt: 'Return as V in a high-stakes spy thriller featuring Idris Elba, overhauled combat, and path tracing.',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    heroImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80',
    genres: ['Action', 'RPG', 'FPS'],
    platforms: ['PC', 'PS5', 'Xbox Series X'],
    releaseDate: 'Released',
    releaseStatus: 'Released',
    developer: 'CD Projekt RED',
    publisher: 'CD Projekt',
    score: 9.5,
    rating: 9.5,
    metacriticScore: 89,
    verdict: {
      summary: 'Phantom Liberty transforms Cyberpunk 2077 into the gripping, emotionally resonant sci-fi masterpiece it was always destined to be.',
      score: 9.5,
      badge: 'Must Play',
      pros: [
        'Dogtown delivers dense urban claustrophobia with phenomenal vertical district design',
        'Relic skill tree unlocks hyper-mobile combat abilities and lethal cyberware upgrades',
        'DLSS 3.5 Ray Reconstruction provides the most realistic photorealistic lighting in PC gaming',
        'Nuanced moral choices with gut-wrenching emotional branching narrative outcomes',
      ],
      cons: [
        'Vehicle mounted combat mechanics can feel slightly floaty on high-speed highways',
        'Demands top-tier GPUs like RTX 4080/4090 to experience full RT Overdrive at 4K',
      ],
    },
    specs: {
      min: { os: 'Windows 10 64-bit', cpu: 'Intel Core i7-6700 / AMD Ryzen 5 1600', gpu: 'GTX 1060 6GB / Radeon RX 580', ram: '12 GB RAM', storage: '70 GB SSD' },
      recommended: { os: 'Windows 11 64-bit', cpu: 'Intel Core i7-12700 / AMD Ryzen 7 7800X', gpu: 'RTX 4070 / Radeon RX 7800 XT', ram: '16 GB RAM', storage: '70 GB NVMe SSD' },
    },
    purchaseLinks: {
      steam: 'https://store.steampowered.com',
      playstation: 'https://store.playstation.com',
      xbox: 'https://www.xbox.com',
    },
  },
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    slug: 'gta-vi-leaks-ps5-pro-60fps',
    title: 'GTA VI Leaks: Rockstar Reportedly Targeting Native 60FPS Mode on PS5 Pro Hardware',
    subtitle: 'PSSR AI upscaling and enhanced ray-traced global illumination reportedly unlocked for Vice City streets.',
    excerpt: 'Internal developer documentation suggests PSSR AI upscaling is being utilized to achieve uncompromised frame rates alongside enhanced ray-traced global illumination in Vice City.',
    content: `### The 60FPS Target: A Paradigm Shift for Rockstar

For decades, Rockstar Games has adhered to a clear technical philosophy: prioritize world simulation density, volumetric physics, and crowd AI routines over high frame rates on console hardware. From GTA IV's euphoria ragdolls to Red Dead Redemption 2's hyper-detailed frontier, 30 frames per second has long been the price of admission for unprecedented living worlds.

Internal developer reports and engineering briefs now indicate that Rockstar North and Sony have collaborated closely on specialized PlayStation Spectral Super Resolution (PSSR) profiles tailored specifically for Grand Theft Auto VI on PS5 Pro hardware.

### AI Upscaling Meets Vice City's Neon Coastlines

According to sources familiar with the target builds, the primary challenge in rendering Leonida province isn't just raw raster resolution — it's the dynamic calculation of thousands of reactive crowd agents, tidal water reflections, and volumetric thunderstorm fronts.

By offloading the anti-aliasing and image reconstruction pipeline to the PS5 Pro's dedicated machine learning silicon, Rockstar's engineering team is reportedly achieving:
- **Stable 60 FPS Performance Mode**: Rendered internally around 1440p and intelligently reconstructed to pristine 4K.
- **Enhanced Ray-Traced Reflections**: Real-time chrome bumper, wet asphalt, and glass reflections along Ocean Drive without the aggressive noise artifacts common in standard temporal upscalers.
- **Dynamic Ambient Occlusion**: Lifelike shading in shadowed alleys and mangrove estuaries.

For PC enthusiasts, this confirms what many suspected: when GTA VI eventually arrives on PC, full hardware path tracing and DLSS Ray Reconstruction will likely be the definitive way to experience Leonida.`,
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
    category: 'News',
    platform: 'PS5 Pro / PC',
    author: 'Alex Mercer',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    authorRole: 'Senior Tech Editor',
    publishedAt: 'Oct 22, 2026',
    readTime: 4,
    commentCount: 342,
    viewCount: 48920,
    tags: ['GTA6', 'PS5Pro', 'Rockstar', 'RayTracing'],
    isLead: true,
    isBreaking: true,
    isFeatured: true,
  },
  {
    id: 'art-2',
    slug: 'black-myth-wukong-20-million-copies-industry-shift',
    title: 'Black Myth: Wukong Smashes 20 Million Sales: How Game Science Changed AAA Economics',
    subtitle: 'A single-player action title with zero battle passes or microtransactions proved the global appetite for pure gaming craftsmanship.',
    excerpt: 'Surpassing 20 million copies across PC and PS5 in record time, Game Science has forced Western publishers to reconsider the live-service obsession.',
    content: `### Defying the Live-Service Playbook

For the past seven years, AAA publisher boardrooms have been consumed by a singular mantra: recurring player engagement through season passes, cosmetics stores, and endless live-service roadmaps. 

Then came Game Science, a modest Chinese studio founded by ex-Tencent veterans, who poured five years of meticulous craft into *Black Myth: Wukong*. The result? Over 20 million copies sold across Steam, WeGame, and PlayStation 5 in just over a month, generating an estimated $900 million in gross revenue.

### Why The Monkey King Resonated Globally

While the initial sales surge was undoubtedly bolstered by patriotic enthusiasm in the domestic Chinese market, what caught global analysts off guard was the game's staggering longevity in North America, Europe, and Japan:

1. **Uncompromised Spectacle**: Over 80 distinct bosses, each possessing hand-crafted animations and zero asset recycling, gave players an old-school thrill reminiscent of God of War (2018) and Dark Souls III.
2. **Accessible Challenge**: By incorporating versatile spells like Cloud Step and Immobilize alongside distinct staff stances, Game Science allowed players of varying skill ceilings to conquer punishing encounters.
3. **No Microtransaction Cynicism**: Gamers received a complete, gorgeous $60-$70 experience on day one with zero FOMO mechanics.

Western publishers holding backlogged single-player pitches are now re-evaluating their portfolios. Single-player excellence, it turns out, is still the greatest business model in interactive entertainment.`,
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
    category: 'Industry',
    platform: 'PC / PS5',
    author: 'David Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    authorRole: 'Industry Analyst',
    publishedAt: 'Oct 22, 2026',
    readTime: 5,
    commentCount: 428,
    viewCount: 56300,
    tags: ['BlackMythWukong', 'Industry', 'GameScience', 'SinglePlayer'],
    isBreaking: false,
    isFeatured: true,
  },
  {
    id: 'art-3',
    slug: 'nvidia-rtx-5090-specs-benchmark-leak',
    title: 'NVIDIA RTX 5090 Benchmark Leak: Is 4K 144Hz Path Tracing Finally Here?',
    subtitle: 'Alleged synthetic 3DMark benchmarks indicate up to 65% rasterization performance improvements over RTX 4090.',
    excerpt: 'Alleged synthetic 3DMark benchmarks indicate up to 65% rasterization performance improvements over RTX 4090, alongside Blackwell\'s 3rd gen RT cores.',
    content: `### The Blackwell Architecture Leap

Leaked engineering samples and technical specifications for NVIDIA's upcoming flagship graphics card — the GeForce RTX 5090 — have sent shockwaves through the hardware enthusiast community. Built on TSMC's customized 4NP node featuring the Blackwell GB202 silicon, the RTX 5090 represents Jensen Huang's most aggressive generational push into real-time path tracing.

### Key Leaked Specifications:
- **CUDA Cores**: 21,760 (up from 16,384 on RTX 4090)
- **Memory Configuration**: 32 GB GDDR7 on a massive 512-bit bus
- **Memory Bandwidth**: Staggering 1,792 GB/s (near double the RTX 4090)
- **Total Board Power (TBP)**: Approximately 500-600W via 12V-2x6 connector

### Real-World Implications for Cyberpunk and GTA VI

While 65% synthetic improvements in Time Spy Extreme look impressive on bar charts, the true game-changer is the memory subsystem. With 32GB of ultra-fast GDDR7, modern path-traced titles like *Cyberpunk 2077: Phantom Liberty* and *Alan Wake 2* can run at native 4K with full Ray Reconstruction without suffering from VRAM pressure or texture paging stutters.`,
    thumbnail: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=600&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800&auto=format&fit=crop',
    category: 'Hardware',
    platform: 'PC Hardware',
    author: 'Sarah Jenkins',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    authorRole: 'Hardware Lead',
    publishedAt: 'Oct 22, 2026',
    readTime: 6,
    commentCount: 512,
    viewCount: 62410,
    tags: ['RTX5090', 'NVIDIA', 'Blackwell', 'Hardware'],
    isLead: false,
    isBreaking: false,
  },
  {
    id: 'art-4',
    slug: 'astro-bot-review-joy-of-gaming',
    title: 'Astro Bot Review: The Antidote to Open-World Fatigue and Live-Service Cynicism',
    subtitle: 'Team ASOBI delivers a pure shot of unadulterated dopamine, reminding us why we fell in love with video games in the first place.',
    excerpt: 'Team ASOBI delivers an unadulterated masterclass in joy, turning every galaxy into an inventive celebration of gaming history and DualSense haptics.',
    content: `### When Was the Last Time a Video Game Made You Smile For Six Hours Straight?

In an era where modern AAA gaming is dominated by 100-hour checklist maps, seasonal battle passes, and cynical microtransactions, *Astro Bot* feels less like a product and more like a warm embrace from an old friend.

From the second you blast off in the DualSense spaceship across the celestial sky, Team ASOBI treats your time with profound respect. There is no bloat. There are no crafting menus, skill trees with incremental 2% damage buffs, or radiant fetch quests. Every single galaxy is a tightly tuned playground bursting with mechanical wit.

### DualSense Magic Redefined

Many assumed *Astro's Playroom* was as far as the DualSense controller could be pushed. *Astro Bot* laughs at that assumption. 

Whether you're stretching tactile rubber slings, rolling into an armadillo-armored sphere to smash through ceramic walls, or feeling the gentle pitter-patter of raindrops across your palms through the haptic actuators, the sensory feedback is peerless.

It is, without hyperbole, the most joyful video game released this console generation.`,
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    category: 'Review',
    platform: 'PS5',
    author: 'Maya Lin',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    authorRole: 'Senior Games Critic',
    publishedAt: 'Oct 21, 2026',
    readTime: 5,
    commentCount: 298,
    viewCount: 44100,
    tags: ['AstroBot', 'PS5', 'Review', 'GOTY'],
    isFeatured: true,
  },
  {
    id: 'art-5',
    slug: 'steam-deck-oled-vs-rog-ally-x',
    title: 'Steam Deck OLED vs ROG Ally X: 6-Month Long-Term Daily Driver Verdict',
    subtitle: 'After half a year of airplanes, commutes, and couch gaming sessions, which handheld king retains the crown?',
    excerpt: 'SteamOS ergonomics vs raw Windows 11 performance. We break down real battery degradation, sleep/wake convenience, and thumbstick reliability.',
    content: `### The Portable PC Golden Age

The handheld gaming landscape has exploded into one of the fiercest battlegrounds in PC hardware. For six straight months, our editorial team has carried both the Valve Steam Deck OLED (512GB) and the ASUS ROG Ally X (24GB RAM, 80Wh battery) as daily companion devices.

### The Findings:

1. **Battery Life**: The ROG Ally X's massive 80Wh battery is an absolute workhorse, outlasting the Steam Deck by nearly 45 minutes in demanding titles like *Cyberpunk 2077* at 17W. However, at lower 7-10W TDP indie workloads, the Steam Deck's custom APU and OLED panel offer virtually identical longevity.
2. **Display Quality**: The Steam Deck OLED's 90Hz HDR display remains unmatched for contrast, true blacks, and color punch. The Ally X's 120Hz VRR panel is smoother in titles that hover between 45-55 FPS, but lacks the deep ink-like richness of OLED.
3. **Software Friction**: This is where Valve runs away with the trophy. SteamOS sleep/resume is instantaneous and foolproof. Suspending a game on the Ally X still occasionally causes Windows 11 audio driver dropouts or launcher crash errors upon waking.

**Our Verdict**: If maximum raw frame rates and Game Pass native compatibility are your priority, buy the Ally X. For pure handheld ergonomics, display pop, and effortless console-like convenience, the Steam Deck OLED is still the king.`,
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
    category: 'Hardware',
    platform: 'Handhelds',
    author: 'Sarah Jenkins',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    authorRole: 'Hardware Lead',
    publishedAt: 'Oct 21, 2026',
    readTime: 6,
    commentCount: 289,
    viewCount: 41200,
    tags: ['SteamDeck', 'ROGAlly', 'Handhelds', 'Hardware'],
    isBreaking: false,
  },
  {
    id: 'art-6',
    slug: 'monster-hunter-wilds-hands-on-preview',
    title: 'Monster Hunter Wilds Hands-On: 25 Hours In the Living Sandstorms',
    subtitle: 'Capcom delivers dynamic predator herds, severe dust storm surges, and the smartest companion mounts yet.',
    excerpt: 'Dynamic climate shifts, relentless apex leviathans, and seamless hunting party transitions redefine Capcom\'s premiere franchise.',
    content: `### Living, Breathing Food Chains in the Windward Plains

Our extended 25-hour hands-on preview with the latest build of *Monster Hunter Wilds* on PS5 Pro left no doubt: Capcom has crafted the most organic, terrifying fantasy ecosystem ever committed to interactive media.

In previous games, monsters operated largely as isolated boss arenas with patrol paths. In Wilds, ecosystems exist in constant friction. When a severe electrical sandstorm swept across the desert, we witnessed a pack of Doshaguma scatter in panic as an apex Rey Dau descended from lightning-charged clouds to hunt an injured juvenile.

### Focus Mode: The Mechanical Evolution

The headline addition to the classic combat loop is **Focus Mode**, activated by holding the left trigger. It allows hunters to aim weapon strikes with directional precision, targeting lacerated flesh wounds caused by repeated attacks. Shattering these wounds triggers massive stagger animations and extra material drops, adding a layer of surgical precision that elevates the combat above *World* and *Rise*.`,
    thumbnail: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=800&q=80',
    category: 'Preview',
    platform: 'PS5 / PC',
    author: 'Marcus Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    authorRole: 'Senior Action Critic',
    publishedAt: 'Oct 21, 2026',
    readTime: 7,
    commentCount: 156,
    viewCount: 22100,
    tags: ['MonsterHunter', 'Capcom', 'Preview', 'PS5'],
    isBreaking: false,
  },
  {
    id: 'art-7',
    slug: 'helldivers-2-galactic-war-report-community-victory',
    title: 'The Battle for Tarsh: How 150,000 Helldivers Outsmarted Game Master Joel',
    subtitle: 'A thrilling retrospective on the finest community-driven emergency operation in cooperative gaming history.',
    excerpt: 'Faced with a devastating Automaton flanking maneuver, the Helldivers 2 community organized a coordinated planetary liberation that caught Arrowhead off guard.',
    content: `### When A Community Becomes An Army

In most modern multiplayer games, events are pre-scripted cutscenes that play out regardless of player input. In *Helldivers 2*, the galaxy is a living board game overseen by Arrowhead\'s real-time Dungeon Master, affectionately known as Joel.

Last weekend, Joel dropped what was meant to be an insurmountable Automaton counter-offensive on the jungle world of Tarsh. Had Tarsh fallen, the bot fleet would have cut off Super Earth\'s orbital resupply lines to three vital sectors.

What happened next was cooperative gaming history. Coordinated across Discord, Reddit, and in-game tactical pings, over 150,000 players dropped onto Tarsh within a six-hour window. Squads ran EMP mortars, anti-tank expendables, and synchronized orbital laser salvos with military precision, pushing the liberation meter to 100% with just 14 minutes left on the mission clock.

It is moments like this that remind us of the communal magic that only gaming can conjure.`,
    thumbnail: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=600&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=800&auto=format&fit=crop',
    category: 'Feature',
    platform: 'PC / PS5',
    author: 'David Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    authorRole: 'Community & Feature Editor',
    publishedAt: 'Oct 20, 2026',
    readTime: 4,
    commentCount: 214,
    viewCount: 31200,
    tags: ['Helldivers2', 'GalacticWar', 'Community', 'Coop'],
  },
  {
    id: 'art-8',
    slug: 'pc-gaming-deals-best-steam-epic-discounts',
    title: 'Weekend Vault: The 10 Best Steam & Epic PC Deals Under $20 Right Now',
    subtitle: 'From cyberpunk noir to sprawling roguelikes, our editors pick the absolute best bargains you shouldn\'t miss.',
    excerpt: 'Subscribers and budget conscious gamers can pick up hundreds of hours of critically acclaimed gaming for the price of lunch.',
    content: `Looking for top-tier gaming on a modest budget? The autumn PC digital sales have kicked into high gear across Steam, GOG, and the Epic Games Store. We sorted through thousands of discounted titles to highlight the gems offering the greatest value per dollar:

1. **Disco Elysium - The Final Cut** ($9.99 / 75% off) — The greatest narrative RPG ever penned.
2. **Hollow Knight** ($7.49 / 50% off) — The undisputed king of modern Metroidvanias while we wait for Silksong.
3. **Cyberpunk 2077 Standard Edition** ($19.99 / 60% off) — Now completely redeemed post-Update 2.0.
4. **Doom Eternal Deluxe Edition** ($17.49 / 75% off) — Pure adrenaline-fueled FPS ballet.
5. **Hades** ($8.49 / 66% off) — The Greek mythological roguelike that set the template for action storytelling.`,
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop',
    category: 'Deals',
    platform: 'PC',
    author: 'Sarah Jenkins',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    authorRole: 'Hardware & Deals Lead',
    publishedAt: 'Oct 20, 2026',
    readTime: 3,
    commentCount: 88,
    viewCount: 19800,
    tags: ['Deals', 'Steam', 'PCGaming', 'Discounts'],
  },
];

export const INITIAL_BENCHMARKS: BenchmarkGame[] = [
  { id: 'bench-1', title: 'Black Myth: Wukong (Cinematic Full RT)', gpuNote: 'RTX 4090 / Core i9-14900K', fps4k: 84, fps1440p: 126, fps1080p: 172, barColor: '#f59e0b' },
  { id: 'bench-2', title: 'Cyberpunk 2077 (Path Tracing Overdrive)', gpuNote: 'RTX 4080 Super / DLSS 3.5 RR', fps4k: 78, fps1440p: 118, fps1080p: 165, barColor: '#e63946' },
  { id: 'bench-3', title: 'Space Marine 2 (Swarm Ultra Density)', gpuNote: 'Radeon RX 7900 XTX / Ryzen 7800X3D', fps4k: 88, fps1440p: 134, fps1080p: 190, barColor: '#8b5cf6' },
  { id: 'bench-4', title: 'Helldivers 2 (Difficulty 9 Helldive 4K)', gpuNote: 'RTX 4070 Ti Super', fps4k: 92, fps1440p: 140, fps1080p: 195, barColor: '#06b6d4' },
  { id: 'bench-5', title: 'S.T.A.L.K.E.R. 2 (UE5 Lumen + Nanite)', gpuNote: 'RTX 4070 Super / Core i7-13700K', fps4k: 64, fps1440p: 98, fps1080p: 140, barColor: '#10b981' },
];

export const INITIAL_HARDWARE_COMPARISON: HardwareComparison = {
  id: 'rtx-5090-vs-4090',
  title: 'NVIDIA GeForce RTX 5090 vs RTX 4090 Flagship Showdown',
  deviceA: {
    name: 'GeForce RTX 5090',
    tag: 'Next-Gen Blackwell King',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800&auto=format&fit=crop',
    price: '$1,899 (Est.)',
    highlightScore: '32,100 TSE Graphics',
  },
  deviceB: {
    name: 'GeForce RTX 4090',
    tag: 'Ada Lovelace Champion',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=800&auto=format&fit=crop',
    price: '$1,599 (MSRP)',
    highlightScore: '19,450 TSE Graphics',
  },
  metrics: [
    { category: 'Architecture', label: 'Process Node', valA: 'TSMC 4NP Custom', valB: 'TSMC 4N Custom', winner: 'A' },
    { category: 'Compute', label: 'CUDA Cores', valA: '21,760 Cores', valB: '16,384 Cores', winner: 'A' },
    { category: 'Memory', label: 'VRAM Capacity', valA: '32 GB GDDR7', valB: '24 GB GDDR6X', winner: 'A' },
    { category: 'Memory', label: 'Memory Bus Width', valA: '512-bit Bus', valB: '384-bit Bus', winner: 'A' },
    { category: 'Bandwidth', label: 'Memory Bandwidth', valA: '1,792 GB/s', valB: '1,008 GB/s', winner: 'A' },
    { category: 'Gaming', label: 'Black Myth 4K Cinematic RT', valA: '84 FPS Native', valB: '52 FPS Native', winner: 'A' },
    { category: 'Gaming', label: 'Cyberpunk 4K RT Overdrive', valA: '132 FPS (DLSS 3.5)', valB: '78 FPS (DLSS 3.5)', winner: 'A' },
    { category: 'Power', label: 'Total Board Power (TBP)', valA: '550 Watts', valB: '450 Watts', winner: 'B' },
  ],
};

export const INITIAL_POLL: { id: string; question: string; totalVotes: number; options: PollOption[] } = {
  id: 'goty-poll',
  question: 'Game of the Year 2024-2026: Which title redefined gaming for you?',
  totalVotes: 24892,
  options: [
    { id: 'astro', label: 'Astro Bot (Team ASOBI)', votes: 9458, percent: 38, color: '#06b6d4' },
    { id: 'wukong', label: 'Black Myth: Wukong (Game Science)', votes: 8463, percent: 34, color: '#f59e0b' },
    { id: 'erdtree', label: 'Elden Ring: Shadow of the Erdtree', votes: 4480, percent: 18, color: '#e63946' },
    { id: 'metaphor', label: 'Metaphor: ReFantazio (Atlus)', votes: 2491, percent: 10, color: '#8b5cf6' },
  ],
};
