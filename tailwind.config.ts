import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      spacing: {
        "1": "8px",
        "2": "12px",
        "3": "16px",
        "4": "24px",
        "5": "32px",
        "6": "48px",
        "8": "96px",
        "12": "192px",
        "24": "384px",
      },
    },
  },
  plugins: [],
} satisfies Config;
