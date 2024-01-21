"use strict";
var url = "ws://localhost:9876/myWebsocket";
var mywsServer = new WebSocket(url);
var myMessages = document.querySelector("#messages");
var myInput = document.querySelector("#message");
var sendBtn = document.querySelector("#send");
console.log(myInput);
if (sendBtn) {
    sendBtn.disabled = true;
}
function msgGeneration(msg, from) {
    var newMessage = document.createElement("h5");
    newMessage.innerText = "".concat(from, " send: ").concat(msg.text, " from ").concat(msg.nic);
    if (myMessages) {
        myMessages.appendChild(newMessage);
    }
}
function sendMsg() {
    var obj = {
        text: "",
        nic: window.navigator.appName,
    };
    if (myInput) {
        obj = {
            text: myInput.value,
            nic: window.navigator.appName,
        };
    }
    msgGeneration(obj, "Client");
    mywsServer.send(JSON.stringify(obj));
    console.log('obj to send _ ', "text: ".concat(obj.text));
}
if (sendBtn) {
    sendBtn.addEventListener("click", sendMsg, false);
    mywsServer.onopen = function () {
        sendBtn.disabled = false;
    };
}
mywsServer.onmessage = function (event) {
    var receivedObj = JSON.parse(event.data);
    msgGeneration(receivedObj, "Server");
    console.log('received data:', JSON.parse(event.data));
};
