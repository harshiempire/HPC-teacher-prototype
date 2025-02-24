/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0447A8',
        background: '#F5F5F5',
        border: '#ECECEC',
      },
      spacing: {
        '24': '24px',
      },
      borderRadius: {
        'card': '24px',
        'cta': '12px',
      },
    },
  },
  plugins: [],
}