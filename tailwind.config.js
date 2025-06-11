// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/_layout.tsx",
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        duoBlue: "var(--duo-blue)",
        darkenedDuoBlue: "var(--darkened-duo-blue)",
        duoGreen: "var(--duo-green)",
        darkenedDuoGreen: "var(--darkened-duo-green)",
        duoPurple: "var(--duo-purple)",
        darkenedDuoPurple: "var(--darkened-duo-purple)",
        duoRed: "var(--duo-red)",
        darkenedDuoRed: "var(--darkened-duo-red)",
        duoOrange: "var(--duo-orange)",
        darkenedDuoOrange: "var(--darkened-duo-orange)",
        duoYellow: "var(--duo-yellow)",
        darkenedDuoYellow: "var(--darkened-duo-yellow)",
        foreground: "var(--foreground)",
        mutedForeground: "var(--muted-foreground)",
        background: "var(--background)",
        muted: "var(--muted)",
        text: "var(--text)",
        border: "var(--border)",
      },
    },
  },
  plugins: [],
};
