const { app, BrowserWindow } = require('electron');

const HOST = 'http://localhost';
const VITE_PORT = 3000;

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

  win.loadURL(`${HOST}:${VITE_PORT}`);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
