/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"], // คุมด้วย class
  content: [
    './src/**/*.{js,ts,jsx,tsx,css}', // เพิ่ม scss
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        }
      }
    },
  },
  plugins: [],
}
