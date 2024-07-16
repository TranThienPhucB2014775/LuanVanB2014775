import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      maxWidth: {
        "ct-max-width": "1440px",
      },
      fontFamily: {
        "font-Manrope": ["Manrope", "sans-serif"],
        "font-inter": ["Inter", 'sans-serif']
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        Primary: {
          B100: "#F0F1FF",
          B200: "#E3E5FF",
          B300: "#B7BFFF",
          B400: "#A8B2FF",
          B500: "#97A6FF",
          B600: "#869AFF",
          B700: "#728FFF",
          B800: "#728FFF",
          B900: "#4078FF",
        },
        Neutral: {
          N100: "#E8EFFD",
          N200: "#B6B7BC",
          N300: "#878A92",
          N400: "#71747E",
          N500: "#5C5F6A",
          N600: "#474B57",
          N700: "#333845",
          N800: "#202533",
          N900: "#0E1422",
          w100: "#F6F6F6",
          W200: "#E9E9EB",
          w900: "#FFFFFF",
        },
        Semantic: {
          B100: "#E6F7FF",
          B200: "#D1DEFB",
          B300: "#BACEFA",
          B400: "#A3BEF8",
          B500: "#8CB0F6",
          B600: "#759DF4",
          B700: "#5E8CF3",
          B800: "#477CF1",
          B900: "#306CEF",

          G100: "#D5E5D7",
          G200: "#C1D8C4",
          G300: "#98BE9E",
          G400: "#83B18B",
          G500: "#6FA479",
          G600: "#5A9868",
          G700: "#458B56",
          G800: "#2C7F45",
          G900: "#057234",

          R100: "#FBD9D0",
          R200: "#F8C5B9",
          R300: "#EE9F8D",
          R400: "#E88C77",
          R500: "#E17862",
          R600: "#D9644E",
          R700: "#D14F3A",
          R800: "#C83727",
          R900: "#BE1313",

          Y100: "#FFF1D8",
          Y200: "#FFEAC4",
          Y300: "#FFDC9E",
          Y400: "#FFD58A",
          Y500: "#FDCF76",
          Y600: "#FBC862",
          Y700: "#F9C14C",
          Y800: "#F6BB33",
          Y900: "#F3B40A",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config