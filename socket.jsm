const express = require('express');
const { exec } = require('child_process');
const http = require('http');

const HOST = 'http://localhost';
const SOCKET_PORT = 4444;
const VITE_PORT = 3000;

const app = express();
const server = http.Server(app);

const io = require('socket.io')(server, {
  cors: {
    origin: `${HOST}:${VITE_PORT}`,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  setInterval(() => {
    exec('vcgencmd measure_temp', (error, stdout) => {
      if (error) {
        console.log(error);
        return;
      }
      const temp = stdout.match(/\d+\.\d+/)[0];
      socket.emit('newTemp', temp);
    });
  }, 1000);
});

server.listen(SOCKET_PORT, () => {
  console.log(`Server running on ${HOST}:${SOCKET_PORT}`);
});
