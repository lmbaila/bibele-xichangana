/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // Layout / spacing lives in Tailwind classes; the three reading
      // themes (light / sepia / night) are applied at runtime through the
      // ThemeProvider colour object, so these tokens are the "light" defaults.
      colors: {
        sand: '#F3E1A8',
        sage: '#CDE0C4',
        rose: '#F0CFC9',
        sky: '#CBD9EC',
        clay: '#E8C4A0',
      },
      fontFamily: {
        serif: ['Newsreader_500Medium'],
        'serif-i': ['Newsreader_400Regular_Italic'],
        sans: ['Manrope_500Medium'],
        'sans-bold': ['Manrope_700Bold'],
      },
    },
  },
  plugins: [],
};
