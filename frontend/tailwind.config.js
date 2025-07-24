module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        'logo-grow-fade': {
          '0%': { transform: 'scale(0.5)', opacity: '0' },  
          '100%': { transform: 'scale(1)', opacity: '1' }, 
        }
      },
      animation: {
        'logo-grow-fade': 'logo-grow-fade 1.5s ease-out forwards',
      }
    },
  },
  plugins: [],
}
