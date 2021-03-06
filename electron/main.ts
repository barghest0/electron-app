import path from 'path';
import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron';
import { download } from 'electron-dl';

import {
  getDirectoryFiles,
  getFileDirectory,
  getFilename,
  getFileTimestamp,
} from 'shared/utils/fs-utils';
import { ipcActions } from 'shared/constants/electron';

let window: BrowserWindow;

const createWindow = () => {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Electron',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });

  window.loadURL('http://localhost:8080');
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

ipcMain.on(ipcActions.download, async (_, { url }) => {
  const defaultName = getFilename(url);

  const userPath = dialog.showSaveDialogSync({
    defaultPath: path.resolve(downloadsPath, defaultName),
  });

  if (userPath) {
    const filename = getFilename(userPath);
    const directory = getFileDirectory(userPath);

    await download(window, url, {
      directory,
      filename,
      onCompleted: (file) => {
        window.webContents.send(ipcActions.downloadComplete, { file });
      },
    });
  }
});

ipcMain.on(ipcActions.requestDownloads, () => {
  const files = getDirectoryFiles(downloadsPath);

  files.sort((current, next) => {
    return (
      getFileTimestamp(path.resolve(downloadsPath, next)) -
      getFileTimestamp(path.resolve(downloadsPath, current))
    );
  });

  const downloads = files.map((name) => ({
    path: path.resolve(downloadsPath, name),
    name,
  }));

  window.webContents.send(ipcActions.downloadsRecieved, {
    downloads,
  });
});

ipcMain.on(ipcActions.openFile, (_, { path }) => {
  shell.showItemInFolder(path);
});
