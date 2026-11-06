import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: {
          DEFAULT: "var(--surface)",
          2: "var(--surface-2)",
        },
        primaryText: "var(--text)",
        text: "var(--text)",
        muted: "var(--muted)",
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover, #C35A39)",
          light: "var(--accent-light, rgba(217, 108, 74, 0.12))",
          text: "var(--accent-text, var(--accent))",
          2: "var(--accent-2)",
        },
        onAccent: "var(--on-accent, #FFF8EF)",
        accentText: "var(--accent-text, var(--accent))",
        cream: "var(--bg)",
        sand: {
          DEFAULT: "var(--surface)",
          2: "var(--surface-2)",
          light: "var(--surface)",
          dark: "var(--surface-2)",
        },
        espresso: "var(--text)",
        taupe: "var(--muted)",
        terracotta: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover, #C35A39)",
          light: "var(--accent-light, rgba(217, 108, 74, 0.12))",
          subtle: "var(--accent-light, rgba(217, 108, 74, 0.12))",
        },
        sage: {
          DEFAULT: "var(--accent-2)",
          hover: "var(--accent-2)",
          light: "var(--surface-2)",
          subtle: "rgba(138, 154, 120, 0.15)",
        },
        warmBorder: "var(--border, rgba(43, 36, 32, 0.12))",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "warm-ease": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(43, 36, 32, 0.04)",
        card: "0 8px 30px -8px rgba(43, 36, 32, 0.08)",
        "card-hover": "0 20px 60px rgba(43, 36, 32, 0.12)",
        float: "0 25px 60px -15px rgba(43, 36, 32, 0.18)",
      },
      animation: {
        "spin-slow": "spin 22s linear infinite",
        "spin-reverse": "spin-reverse 26s linear infinite",
        "pulse-subtle": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 3s infinite",
      },
      keyframes: {
        "spin-reverse": {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "28px",
      },
    },
  },
  plugins: [],
};

export default config;
