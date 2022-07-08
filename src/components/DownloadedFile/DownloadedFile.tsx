import { FC } from 'react';
import * as S from './DownloadedFile.style';

type Props = {
  path: string;
};

const DownloadedFile: FC<Props> = ({ path }) => {
  const onDownloadedFileClick = () => {
    console.log(path);
  };
  return (
    <S.DownloadedFile onClick={onDownloadedFileClick}>{path}</S.DownloadedFile>
  );
};

export default DownloadedFile;
