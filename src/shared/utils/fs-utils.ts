import fs from 'fs';
import path from 'path';

import { MAX_DOWNLOADS } from 'electron-entry/constants';

const getFileTimestamp = (path: string) => fs.statSync(path).mtime.getTime();

const getFilePlacement = (absolutePath: string) => {
  const parsedPath = path.parse(absolutePath);
  const directory = parsedPath.dir;
  const filename = parsedPath.base;

  return { filename, directory };
};

const getDirectoryFiles = (path: string) => {
  return fs.readdirSync(path).slice(0, MAX_DOWNLOADS);
};

export { getFileTimestamp, getFilePlacement, getDirectoryFiles };
