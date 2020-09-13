const socket = io("http://localhost:3000/");
const messageForm = document.getElementById("send-container");
const messageContainer = document.getElementById("message-container");
const messageInput = document.getElementById("message-input")

const name = prompt("Qual é seu nickname: ");
appendMessages("Bem vindo");
socket.emit("new-user", name);

socket.on("chat-message", (data) => {
  appendMessages(`${data.name}: ${data.message}`);
});

socket.on("user-connected", (name) => {
  appendMessages(`${name} conectou-se`);
});

socket.on("user-disconnected", (name) => {
    appendMessages(`${name} desconectou-se`);
  });

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});

function appendMessages(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
