import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";
import tailwindcss from "tailwindcss";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    laravel({
      input: ["resources/js/app.tsx"],
      refresh: true,
    }),
  ],
  build: {
    manifest: true,
    rollupOptions: {
      input: "resources/js/app.tsx",
      external: ["/src/i18n"],
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  resolve: {
    alias: {
      "assets/": path.resolve(__dirname, "resources/js/App/src/assets"),
      "src/i18n": path.resolve(__dirname, "resources/js/App/src/i18n"),
      "src/": path.resolve(__dirname, "resources/js/App/src"),
      "@fuse": path.resolve(__dirname, "resources/js/App/src/@fuse"),
      "@history": path.resolve(__dirname, "resources/js/App/src/@history"),
      "@lodash": path.resolve(__dirname, "resources/js/App/src/@lodash"),
      "@mock-api": path.resolve(__dirname, "resources/js/App/src/@mock-api"),
      "app/store": path.resolve(__dirname, "resources/js/App/src/app/store"),
      "app/shared-components": path.resolve(
        __dirname,
        "resources/js/App/src/app/shared-components"
      ),
      "app/configs": path.resolve(
        __dirname,
        "resources/js/App/src/app/configs"
      ),
      "app/theme-layouts": path.resolve(
        __dirname,
        "resources/js/App/src/app/theme-layouts"
      ),
      "app/AppContext": path.resolve(
        __dirname,
        "resources/js/App/src/app/AppContext"
      ),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    esbuild: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  server: {
    host: "127.0.0.1",
    port: 8000,
  },
});
