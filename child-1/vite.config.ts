import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue()],
	build: {
		rollupOptions: {
			input: {
				main: "./src/main.ts",
				entryVue: "./src/entryVue.ts",
			},
			output: {
				format: "es",
				entryFileNames: "[name].js",
			},
			preserveEntrySignatures: "exports-only",
		},
	},
});
