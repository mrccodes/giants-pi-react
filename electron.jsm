const { app, BrowserWindow } = require('electron');
// Set preferred team id here to bypass team select screen
// @TODO consolidate all this stuff to .env file
const PREFERRED_TEAM_ID = 137;

const HOST = 'http://localhost';
const VITE_PORT = 3000;
const param = PREFERRED_TEAM_ID ? `?teamId=${PREFERRED_TEAM_ID}` : '';

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

  win.loadURL(`${HOST}:${VITE_PORT}${param}`);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
