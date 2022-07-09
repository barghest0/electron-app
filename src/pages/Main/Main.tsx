import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { ipcRenderer } from 'electron';

import TextField from 'components/TextField/TextField';
import Button from 'components/Button/Button';
import DownloadedFile from 'components/DownloadedFile/DownloadedFile';
import { Download } from 'components/DownloadedFile/types';
import { urlValidationSchema } from 'shared/form-validators/url-validations';

import * as S from './Main.style';

type UrlValues = {
  url: string;
};

const Main = () => {
  const [downloads, setDownloads] = useState<Download[]>([]);

  const initialUrlValues = {
    url: '',
  };

  const onUrlFormSubmit = ({ url }: UrlValues) => {
    ipcRenderer.send('download', {
      url,
    });
  };

  const { handleChange, values, handleSubmit, errors, touched } = useFormik({
    initialValues: initialUrlValues,
    onSubmit: onUrlFormSubmit,
    validationSchema: urlValidationSchema,
  });

  useEffect(() => {
    ipcRenderer.send('request-downloads');
    ipcRenderer.on('downloads-recieved', (_, { downloads }) => {
      setDownloads(downloads);
    });
    ipcRenderer.on('download-complete', (_, { file }) => {
      const newDownloadedFile = {
        path: file.path,
        name: file.fileName,
      };
      setDownloads((prevState) => [newDownloadedFile, ...prevState]);
    });
  }, []);

  console.log(downloads);

  const downloadedFiles = downloads.map((download) => (
    <S.DownloadedFile key={download.name}>
      <DownloadedFile download={download} />
    </S.DownloadedFile>
  ));

  return (
    <S.Main>
      <S.Container>
        <S.Content>
          <S.Title>Download everything!</S.Title>
          <S.Form onSubmit={handleSubmit}>
            <S.FormField>
              <TextField
                name="url"
                onChange={handleChange}
                variant="filled"
                label="URL"
                error={errors.url}
                touched={touched.url}
                value={values.url}
              />
            </S.FormField>
            <S.FormSubmit>
              <Button type="submit">Download</Button>
            </S.FormSubmit>
          </S.Form>
          <S.Downloads>
            <S.DownloadsTitle>Last downloads</S.DownloadsTitle>
            <S.DownloadedFiles>{downloadedFiles}</S.DownloadedFiles>
          </S.Downloads>
        </S.Content>
      </S.Container>
    </S.Main>
  );
};

export default Main;
