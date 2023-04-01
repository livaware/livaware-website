/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Kumbh-Sans', 'Helvetica', 'Arial', 'Sans-Serif'],
    },
    extend: {
      colors: {
        'bg-light-primary': '#efe4e5',
        'brand-navy': '#020121',
        'brand-warm-grey': '#e4eaeb',
        'brand-green': '#00cd9a',
        'brand-taupe': '#Efe4e5',
        'text-light': '#fff',
      },
      maxWidth: {
        'site-width': '1080px',
      },
    },
  },
  plugins: [],
}
