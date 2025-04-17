
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.216.24.60.0/24 || 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('🟢 Usuario conectado');

  socket.on('join-room', ({ username, room }) => {
    socket.username = username;
    socket.room = room;
    socket.join(room);
    socket.to(room).emit('chat-message', formatMessage('🟢', `${username} se ha unido a la sala.`));
  });

  socket.on('send-message', (message) => {
    const msg = formatMessage(socket.username, message);
    io.to(socket.room).emit('chat-message', msg);
  });

  socket.on('typing', () => {
    socket.to(socket.room).emit('typing', socket.username);
  });

  socket.on('disconnect', () => {
    if (socket.username && socket.room) {
      socket.to(socket.room).emit('chat-message', formatMessage('🔴', `${socket.username} ha salido.`));
    }
  });
});

function formatMessage(user, text) {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return `[${time}] ${user}: ${text}`;
}

http.listen(PORT, () => {
  console.log(`✅ Servidor activo en http://localhost:${216.24.60.0/24}`);
});
