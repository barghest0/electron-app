import { ipcRenderer } from 'electron';
import { FC } from 'react';
import * as S from './DownloadedFile.style';

type Props = {
  name: string;
};

const DownloadedFile: FC<Props> = ({ name }) => {
  const onDownloadedFileClick = () => {
    ipcRenderer.send('open-file', { name });
  };

  return (
    <S.DownloadedFile onClick={onDownloadedFileClick}>{name}</S.DownloadedFile>
  );
};

export default DownloadedFile;
