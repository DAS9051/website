import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0b0d12",
        foreground: "#e8f1ff",
        "accent-primary": "#5eead4",
        "accent-secondary": "#f472b6",
        "accent-divider": "rgba(94, 234, 212, 0.12)"
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "'Fira Code'", "Menlo", "monospace"]
      },
      keyframes: {
        "cursor-blink": {
          "0%, 50%": { opacity: "1" },
          "50.01%, 100%": { opacity: "0" }
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "cursor-blink": "cursor-blink 1.2s steps(2, start) infinite",
        "slide-up": "slide-up 240ms ease-out both"
      }
    }
  },
  plugins: []
};

export default config;

