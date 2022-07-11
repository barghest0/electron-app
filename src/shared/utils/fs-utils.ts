import fs from 'fs';

import { MAX_DOWNLOADS } from 'electron-entry/constants';

const getFileTimestamp = (path: string) => fs.statSync(path).mtime.getTime();

const getFilePlacement = (absolutePath: string) => {
  const path = absolutePath.split('\\');
  const filename = path.pop();
  const directory = path.join('/');

  return { filename, directory };
};

const getDirectoryFiles = (path: string) => {
  return fs.readdirSync(path).slice(0, MAX_DOWNLOADS);
};

export { getFileTimestamp, getFilePlacement, getDirectoryFiles };
