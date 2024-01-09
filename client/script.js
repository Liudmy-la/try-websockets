const url = "ws://localhost:9876/myWebsocket"
const mywsServer = new WebSocket(url)

const myMessages = document.getElementById("messages")
const myInput = document.getElementById("message")
const sendBtn = document.getElementById("send")

sendBtn.disabled = true
sendBtn.addEventListener("click", sendMsg, false)

function sendMsg() {
	const obj = {text: myInput.value} 
	msgGeneration(obj, "Client")
	mywsServer.send(JSON.stringify(obj))
}

function msgGeneration(msg, from) {
	const newMessage = document.createElement("h5")
	newMessage.innerText = `${from} says: ${msg.text}`
	myMessages.appendChild(newMessage)
}

mywsServer.onopen = function() {
	sendBtn.disabled = false
}

mywsServer.onmessage = function(event) {
	const receivedObj = JSON.parse(event.data);
	msgGeneration(receivedObj, "Server")
}