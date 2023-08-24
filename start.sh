#!/bin/bash

# Start Vite server
npm run start-vite &
vite_pid=$!

# Wait for Vite to be accessible
echo "Waiting for Vite to be ready..."
while ! curl -s http://localhost:3000/ > /dev/null; do
  sleep 1
done

echo "Vite is ready! Starting Electron..."

# Start Electron
npm run start-electron

# Stop Vite server when Electron exits
kill $vite_pid
