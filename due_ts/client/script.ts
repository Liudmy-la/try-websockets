const url = "ws://localhost:9876/myWebsocket"
const mywsServer = new WebSocket(url)

const myMessages : HTMLElement | null = document.querySelector("#messages");
const myInput : HTMLInputElement | null = document.querySelector("#message");
const sendBtn : HTMLButtonElement | null = document.querySelector("#send");

	console.log(myInput)

if (sendBtn) {
	sendBtn.disabled = true;
}

interface MessageObject {
	text: string;
	nic: string;
}

function msgGeneration(msg: MessageObject, from: string) {
	const newMessage = document.createElement("h5");
	newMessage.innerText = `${from} send: ${msg.text} from ${msg.nic}`;

	if (myMessages) {
		myMessages.appendChild(newMessage);
	}
}

function sendMsg() {
	let obj: MessageObject = {
		text: ``,
		nic: window.navigator.appName,
	}
	if (myInput) {
		obj = {
			text: myInput.value,
			nic: window.navigator.appName,
		};	
	}
	
	msgGeneration(obj, "Client")
	mywsServer.send(JSON.stringify(obj));

	console.log('obj to send _ ', `text: ${obj.text}`);
}

if (sendBtn) {
	sendBtn.addEventListener("click", sendMsg, false);
	mywsServer.onopen = function() {
		sendBtn.disabled = false;
	};
}

mywsServer.onmessage = function(event: MessageEvent) {
	const receivedObj = JSON.parse(event.data);
	msgGeneration(receivedObj, "Server");
	
	console.log('received data:', JSON.parse(event.data));
}