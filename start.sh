#!/bin/bash

# Load production env variables
export $(grep -v '^#' ./environment/.env.production | xargs)

# Starts the entire app in production mode (for running in kiosk mode via electron on raspberry pi)

# Start Node server
npm run start:socket &
socket_pid=$!
# Wait for Socket to be accessible
echo "Waiting for Socket to be ready..."
while true; do
  echo -n -e '\x00' | nc -w 1 localhost $VITE_SOCKET_PORT > /dev/null 2>&1
  if [ $? -eq 0 ]; then
    echo "Port is open. Continuing..."
    break
  else
    echo "Port is closed. Checking again in 1 second."
  fi
  sleep 1
done 

echo "Socket is open! Building Vite app"
# Build Vite
npm run build 
echo "Build complete. Starting Electron..."





# Start Electron
npm run start:electron

# Stop Vite server when Electron exits
kill $vite_pid
kill $socket_pid
