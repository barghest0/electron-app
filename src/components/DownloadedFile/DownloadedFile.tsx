import { ipcRenderer } from 'electron';
import { FC } from 'react';
import * as S from './DownloadedFile.style';

type Download = {
  path: string;
  name: string;
};

type Props = {
  download: Download;
};

const DownloadedFile: FC<Props> = ({ download }) => {
  const { path, name } = download;

  const onDownloadedFileClick = () => {
    ipcRenderer.send('open-file', { path });
  };

  return (
    <S.DownloadedFile onClick={onDownloadedFileClick}>{name}</S.DownloadedFile>
  );
};

export default DownloadedFile;
