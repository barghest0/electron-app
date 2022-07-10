import { ipcRenderer } from 'electron';
import { FC } from 'react';

import { ipcActions } from 'shared/constants/electron';

import * as S from './DownloadedFile.style';
import { Download } from './types';

type Props = {
  download: Download;
};

const DownloadedFile: FC<Props> = ({ download }) => {
  const { path, name } = download;

  const onDownloadedFileClick = () => {
    ipcRenderer.send(ipcActions.openFile, { path });
  };

  return (
    <S.DownloadedFile onClick={onDownloadedFileClick}>{name}</S.DownloadedFile>
  );
};

export default DownloadedFile;
