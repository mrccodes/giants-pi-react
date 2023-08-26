// const path = require('path');

import { app, BrowserWindow } from 'electron';

let win;

app.commandLine.appendSwitch('auto-hide-cursor');
function createWindow() {
  win = new BrowserWindow({
    frame: false, 
    kiosk: true,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  win.loadURL('http://localhost:3000'); // Your Vite server URL
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
