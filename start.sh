#!/bin/bash
# Starts the entire app in production mode (for running in kiosk mode via electron on raspberry pi)

# Load production env variables
export $(grep -v '^#' ./.env.production | xargs)

echo "Installing dependencies..."
npm install
echp "Dependencies installed successfully."

# Build Vite
echo "Starting Vite app for production..."
npm run build 
echo "Build complete. Starting Node Server..."


# Start socket server
npm run start:socket-prod &
socket_pid=$!
# Wait for Socket to be accessible
echo "Waiting for Socket to be ready..."
while true; do
  echo -n -e '\x00' | nc -w 1 $HOSTNAME $VITE_SOCKET_PORT > /dev/null 2>&1
  if [ $? -eq 0 ]; then
    echo "Port is open. Continuing..."
    break
  else
    echo "Port is closed. Checking again in 1 second."
  fi
  sleep 1
done 

echo "Socket is open! Starting Node server"

npm run start:node-prod &
node_pid=$!
echo "Waiting for Node server to be ready..."
while true; do
  echo -n -e '\x00' | nc -w 1 $HOSTNAME $VITE_NODE_SERVER_PORT > /dev/null 2>&1
  if [ $? -eq 0 ]; then
    echo "Port is open. Continuing..."
    break
  else
    echo "Port is closed. Checking again in 1 second."
  fi
  sleep 1
done 


echo "Starting Electron..."
# Start Electron
npm run start:electron

# Stop Vite server when Electron exits
kill $vite_pid
kill $socket_pid
kill $node_pod
