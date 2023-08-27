const express = require('express');
const { exec } = require('child_process');
const http = require('http');

const SOCKET_PORT = 4444;

const SOCKET_URI = `http://localhost:${SOCKET_PORT}`;

const app = express();
const server = http.Server(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});




// const io = socketIo(server);

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
  console.log(`Server running on ${SOCKET_URI}`);
});
