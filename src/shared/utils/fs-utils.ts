import fs from 'fs';

const getFileTimestamp = (path: string) => fs.statSync(path).mtime.getTime();

export { getFileTimestamp };
