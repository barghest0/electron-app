const { app, BrowserWindow, ipcMain, dialog } = require('electron');

const path = require('path');
const { download } = require('electron-dl');

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
  window.setMenu(null);
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

ipcMain.on('download', async (event, { url }) => {
  const path = app.getPath('downloads');
  
  const name = url.split('/').pop();
  const userPath = dialog.showSaveDialogSync({
    defaultPath: `${path}/${name}`,
  });

  if (userPath) {
    const filePath = userPath.split('\\');
    const filename = `${filePath.pop()}`;
    const directory = filePath.join('/');
    const properties = { directory, filename };

    const window = BrowserWindow.getFocusedWindow();
    await download(window, url, { ...properties });
  }
});
