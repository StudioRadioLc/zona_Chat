
const socket = io();
let username = '';
let room = '';

const login = document.getElementById('login');
const chatContainer = document.getElementById('chat-container');
const joinBtn = document.getElementById('join');
const input = document.getElementById('input');
const form = document.getElementById('form');
const messages = document.getElementById('messages');
const typingDiv = document.getElementById('typing');

joinBtn.addEventListener('click', () => {
  username = document.getElementById('username').value.trim();
  room = document.getElementById('room').value;

  if (username) {
    login.classList.add('hidden');
    chatContainer.classList.remove('hidden');
    socket.emit('join-room', { username, room });
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('send-message', input.value);
    input.value = '';
  }
});

input.addEventListener('input', () => {
  socket.emit('typing');
});

socket.on('chat-message', (msg) => {
  const item = document.createElement('div');
  item.textContent = msg;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
  typingDiv.textContent = '';
});

socket.on('typing', (user) => {
  typingDiv.textContent = `${user} está escribiendo...`;
  setTimeout(() => {
    typingDiv.textContent = '';
  }, 2000);
});
