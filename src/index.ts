const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const { download } = require('electron-dl');
const fs = require('fs');

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

  // window.loadFile(path.resolve(__dirname, 'dist/index.html'));
  window.loadURL('http://localhost:8080');
  // window.setMenu(null);
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

const downloadsPath = app.getPath('downloads');

ipcMain.on('download', async (_, { url }) => {
  const name = url.split('/').pop();
  const userPath = dialog.showSaveDialogSync({
    defaultPath: `${downloadsPath}/${name}`,
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

ipcMain.on('request-downloads', () => {
  const files = fs.readdirSync(downloadsPath).slice(0, 10);
  files.sort((a, b) => {
    return (
      fs.statSync(`${downloadsPath}/${b}`).mtime.getTime() -
      fs.statSync(`${downloadsPath}/${a}`).mtime.getTime()
    );
  });

  const downloads = files.map((name) => ({
    path: `${downloadsPath}\\${name}`,
    name,
  }));

  BrowserWindow.getFocusedWindow()?.webContents.send('downloads-recieved', {
    downloads,
  });
});

ipcMain.on('open-file', (_, { path }) => {
  shell.showItemInFolder(path);
});
