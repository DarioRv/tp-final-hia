/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'core-primary': '#4F46E5',
        'core-primary-100': '#E9E8FF',
        'core-primary-200': '#C8C6FF',
        'core-primary-300': '#A7A4e5',
        'core-primary-400': '#A7A4FF',
        'core-primary-500': '#4F46E5',
        'core-primary-600': '#3D3AB3',
        'core-primary-700': '#2B2F80',
        'core-primary-800': '#191D4D',
        'core-secondary': '#c53897',
        'core-secondary-100': '#f5e1f7',
        'core-secondary-200': '#e3bde3',
        'core-secondary-300': '#d19ad0',
        'core-secondary-400': '#bf76bc',
        'core-secondary-500': '#ad53a9',
        'core-secondary-600': '#8c4388',
        'core-secondary-700': '#6b3467',
        'core-secondary-800': '#4a2446',
      }
    }
  },
  darkMode: ['class'],
  plugins: [],
}

