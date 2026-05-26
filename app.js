"use strict";

// Add a message to the chat window
function addMessage(text, sender) {
    const chat = document.getElementById("chat-log");
    const bubble = document.createElement("div");
    bubble.className = sender === "user" ? "user-message" : "bot-message";
    bubble.textContent = text;
    chat.appendChild(bubble);
    chat.scrollTop = chat.scrollHeight;
}

// Handle sending a message
async function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value.trim();
    if (!message) return;

    addMessage(message, "user");
    input.value = "";

    const typing = document.getElementById("typing-indicator");
    typing.style.display = "block";

    const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
    });

    const data = await response.json();
    typing.style.display = "none";
    addMessage(data.reply, "bot");
}

// Send message on button click
document.getElementById("send-btn")?.addEventListener("click", sendMessage);

// Send message on Enter key
document.getElementById("user-input")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
});
