/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        slideLeft: "slideLeft 0.2s linear forwards",
        slideRight: "slideRight 0.2s linear forwards"
      },
      keyframes: {
        slideLeft: {
          '0%': { transform: "translateX(120%)" },
          '100%': { transform: "translateX(0%)" }
        },
        slideRight: {
          '0%': { transform: "translateX(0%)" },
          '100%': { transform: "translateX(120%)" }
        }
      }
    }
  }
}
