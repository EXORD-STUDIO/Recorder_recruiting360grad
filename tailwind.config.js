/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{svelte,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        header: '3.5rem'
      },
      colors: {
        brand: {
          DEFAULT: 'var(--color-brand)',
          50: 'color-mix(in srgb-linear, var(--color-brand), #fff 85%)',
          100: 'color-mix(in srgb-linear, var(--color-brand), #fff 70%)',
          200: 'color-mix(in srgb-linear, var(--color-brand), #fff 60%)',
          300: 'color-mix(in srgb-linear, var(--color-brand), #fff 40%)',
          400: 'color-mix(in srgb-linear, var(--color-brand), #fff 30%)',
          500: 'var(--color-brand)',
          600: 'color-mix(in srgb-linear, var(--color-brand), #000 20%)',
          700: 'color-mix(in srgb-linear, var(--color-brand), #000 30%)',
          800: 'color-mix(in srgb-linear, var(--color-brand), #000 40%)',
          900: 'color-mix(in srgb-linear, var(--color-brand), #000 50%)',
          950: 'color-mix(in srgb-linear, var(--color-brand), #000 60%)'
        }
      }
    }
  },
  plugins: []
}
