"use strict";
var url = "ws://localhost:9876/myWebsocket";
var mywsServer = new WebSocket(url);
var myMessages = document.getElementById("messages");
var myInput = document.getElementById("message");
var sendBtn = document.getElementById("send");
sendBtn.disabled = true;
function msgGeneration(msg, from) {
    var newMessage = document.createElement("h5");
    newMessage.innerText = "".concat(from, " send: ").concat(msg.text, " from ").concat(msg.nic);
    myMessages.appendChild(newMessage);
}
function sendMsg() {
    var obj = {
        text: myInput.value,
        nic: window.navigator.appName,
    };
    msgGeneration(obj, "Client");
    mywsServer.send(JSON.stringify(obj));
    console.log('obj to send: ', JSON.stringify(obj));
}
sendBtn.addEventListener("click", sendMsg, false);
mywsServer.onopen = function () {
    sendBtn.disabled = false;
};
mywsServer.onmessage = function (event) {
    var receivedObj = JSON.parse(event.data);
    msgGeneration(receivedObj, "Server");
    console.log('received data:', JSON.parse(event.data));
};
