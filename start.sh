#!/bin/bash

# Start Vite server
npm run start:vite &
vite_pid=$!

# Wait for Vite to be accessible
echo "Waiting for Vite to be ready..."
while ! curl -s http://localhost:3000/ > /dev/null; do
  sleep 1
done

echo "Vite is ready! Starting socket server..."
# Wait for Vite to be accessible
echo "Waiting for Node to be ready..."
while ! curl -s http://localhost:4444/ > /dev/null; do
  sleep 1
done

echo "Node server is ready! Starting Electron..."

# Start Electron
npm run start:electron

# Stop Vite server when Electron exits
kill $vite_pid
