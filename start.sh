#!/bin/bash
# Start Node server
npm run start:socket &
socket_pid=$!
# Wait for Node to be accessible
echo "Waiting for Node to be ready..."
while true; do
  echo -n -e '\x00' | nc -w 1 localhost 4444 > /dev/null 2>&1
  if [ $? -eq 0 ]; then
    echo "Port is open. Continuing..."
    break
  else
    echo "Port is closed. Checking again in 1 second."
  fi
  sleep 1
done 

echo "Node is ready! Starting Vite server..."
# Start Vite server
VITE_PI=true npm run start:vite &
vite_pid=$!

# Wait for Vite to be accessible
echo "Waiting for Vite to be ready..."
while ! curl -s http://localhost:3000/ > /dev/null; do
  sleep 1
done




echo "Node server is ready! Starting Electron..."

# Start Electron
npm run start:electron

# Stop Vite server when Electron exits
kill $vite_pid
kill $socket_pid
