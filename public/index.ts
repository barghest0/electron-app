const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');

const createWindow = () => {
  const window = new BrowserWindow({
    width: 900,
    height: 680,
    title: 'Electron',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  window.loadURL('http://localhost:8080');
  window.loadFile('index.ts');
  window.webContents.openDevTools();
};

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
