import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icons/icon.svg"],
      manifest: {
        name: "Habit Tracker",
        short_name: "Habits",
        description: "Track your daily habits and build better routines",
        theme_color: "#14b8a6",
        background_color: "#0f172a",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        icons: [
          {
            src: "icons/icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any",
          },
          {
            src: "icons/icon.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
    }),
  ],
});

