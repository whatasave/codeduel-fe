/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,svelte}"],
  theme: {
    extend: {},
    borderRadius: {
      DEFAULT: '0.5rem',
      sm: '0.25rem',
      full: '50%'
    }
  },
  plugins: [],
}

