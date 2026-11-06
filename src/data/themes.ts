export interface ThemeTokens {
  bg: string;
  surface: string;
  surface2: string;
  text: string;
  muted: string;
  accent: string;
  accentHover?: string;
  accentText?: string;
  accent2: string;
  onAccent: string;
  border: string;
}

export type ThemeCategory = "all" | "warm" | "cool" | "neutral" | "favorites";

export interface ThemeOption {
  id: string;
  name: string;
  mood: string;
  category: "warm" | "cool" | "neutral";
  bestFor: string;
  tokens: ThemeTokens;
}

export const THEMES: ThemeOption[] = [
  {
    id: "warm-beige",
    name: "Warm Beige & Terracotta",
    mood: "warm, premium",
    category: "warm",
    bestFor: "editorial, creative portfolios",
    tokens: {
      bg: "#F7F1E8",
      surface: "#EFE6D8",
      surface2: "#E8DCCA",
      text: "#2B2420",
      muted: "#7A6F64",
      accent: "#D96C4A",
      accentHover: "#C35A39",
      accentText: "#D96C4A",
      accent2: "#8A9A78",
      onAccent: "#FFF8EF",
      border: "rgba(43, 36, 32, 0.12)",
    },
  },
  {
    id: "sage-linen",
    name: "Sage & Linen",
    mood: "calm, organic",
    category: "cool",
    bestFor: "sustainability, architecture, wellness",
    tokens: {
      bg: "#F4F1EA",
      surface: "#E9E5D8",
      surface2: "#DDD8C7",
      text: "#252B24",
      muted: "#6B7266",
      accent: "#6F8F72",
      accentHover: "#5B7B5E",
      accentText: "#527055",
      accent2: "#C9A96E",
      onAccent: "#FFFFFF",
      border: "rgba(37, 43, 36, 0.12)",
    },
  },
  {
    id: "lavender-cream",
    name: "Lavender & Cream",
    mood: "creative, editorial",
    category: "cool",
    bestFor: "design studios, art directors",
    tokens: {
      bg: "#FAF7F2",
      surface: "#EFE9F5",
      surface2: "#E3DAEE",
      text: "#2A2433",
      muted: "#7B7388",
      accent: "#8E78C9",
      accentHover: "#7861B5",
      accentText: "#7359B3",
      accent2: "#F2B8A2",
      onAccent: "#FFFFFF",
      border: "rgba(42, 36, 51, 0.12)",
    },
  },
  {
    id: "blush-sand",
    name: "Blush & Sand",
    mood: "soft, refined",
    category: "warm",
    bestFor: "fashion, lifestyle, product design",
    tokens: {
      bg: "#FBF4EF",
      surface: "#F3E3DA",
      surface2: "#EAD3C7",
      text: "#33262A",
      muted: "#8A7378",
      accent: "#C9677A",
      accentHover: "#B35165",
      accentText: "#A6475B",
      accent2: "#B08968",
      onAccent: "#FFFFFF",
      border: "rgba(51, 38, 42, 0.12)",
    },
  },
  {
    id: "ice-blue",
    name: "Ice Blue & Slate",
    mood: "clean, tech-forward",
    category: "cool",
    bestFor: "SaaS, fintech, engineers",
    tokens: {
      bg: "#F6F9FC",
      surface: "#E6EEF7",
      surface2: "#D5E1EF",
      text: "#14213D",
      muted: "#64748B",
      accent: "#3B6FE0",
      accentHover: "#285ACB",
      accentText: "#2454BA",
      accent2: "#7DD3C0",
      onAccent: "#FFFFFF",
      border: "rgba(20, 33, 61, 0.12)",
    },
  },
  {
    id: "butter-ivory",
    name: "Butter & Ivory",
    mood: "playful, sunny",
    category: "warm",
    bestFor: "agencies, illustration, branding",
    tokens: {
      bg: "#FFFBEF",
      surface: "#FAF0CF",
      surface2: "#F3E6B4",
      text: "#2D2A1F",
      muted: "#7A745F",
      accent: "#F2B731",
      accentHover: "#DDA020",
      accentText: "#966C05", // WCAG AA compliant contrast on #FFFBEF
      accent2: "#2F4F4F",
      onAccent: "#2D2A1F", // Dark text on bright yellow accent button
      border: "rgba(45, 42, 31, 0.12)",
    },
  },
  {
    id: "mint-porcelain",
    name: "Mint & Porcelain",
    mood: "fresh, crisp",
    category: "cool",
    bestFor: "healthcare, clean tech, modern apps",
    tokens: {
      bg: "#F5FAF7",
      surface: "#E2F0E8",
      surface2: "#D0E5D9",
      text: "#1C2B26",
      muted: "#62786F",
      accent: "#2FA37A",
      accentHover: "#248C67",
      accentText: "#1F825F",
      accent2: "#F4A988",
      onAccent: "#FFFFFF",
      border: "rgba(28, 43, 38, 0.12)",
    },
  },
  {
    id: "peach-oat",
    name: "Peach & Oat",
    mood: "friendly, human",
    category: "warm",
    bestFor: "community, writing, consulting",
    tokens: {
      bg: "#FAF3EA",
      surface: "#F4E1CC",
      surface2: "#EBD3B8",
      text: "#3A2A22",
      muted: "#8C766A",
      accent: "#E8875B",
      accentHover: "#D37346",
      accentText: "#C86537",
      accent2: "#5E7C6B",
      onAccent: "#FFFFFF",
      border: "rgba(58, 42, 34, 0.12)",
    },
  },
  {
    id: "greige-navy",
    name: "Greige & Navy",
    mood: "corporate, confident",
    category: "neutral",
    bestFor: "enterprise, consultancy, finance",
    tokens: {
      bg: "#F2EFEA",
      surface: "#E4DFD6",
      surface2: "#D6D0C4",
      text: "#111827",
      muted: "#6B6F76",
      accent: "#1F3A6E",
      accentHover: "#152A52",
      accentText: "#1F3A6E",
      accent2: "#B8963E",
      onAccent: "#FFFFFF",
      border: "rgba(17, 24, 39, 0.12)",
    },
  },
];

export const DEFAULT_THEME_ID = "warm-beige";

export function getTheme(id: string): ThemeOption {
  return THEMES.find((t) => t.id === id) || THEMES[0];
}

