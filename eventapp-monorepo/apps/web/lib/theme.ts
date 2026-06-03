// lib/theme.ts — theme definitions for every event/sub-event type

export type ThemeKey =
  | "mehndi"
  | "haldi"
  | "sangeet"
  | "baraat"
  | "reception"
  | "engagement"
  | "birthday"
  | "punjabi"
  | "tamil"
  | "muslim"
  | "christian"
  | "bengali"
  | "wedding"
  | "corporate";

export interface EventTheme {
  key: ThemeKey;
  label: string;
  emoji: string;
  gradient: string;        // Tailwind-free CSS gradient
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgFrom: string;
  bgTo: string;
  textColor: string;
  mutedColor: string;
  cardBg: string;
  borderColor: string;
  glowColor: string;
  motifs: string[];        // decorative emoji motifs
  description: string;
  fontHeading: string;
}

export const THEMES: Record<ThemeKey, EventTheme> = {
  mehndi: {
    key: "mehndi",
    label: "Mehndi",
    emoji: "🌿",
    gradient: "linear-gradient(135deg, #1a2410, #0d1a08)",
    primaryColor: "#7cb518",
    secondaryColor: "#d4a017",
    accentColor: "#a8cc5a",
    bgFrom: "#1a2410",
    bgTo: "#0d1a08",
    textColor: "#e8f4d0",
    mutedColor: "#a8c47a",
    cardBg: "rgba(20,36,12,0.88)",
    borderColor: "rgba(124,181,24,0.25)",
    glowColor: "rgba(124,181,24,0.2)",
    motifs: ["🌿", "🍃", "✨", "🌸", "🌺"],
    description: "Henna patterns, earthy greens & golden warmth",
    fontHeading: "'Playfair Display', serif",
  },
  haldi: {
    key: "haldi",
    label: "Haldi",
    emoji: "💛",
    gradient: "linear-gradient(135deg, #2a1a00, #1a0f00)",
    primaryColor: "#f59e0b",
    secondaryColor: "#ea580c",
    accentColor: "#fbbf24",
    bgFrom: "#2a1a00",
    bgTo: "#1a0f00",
    textColor: "#fef3c7",
    mutedColor: "#fcd34d",
    cardBg: "rgba(42,26,0,0.88)",
    borderColor: "rgba(245,158,11,0.3)",
    glowColor: "rgba(245,158,11,0.25)",
    motifs: ["💛", "🌻", "✨", "🌼", "🫚"],
    description: "Turmeric yellows, marigold oranges, joyful radiance",
    fontHeading: "'Playfair Display', serif",
  },
  sangeet: {
    key: "sangeet",
    label: "Sangeet",
    emoji: "🎶",
    gradient: "linear-gradient(135deg, #1a0535, #0d0018)",
    primaryColor: "#a855f7",
    secondaryColor: "#ec4899",
    accentColor: "#f0abfc",
    bgFrom: "#1a0535",
    bgTo: "#0d0018",
    textColor: "#fce7f3",
    mutedColor: "#c084fc",
    cardBg: "rgba(26,5,53,0.88)",
    borderColor: "rgba(168,85,247,0.3)",
    glowColor: "rgba(168,85,247,0.25)",
    motifs: ["🎶", "🎵", "💃", "🪘", "✨"],
    description: "Electric purples, neon pinks — music & dance",
    fontHeading: "'Playfair Display', serif",
  },
  baraat: {
    key: "baraat",
    label: "Baraat",
    emoji: "🐴",
    gradient: "linear-gradient(135deg, #1a0810, #0d0008)",
    primaryColor: "#dc2626",
    secondaryColor: "#d4a017",
    accentColor: "#f87171",
    bgFrom: "#1a0810",
    bgTo: "#0d0008",
    textColor: "#fff1f2",
    mutedColor: "#fca5a5",
    cardBg: "rgba(26,8,16,0.88)",
    borderColor: "rgba(220,38,38,0.3)",
    glowColor: "rgba(220,38,38,0.25)",
    motifs: ["🐴", "🥁", "🎺", "🎇", "👑"],
    description: "Bold reds, royal golds — the procession begins",
    fontHeading: "'Playfair Display', serif",
  },
  reception: {
    key: "reception",
    label: "Reception",
    emoji: "💍",
    gradient: "linear-gradient(135deg, #0d1a2e, #07101e)",
    primaryColor: "#d4a017",
    secondaryColor: "#1d4ed8",
    accentColor: "#93c5fd",
    bgFrom: "#0d1a2e",
    bgTo: "#07101e",
    textColor: "#eff6ff",
    mutedColor: "#bfdbfe",
    cardBg: "rgba(13,26,46,0.9)",
    borderColor: "rgba(212,160,23,0.25)",
    glowColor: "rgba(212,160,23,0.2)",
    motifs: ["💍", "🥂", "✨", "🌟", "🕯️"],
    description: "Midnight blue, champagne gold — elegance & celebration",
    fontHeading: "'Playfair Display', serif",
  },
  engagement: {
    key: "engagement",
    label: "Ring Ceremony",
    emoji: "💍",
    gradient: "linear-gradient(135deg, #1a0d24, #0e0818)",
    primaryColor: "#db2777",
    secondaryColor: "#9333ea",
    accentColor: "#f9a8d4",
    bgFrom: "#1a0d24",
    bgTo: "#0e0818",
    textColor: "#fdf2f8",
    mutedColor: "#f0abfc",
    cardBg: "rgba(26,13,36,0.88)",
    borderColor: "rgba(219,39,119,0.3)",
    glowColor: "rgba(219,39,119,0.25)",
    motifs: ["💍", "🌸", "✨", "💗", "🌺"],
    description: "Rose pinks, violets — the promise of forever",
    fontHeading: "'Playfair Display', serif",
  },
  birthday: {
    key: "birthday",
    label: "Birthday Party",
    emoji: "🎂",
    gradient: "linear-gradient(135deg, #0d1a2a, #060d18)",
    primaryColor: "#06b6d4",
    secondaryColor: "#f59e0b",
    accentColor: "#67e8f9",
    bgFrom: "#0d1a2a",
    bgTo: "#060d18",
    textColor: "#ecfeff",
    mutedColor: "#a5f3fc",
    cardBg: "rgba(13,26,42,0.9)",
    borderColor: "rgba(6,182,212,0.3)",
    glowColor: "rgba(6,182,212,0.25)",
    motifs: ["🎂", "🎉", "🎈", "🥳", "🎁"],
    description: "Vibrant cyans, joyful ambers — celebrate life!",
    fontHeading: "'Playfair Display', serif",
  },
  punjabi: {
    key: "punjabi",
    label: "Punjabi Wedding",
    emoji: "🌾",
    gradient: "linear-gradient(135deg, #1f0a05, #0f0503)",
    primaryColor: "#f59e0b",
    secondaryColor: "#dc2626",
    accentColor: "#fbbf24",
    bgFrom: "#1f0a05",
    bgTo: "#0f0503",
    textColor: "#fef9e7",
    mutedColor: "#fcd34d",
    cardBg: "rgba(31,10,5,0.9)",
    borderColor: "rgba(245,158,11,0.3)",
    glowColor: "rgba(245,158,11,0.25)",
    motifs: ["🌾", "🎊", "🥁", "🌸", "✨"],
    description: "Mustard fields, phulkari patterns, bhangra spirit",
    fontHeading: "'Rozha One', serif",
  },
  tamil: {
    key: "tamil",
    label: "Tamil Wedding",
    emoji: "🌺",
    gradient: "linear-gradient(135deg, #1a0a00, #0d0500)",
    primaryColor: "#dc2626",
    secondaryColor: "#d4a017",
    accentColor: "#fca5a5",
    bgFrom: "#1a0a00",
    bgTo: "#0d0500",
    textColor: "#fff5f5",
    mutedColor: "#fca5a5",
    cardBg: "rgba(26,10,0,0.9)",
    borderColor: "rgba(220,38,38,0.3)",
    glowColor: "rgba(220,38,38,0.25)",
    motifs: ["🌺", "🪷", "🕌", "🌸", "✨"],
    description: "Temple reds, jasmine whites, kolam gold",
    fontHeading: "'Marcellus', serif",
  },
  muslim: {
    key: "muslim",
    label: "Muslim Wedding",
    emoji: "🌙",
    gradient: "linear-gradient(135deg, #064e3b, #022c22)",
    primaryColor: "#d4a017",
    secondaryColor: "#10b981",
    accentColor: "#34d399",
    bgFrom: "#064e3b",
    bgTo: "#022c22",
    textColor: "#f0fdf4",
    mutedColor: "#a7f3d0",
    cardBg: "rgba(6, 78, 59, 0.85)",
    borderColor: "rgba(212, 160, 23, 0.3)",
    glowColor: "rgba(16, 185, 129, 0.25)",
    motifs: ["🌙", "⭐", "🕌", "🌹", "✨"],
    description: "Emerald green, geometric gold — Nikah blessings",
    fontHeading: "'El Messiri', serif",
  },
  christian: {
    key: "christian",
    label: "Christian Wedding",
    emoji: "⛪",
    gradient: "linear-gradient(135deg, #1a1510, #100e08)",
    primaryColor: "#d4a017",
    secondaryColor: "#c2410c",
    accentColor: "#fde68a",
    bgFrom: "#1a1510",
    bgTo: "#100e08",
    textColor: "#fffbf0",
    mutedColor: "#fde68a",
    cardBg: "rgba(26,21,16,0.9)",
    borderColor: "rgba(212,160,23,0.25)",
    glowColor: "rgba(212,160,23,0.2)",
    motifs: ["⛪", "🌹", "🕊️", "💒", "✨"],
    description: "Ivory, blush, chapel gold — timeless grace",
    fontHeading: "'Cormorant Garamond', serif",
  },
  bengali: {
    key: "bengali",
    label: "Bengali Wedding",
    emoji: "🏮",
    gradient: "linear-gradient(135deg, #1a0505, #0d0303)",
    primaryColor: "#dc2626",
    secondaryColor: "#f5f0eb",
    accentColor: "#fca5a5",
    bgFrom: "#1a0505",
    bgTo: "#0d0303",
    textColor: "#fff5f5",
    mutedColor: "#fecaca",
    cardBg: "rgba(26,5,5,0.9)",
    borderColor: "rgba(220,38,38,0.3)",
    glowColor: "rgba(220,38,38,0.25)",
    motifs: ["🏮", "🌸", "🪷", "🐚", "✨"],
    description: "Shakha-pola red-white, alpona motifs",
    fontHeading: "'Rozha One', serif",
  },
  wedding: {
    key: "wedding",
    label: "Wedding",
    emoji: "👰",
    gradient: "linear-gradient(135deg, #FEF9EC, #FFF1F3)",
    primaryColor: "#F0A500",
    secondaryColor: "#C0392B",
    accentColor: "#FFE066",
    bgFrom: "#FEF9EC",
    bgTo: "#FFF1F3",
    textColor: "#2C1810",
    mutedColor: "#A07060",
    cardBg: "rgba(255,255,255,0.9)",
    borderColor: "rgba(240,165,0,0.25)",
    glowColor: "rgba(240,165,0,0.20)",
    motifs: ["👰", "🤵", "💍", "🌹", "✨"],
    description: "Shaadi Shringaar — Bridal Radiance",
    fontHeading: "'Playfair Display', serif",
  },

  corporate: {
    key: "corporate",
    label: "Corporate Event",
    emoji: "🏢",
    gradient: "linear-gradient(135deg, #0f172a, #020617)",
    primaryColor: "#3b82f6",
    secondaryColor: "#10b981",
    accentColor: "#60a5fa",
    bgFrom: "#0f172a",
    bgTo: "#020617",
    textColor: "#f0f9ff",
    mutedColor: "#93c5fd",
    cardBg: "rgba(15,23,42,0.9)",
    borderColor: "rgba(59,130,246,0.25)",
    glowColor: "rgba(59,130,246,0.2)",
    motifs: ["🏢", "💼", "🤝", "📊", "🌟"],
    description: "Professional blue — modern corporate elegance",
    fontHeading: "'Inter', sans-serif",
  },
};

// Map sub-event types to their themes
export const SUB_EVENT_THEME_MAP: Record<string, ThemeKey> = {
  mehndi: "mehndi",
  haldi: "haldi",
  sangeet: "sangeet",
  baraat: "baraat",
  reception: "reception",
  engagement: "engagement",
  ring_ceremony: "engagement",
  birthday_party: "birthday",
  birthday: "birthday",
  wedding: "wedding",
  nikah: "muslim",
  walima: "muslim",
  corporate: "corporate",
};

export function getTheme(key: ThemeKey | string): EventTheme {
  return THEMES[key as ThemeKey] ?? THEMES.wedding;
}

export function getSubEventTheme(subType: string | null | undefined): EventTheme {
  if (!subType) return THEMES.wedding;
  const themeKey = SUB_EVENT_THEME_MAP[subType.toLowerCase()] ?? "wedding";
  return THEMES[themeKey];
}
