const url = "ws://localhost:9876/myWebsocket"
const mywsServer = new WebSocket(url)

const myMessages = document.getElementById("messages")
const myInput = document.getElementById("message")
const sendBtn = document.getElementById("send")

sendBtn.disabled = true

function msgGeneration(msg, from) {
	const newMessage = document.createElement("h5")
	newMessage.innerText = `${from} send: ${msg.text} from ${msg.nic}`
	myMessages.appendChild(newMessage)
}

function sendMsg() {
	const obj = {
		text: myInput.value,
		nic: window.navigator.appName,
	} 
	msgGeneration(obj, "Client")
	mywsServer.send(JSON.stringify(obj))

	console.log('obj', obj, JSON.stringify(obj))
}

sendBtn.addEventListener("click", sendMsg, false)

mywsServer.onopen = function() {
	sendBtn.disabled = false
}

mywsServer.onmessage = function(event) {
	
	console.log('event data:', event.data)

	const receivedObj = JSON.parse(event.data);
	msgGeneration(receivedObj, "Server")

	console.log('receivedObj:', receivedObj)
}