module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'mulish',
        serif: 'skm'
      },
      colors: {
        elevation: "#f5f5f5",
        text: "#151515",
        accent: "#6173EE",
        danger: "#ee6869",
        stroke: "#D6D6D6",
        overlay: "#F3F3F3"
      }
    },
  },
  plugins: [],
}
