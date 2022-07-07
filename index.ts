const { app, BrowserWindow } = require('electron');

const path = require('path');

const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Electron',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  window.loadFile(path.resolve(__dirname, 'dist/index.html'));
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
