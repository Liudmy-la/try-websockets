const url = "ws://localhost:9876/myWebsocket"
const mywsServer = new WebSocket(url)

const myMessages = document.querySelector<HTMLElement>("#messages");
const myInput = document.querySelector<HTMLInputElement>("#message");
const sendBtn = document.querySelector<HTMLButtonElement>("#send");

if (sendBtn) {
	sendBtn.disabled = true;
}

interface MessageObject {
	text?: string;
	nic?: string;
}

function msgGeneration(msg: MessageObject, from: string) {
	const newMessage = document.createElement("h5");
	newMessage.innerText = `${from} send: ${msg.text} from ${msg.nic}`;

	myMessages?.appendChild(newMessage);
}

function sendMsg() {
	const obj: MessageObject = {
		text: myInput?.value,
		nic: window.navigator.appName,
	};

	msgGeneration(obj, "Client")
	mywsServer.send(JSON.stringify(obj));

	console.log('obj to send: ', JSON.stringify(obj));
}

sendBtn?.addEventListener("click", sendMsg, false);
mywsServer.onopen = function() {
	if (sendBtn) {
		sendBtn.disabled = false;
	}
};

mywsServer.onmessage = function(event: MessageEvent) {
	const receivedObj = JSON.parse(event.data);
	msgGeneration(receivedObj, "Server");
	
	console.log('received data:', JSON.parse(event.data));
}