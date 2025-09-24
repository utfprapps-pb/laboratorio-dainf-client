/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '426px', // custom breakpoint between base and sm
        'mdp': '769px', // acima de 768px
      },
    },
  },
  plugins: [],
}
