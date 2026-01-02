import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // indigo
        secondary: "#06B6D4", // cyan
        accent: "#F97316", // orange
      },
      borderRadius: {
        "lg-xl": "0.75rem",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        taskrio: {
          primary: "#4F46E5",
          secondary: "#06B6D4",
          accent: "#F97316",
          neutral: "#1F2937",
          "base-100": "#ffffff",
          info: "#93C5FD",
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },
      "dark",
    ],
    darkTheme: "dark",
  },
};
