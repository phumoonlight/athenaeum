module.exports = {
  purge: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'anuphan': ['Anuphan-Regular'],
        'serif-pro': ['SourceSerifPro-SemiBold']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
