"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { THEMES, DEFAULT_THEME_ID, ThemeOption, getTheme } from "@/data/themes";

interface ThemeContextType {
  theme: ThemeOption;
  themeId: string;
  setTheme: (id: string, updateUrl?: boolean) => void;
  nextTheme: () => void;
  prevTheme: () => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  finalTheme: string | null;
  setFinalTheme: (id: string) => void;
  isPanelOpen: boolean;
  setIsPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  togglePanel: () => void;
  isPresentationPlaying: boolean;
  togglePresentation: () => void;
  stopPresentation: () => void;
  presentationProgress: number;
  currentThemeIndex: number;
  font: "jakarta" | "manrope" | "dmsans";
  setFont: (fontId: "jakarta" | "manrope" | "dmsans") => void;
  copyThemeLink: (id?: string) => Promise<string>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const CYCLE_DURATION_MS = 4000;
const PROGRESS_INTERVAL_MS = 50;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeIdState] = useState<string>(DEFAULT_THEME_ID);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [finalTheme, setFinalThemeState] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const [isPresentationPlaying, setIsPresentationPlaying] = useState<boolean>(false);
  const [presentationProgress, setPresentationProgress] = useState<number>(0);
  const [font, setFontState] = useState<"jakarta" | "manrope" | "dmsans">("jakarta");

  const presentationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressStartTimeRef = useRef<number>(0);

  // Apply theme to DOM and meta tags with smooth transition or View Transition API
  const applyThemeToDOM = useCallback((id: string) => {
    const targetTheme = getTheme(id);

    const updateDOM = () => {
      document.documentElement.setAttribute("data-theme", targetTheme.id);

      // Update <meta name="theme-color">
      let metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (!metaThemeColor) {
        metaThemeColor = document.createElement("meta");
        metaThemeColor.setAttribute("name", "theme-color");
        document.head.appendChild(metaThemeColor);
      }
      metaThemeColor.setAttribute("content", targetTheme.tokens.bg);
    };

    // Check if View Transitions API is supported and user doesn't prefer reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if ("startViewTransition" in document && !prefersReducedMotion) {
      try {
        const transition = (
          document as unknown as {
            startViewTransition: (cb: () => void) => {
              ready?: Promise<void>;
              finished?: Promise<void>;
              updateCallbackDone?: Promise<void>;
            };
          }
        ).startViewTransition(() => {
          updateDOM();
        });

        // Catch AbortError when rapid clicks or animations trigger a new view transition
        transition?.ready?.catch(() => {});
        transition?.finished?.catch(() => {});
        transition?.updateCallbackDone?.catch(() => {});
      } catch {
        updateDOM();
      }
    } else {
      // Fallback CSS transition class
      document.documentElement.classList.add("theme-transitioning");
      updateDOM();
      setTimeout(() => {
        document.documentElement.classList.remove("theme-transitioning");
      }, 350);
    }
  }, []);

  // Set Theme
  const setTheme = useCallback(
    (id: string, updateUrl: boolean = false) => {
      const validTheme = getTheme(id);
      setThemeIdState(validTheme.id);
      try {
        localStorage.setItem("kshitiz-theme", validTheme.id);
      } catch {
        // LocalStorage might fail in private browsing
      }
      applyThemeToDOM(validTheme.id);

      if (updateUrl && typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.set("theme", validTheme.id);
        window.history.replaceState({}, "", url.toString());
      }
    },
    [applyThemeToDOM]
  );

  // Next / Prev theme
  const nextTheme = useCallback(() => {
    setThemeIdState((prev) => {
      const currentIndex = THEMES.findIndex((t) => t.id === prev);
      const nextIndex = (currentIndex + 1) % THEMES.length;
      const nextId = THEMES[nextIndex].id;
      try {
        localStorage.setItem("kshitiz-theme", nextId);
      } catch {}
      applyThemeToDOM(nextId);
      return nextId;
    });
  }, [applyThemeToDOM]);

  const prevTheme = useCallback(() => {
    setThemeIdState((prev) => {
      const currentIndex = THEMES.findIndex((t) => t.id === prev);
      const prevIndex = (currentIndex - 1 + THEMES.length) % THEMES.length;
      const prevId = THEMES[prevIndex].id;
      try {
        localStorage.setItem("kshitiz-theme", prevId);
      } catch {}
      applyThemeToDOM(prevId);
      return prevId;
    });
  }, [applyThemeToDOM]);

  // Set Font
  const setFont = useCallback((fontId: "jakarta" | "manrope" | "dmsans") => {
    setFontState(fontId);
    document.documentElement.setAttribute("data-font", fontId);
    try {
      localStorage.setItem("kshitiz-font", fontId);
    } catch {}
  }, []);

  // Favorites
  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("kshitiz-theme-favorites", JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  // Final Theme Selection
  const setFinalTheme = useCallback((id: string) => {
    setFinalThemeState(id);
    try {
      localStorage.setItem("kshitiz-theme-final", id);
    } catch {}
  }, []);

  // Toggle Panel
  const togglePanel = useCallback(() => {
    setIsPanelOpen((prev) => !prev);
  }, []);

  // Stop Presentation
  const stopPresentation = useCallback(() => {
    setIsPresentationPlaying(false);
    if (presentationTimerRef.current) clearInterval(presentationTimerRef.current);
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    setPresentationProgress(0);
  }, []);

  // Toggle Presentation
  const togglePresentation = useCallback(() => {
    setIsPresentationPlaying((prev) => {
      const nextState = !prev;
      if (!nextState) {
        if (presentationTimerRef.current) clearInterval(presentationTimerRef.current);
        if (progressTimerRef.current) clearInterval(progressTimerRef.current);
        setPresentationProgress(0);
      }
      return nextState;
    });
  }, []);

  // Copy theme link
  const copyThemeLink = useCallback(
    async (id?: string) => {
      const targetId = id || themeId;
      if (typeof window !== "undefined") {
        const url = new URL(window.location.origin + window.location.pathname);
        url.searchParams.set("theme", targetId);
        await navigator.clipboard.writeText(url.toString());
        return url.toString();
      }
      return "";
    },
    [themeId]
  );

  // Initialize from URL param or LocalStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Theme initialization
    const params = new URLSearchParams(window.location.search);
    const paramTheme = params.get("theme");
    const paramFont = params.get("font") as "jakarta" | "manrope" | "dmsans" | null;

    let initialTheme = DEFAULT_THEME_ID;
    try {
      const storedTheme = localStorage.getItem("kshitiz-theme");
      const storedFavorites = localStorage.getItem("kshitiz-theme-favorites");
      const storedFinal = localStorage.getItem("kshitiz-theme-final");
      const storedFont = localStorage.getItem("kshitiz-font") as "jakarta" | "manrope" | "dmsans" | null;

      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
      if (storedFinal) {
        setFinalThemeState(storedFinal);
      }
      if (paramTheme && THEMES.some((t) => t.id === paramTheme)) {
        initialTheme = paramTheme;
      } else if (storedTheme && THEMES.some((t) => t.id === storedTheme)) {
        initialTheme = storedTheme;
      }

      if (paramFont && ["jakarta", "manrope", "dmsans"].includes(paramFont)) {
        setFontState(paramFont);
        document.documentElement.setAttribute("data-font", paramFont);
      } else if (storedFont && ["jakarta", "manrope", "dmsans"].includes(storedFont)) {
        setFontState(storedFont);
        document.documentElement.setAttribute("data-font", storedFont);
      }
    } catch {
      // Ignore storage errors
    }

    setThemeIdState(initialTheme);
    applyThemeToDOM(initialTheme);
  }, [applyThemeToDOM]);

  // Presentation Auto-Cycling Effect
  useEffect(() => {
    if (!isPresentationPlaying) {
      if (presentationTimerRef.current) clearInterval(presentationTimerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      setPresentationProgress(0);
      return;
    }

    progressStartTimeRef.current = Date.now();

    // Progress bar ticker
    progressTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - progressStartTimeRef.current;
      const progress = Math.min(100, (elapsed / CYCLE_DURATION_MS) * 100);
      setPresentationProgress(progress);
    }, PROGRESS_INTERVAL_MS);

    // Main cycle ticker
    presentationTimerRef.current = setInterval(() => {
      nextTheme();
      progressStartTimeRef.current = Date.now();
      setPresentationProgress(0);
    }, CYCLE_DURATION_MS);

    return () => {
      if (presentationTimerRef.current) clearInterval(presentationTimerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPresentationPlaying, nextTheme]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input, textarea, or contentEditable
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      // "T" toggles the panel
      if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        setIsPanelOpen((prev) => !prev);
        return;
      }

      // ESC closes the panel and stops presentation mode
      if (e.key === "Escape") {
        if (isPresentationPlaying) stopPresentation();
        if (isPanelOpen) setIsPanelOpen(false);
        return;
      }

      // Left / Right arrows navigate themes when panel or presentation is open
      if (isPanelOpen || isPresentationPlaying) {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          nextTheme();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          prevTheme();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPanelOpen, isPresentationPlaying, nextTheme, prevTheme, stopPresentation]);

  const currentTheme = getTheme(themeId);
  const currentThemeIndex = THEMES.findIndex((t) => t.id === themeId);

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        themeId,
        setTheme,
        nextTheme,
        prevTheme,
        favorites,
        toggleFavorite,
        isFavorite,
        finalTheme,
        setFinalTheme,
        isPanelOpen,
        setIsPanelOpen,
        togglePanel,
        isPresentationPlaying,
        togglePresentation,
        stopPresentation,
        presentationProgress,
        currentThemeIndex,
        font,
        setFont,
        copyThemeLink,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
