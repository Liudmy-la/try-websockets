const socket = new WebSocket('ws://localhost:3000');

socket.addEventListener('open', (event) => {
	console.log('Connection opened:', event);
});

socket.addEventListener('message', (event) => {
	console.log('Received message:', event.data);
});

socket.addEventListener('close', (event) => {
	console.log('Connection closed:', event);
});