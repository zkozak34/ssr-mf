import cors from "cors";
import express from "express";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer as createViteServer } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 3001;

async function createServer() {
	const app = express();
	app.use(cors());
	const vite = await createViteServer({
		server: { middlewareMode: true },
		appType: "custom",
	});
	app.use(vite.middlewares);
	app.use(express.static(resolve(__dirname, "public")));
	app.use(express.static(resolve(__dirname, "dist")));
	app.use("*", (req, res) => {
		res.sendFile(resolve(__dirname, "public/index.html"));
	});
	app.listen(port, () => {
		console.log(`Server running on http://localhost:${port}`);
	});
}

createServer();
