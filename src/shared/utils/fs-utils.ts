import fs from 'fs';
import path from 'path';

import { MAX_DOWNLOADS } from 'electron-entry/constants';

const getFileTimestamp = (path: string) => fs.statSync(path).mtime.getTime();

const getFilename = (absolutePath: string) => {
  const parsedPath = path.parse(absolutePath);

  return parsedPath.base;
};

const getFileDirectory = (absolutePath: string) => {
  const parsedPath = path.parse(absolutePath);

  return parsedPath.dir;
};

const getDirectoryFiles = (path: string) => {
  return fs.readdirSync(path).slice(0, MAX_DOWNLOADS);
};

export { getFileTimestamp, getFilename, getFileDirectory, getDirectoryFiles };
