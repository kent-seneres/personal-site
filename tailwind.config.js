module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // https://www.markusantonwolf.com/blog/solution-to-the-mobile-viewport-height-issue-with-tailwind-css/
      minHeight: (theme) => ({
        0: "0",
        ...theme("spacing"),
        screen: "calc(var(--vh) * 100)",
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
