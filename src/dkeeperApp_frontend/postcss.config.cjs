module.exports = {
  plugins: [
    require('@tailwindcss/postcss')({
      config: './tailwind.config.js', // Path to your Tailwind CSS configuration
    }),
    require('autoprefixer'), // Optional: Adds vendor prefixes to CSS rules
  ],
};