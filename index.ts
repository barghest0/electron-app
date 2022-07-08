const { app, BrowserWindow, ipcMain, dialog } = require('electron');

const path = require('path');
const { download } = require('electron-dl');

require('electron-reload')(__dirname);

const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Electron',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // window.loadFile(path.resolve(__dirname, 'public/index.html'));

  window.loadURL('http://localhost:8080');
  ipcMain.on('download', async (event, { url }) => {
    dialog.showOpenDialog({
      defaultPath: '',
    });

    const window = BrowserWindow.getFocusedWindow();
    const file = await download(window, url);
  });
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
