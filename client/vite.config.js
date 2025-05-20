import { defineConfig } from "vite";
import path, { dirname } from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(dirname(fileURLToPath(import.meta.url)), "src"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
});
