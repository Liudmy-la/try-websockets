const WebSocket = require("ws");
const express = require("express");
const app = express()
const path = require("path")

app.use("/", express.static(path.resolve(__dirname, "../client")))

const myServer = app.listen(9876)

const wsServer = new WebSocket.Server({
	noServer: true
})

wsServer.on("connection", function(ws) {
	ws.on("message", function(msg) {
		const receivedObj = JSON.parse(msg);

		console.log('parsedObj:', receivedObj)
		
		wsServer.clients.forEach(function each(client) {
			if (client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify(receivedObj));

				console.log('stringify:', JSON.stringify(receivedObj))
			}
		})
	})
})

myServer.on("upgrade", async function upgrade(request, socket, head) {
	if(Math.random() > 0.5) {
		return socket.end("HTTP/1.1 401 Unauthorized\r\n", "ascii")
	}

	wsServer.handleUpgrade(request, socket, head, function done(ws) {
		wsServer.emit('connection', ws, request);
	});
}); 