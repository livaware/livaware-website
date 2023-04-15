/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/livaware-react-components/dist/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['MetroSans-Book', 'Helvetica', 'Arial', 'Sans-Serif'],
      light: ['MetroSans-Light', 'Helvetica', 'Arial', 'Sans-Serif'],
    },
    extend: {
      colors: {
        'bg-light-primary': '#efe4e5',
        'brand-navy': '#020121',
        'brand-warm-grey': '#e4eaeb',
        'brand-green': '#00cd9a',
        'brand-scrubs': '#42947c',
        'brand-amethyst': '#3e076c',
        'brand-taupe': '#Efe4e5',
        'brand-light-blue': '#E6EAEE',
        'brand-orange': '#dd5a2e',
        'text-light': '#fff',
      },
      maxWidth: {
        'site-width': '1080px',
      },
      maxHeight: {
        'screen-minus-header': 'calc(100vh - var(--headerHeight))',
      },
      height: {
        'screen-minus-header': 'calc(100vh - var(--headerHeight))',
      },
      minHeight: {
        'screen-minus-header': 'calc(100vh - var(--headerHeight))',
      },
    },
  },
  plugins: [],
}
