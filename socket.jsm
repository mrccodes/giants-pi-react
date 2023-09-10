const express = require('express');
const { exec } = require('child_process');
const http = require('http');
const dotenv = require('dotenv');

const isProduction = process.env.NODE_ENV === 'production';

const envPath = `.env.${isProduction ? 'production' : 'development'}`;
dotenv.config({ path: envPath });

const HOST = process.env.VITE_HOST;
const SOCKET_PORT = process.env.VITE_SOCKET_PORT;
const VITE_PORT = process.env.VITE_PORT;

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
