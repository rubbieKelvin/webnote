module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Inter UI',
        serif: 'Mulish'
      },
      fontSize: {
        xs: ['9px', '18px'],
        sm: ['11px', '18px'],
        base: ['13px', '20px'],
        lg: ['15px', '20px'],
        xl: ['17px', '22px'],
        '2xl': ['19px', '24px'],
        '3xl': ['21px', '24px'],
        '4xl': ['23px', '24px'],
        '5xl': ['25px', '26px']
      },
      colors: {
        elevation: "#f5f5f5",
        text: "#151515",
        text: "#282a3d",
        textFaint: "#3c4149",
        accent: "#6173EE",
        danger: "#ee6869",
        stroke: "#eef0f3",
        overlay: "#F3F3F3",
        hoverColor: "#f0f3f9",
        selected: "#8397f2"
      }
    },
  },
  plugins: [],
}
