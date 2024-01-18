import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {
  // Send a welcome message on connection
  ws.send('Welcome to the WebSocket server!');

  // Listen for messages from clients
  ws.on('message', (message: string) => {
    console.log(`Received message: ${message}`);

    // Broadcast the message to all clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

// Serve static files from the public directory
app.use(express.static('client'));

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
}); 
