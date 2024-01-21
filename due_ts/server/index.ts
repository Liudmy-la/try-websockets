import WebSocket from "ws";
import express from "express";
import http from "http";
import path from "path";

const app = express();
const myServer = http.createServer(app);
const wsServer = new WebSocket.Server({ noServer: true });
const PORT = 9876;

app.use("/", express.static(path.resolve(__dirname, '../client/index.html')))
console.log(`path.resolve`, path.resolve(__dirname, '../client/index.html'))


interface WebSocketClient {
	send: (data: WebSocket.Data) => void;
	readyState: number;
}

wsServer.on('connection', function (ws: WebSocket) {  
	ws.on('message', function (msg: string) {
		const receivedObj = JSON.parse(msg);
		console.log('parsedObj:', receivedObj);

		// Broadcast the message to all clients
		wsServer.clients.forEach(function each (client: WebSocketClient) {
			if (client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify(receivedObj));
				console.log('stringify:', JSON.stringify(receivedObj))
			}
		});
	});
});


myServer.on("upgrade", async function upgrade(request, socket, head) {
	wsServer.handleUpgrade(request, socket, head, function done(ws: WebSocket) {
		wsServer.emit('connection', ws, request);
	});
}); 

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});