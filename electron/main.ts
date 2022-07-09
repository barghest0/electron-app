import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron';
import path from 'path';
import { download } from 'electron-dl';
import fs from 'fs';

import { getFileTimestamp } from 'shared/utils/fs-utils';
import { ipcActions } from 'shared/constants/electron';

import { MAX_DOWNLOADS } from './constants';

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

  // window.setMenu(null);
  // window.loadFile(path.resolve(__dirname, 'dist/index.html'));
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
  const name = url.split('/').pop();
  const userPath = dialog.showSaveDialogSync({
    defaultPath: `${downloadsPath}/${name}`,
  });

  if (userPath) {
    const filePath = userPath.split('\\');
    const filename = `${filePath.pop()}`;
    const directory = filePath.join('/');
    const properties = { directory, filename };

    const window = BrowserWindow.getFocusedWindow() as BrowserWindow;
    await download(window, url, {
      ...properties,
      onCompleted: (file) => {
        BrowserWindow.getFocusedWindow()?.webContents.send(
          ipcActions.downloadComplete,
          { file },
        );
      },
    });
  }
});

ipcMain.on(ipcActions.requestDownloads, () => {
  const files = fs.readdirSync(downloadsPath).slice(0, MAX_DOWNLOADS);
  files.sort((current, next) => {
    return (
      getFileTimestamp(`${downloadsPath}/${next}`) -
      getFileTimestamp(`${downloadsPath}/${current}`)
    );
  });

  const downloads = files.map((name) => ({
    path: `${downloadsPath}\\${name}`,
    name,
  }));

  BrowserWindow.getFocusedWindow()?.webContents.send(
    ipcActions.downloadsRecieved,
    {
      downloads,
    },
  );
});

ipcMain.on(ipcActions.openFile, (_, { path }) => {
  shell.showItemInFolder(path);
});
