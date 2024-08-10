const socket = io();

const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const message = messageInput.value;
    if (message.trim()) {
        addMessageToChat(message, 'sent');
        socket.emit('chat message', message);
        messageInput.value = '';
        
        // Automatically respond after a delay
        setTimeout(() => {
            const botResponse = generateBotResponse(message);
            addMessageToChat(botResponse, 'received');
            socket.emit('chat message', botResponse);
        }, 1000);
    }
}

socket.on('chat message', (msg) => {
    addMessageToChat(msg, 'received');
});

function addMessageToChat(msg, type) {
    const messageElement = document.createElement('div');
    messageElement.textContent = msg;
    messageElement.classList.add('message', type);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function generateBotResponse(userMessage) {
    const responses = [
        "That's interesting!",
        "Tell me more.",
        "Why do you think that?",
        "Can you explain further?",
        "I see! What else?",
        "I'm here to chat!",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}
