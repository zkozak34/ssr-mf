import federation from "@originjs/vite-plugin-federation";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "host-1",
      filename: "remoteEntry.js",
      exposes: {
        "./Host1": "./src/App.vue",
      },
      shared: ["vue"],
    }),
  ],
  build: {
    target: "esnext",
  },
  server: {
    port: 5001,
  },
});
