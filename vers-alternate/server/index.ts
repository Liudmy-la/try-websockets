import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import WebSocket from "ws";
import path from "path";

import routerAll from "./routerAll";
import wsServer from "./useWebsocket";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", routerAll);

//--------------------------------------------------------------------------
app.use("/chat", express.static(path.resolve(__dirname, '../src/client'), {
	setHeaders: (res) => {
		res.setHeader('Content-Type', 'text/html');
	}
}));

const port = process.env.PORT || 7001;

const myServer = app.listen(port, () => {
	console.log(`Server is running on: http://localhost:${port}`)
	});

myServer.on("upgrade", async function upgrade(request, socket, head) {
	wsServer.handleUpgrade(request, socket, head, function done(ws: WebSocket) {
		wsServer.emit('connection', ws, request);
	});
});

export default app;