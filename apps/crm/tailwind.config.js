import baseConfig from "@heubert/tailwind-config";

/** @type {import('tailwindcss').Config} */
export default {
  ...baseConfig,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/components/**/*.{jsx,tsx}",
  ],
};
