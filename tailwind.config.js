/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Kumbh-Sans', 'Helvetica', 'Arial', 'Sans-Serif'],
    },
    extend: {
      colors: {
        'brand-navy': '#020121',
        'bg-light-primary': '#efe4e5',
        'brand-green': '#00cd9a',
        'text-light': '#fff',
      },
      maxWidth: {
        'site-width': '1080px',
      },
    },
  },
  plugins: [],
}
