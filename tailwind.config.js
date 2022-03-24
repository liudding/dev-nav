module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    maxWidth: {
      '8xl': '90rem',
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
