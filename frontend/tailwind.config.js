/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maskImage: {
        'scroll-fade': 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      }
    }
  },
  plugins: [],
}