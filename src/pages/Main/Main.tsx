import { useEffect, useState } from 'react';
import { FormikHelpers, useFormik } from 'formik';
import { ipcRenderer } from 'electron';

import TextField from 'components/TextField/TextField';
import Button from 'components/Button/Button';
import DownloadedFile from 'components/DownloadedFile/DownloadedFile';
import { Download } from 'components/DownloadedFile/types';
import { urlValidationSchema } from 'shared/form-validators/url-validations';
import { ipcActions } from 'shared/constants/electron';

import * as S from './Main.style';

type UrlValues = {
  url: string;
};

const Main = () => {
  const [downloads, setDownloads] = useState<Download[]>([]);

  const initialUrlValues = {
    url: '',
  };

  const onUrlFormSubmit = (
    { url }: UrlValues,
    helpers: FormikHelpers<UrlValues>,
  ) => {
    ipcRenderer.send(ipcActions.download, {
      url,
    });

    helpers.resetForm();
  };

  const { handleChange, values, handleSubmit, errors, touched } = useFormik({
    initialValues: initialUrlValues,
    onSubmit: onUrlFormSubmit,
    validationSchema: urlValidationSchema,
  });

  useEffect(() => {
    ipcRenderer.send(ipcActions.requestDownloads);
    ipcRenderer.on(ipcActions.downloadsRecieved, (_, { downloads }) => {
      setDownloads(downloads);
    });
    ipcRenderer.on(ipcActions.downloadComplete, (_, { file }) => {
      const newDownloadedFile = {
        path: file.path,
        name: file.fileName,
      };
      setDownloads((prevState) => [newDownloadedFile, ...prevState]);
    });
  }, []);

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
          <S.TestLinks>
            <S.TestLinksTitle>Test Links</S.TestLinksTitle>
            <S.TestLink>
              https://demotivation.ru/wp-content/uploads/2020/05/371625-svetik_2880x1800-2048x1280.jpg
            </S.TestLink>
            <S.TestLink>
              https://i.pinimg.com/originals/b5/10/1c/b5101ca3aced1afa053d71572a5bd8ce.jpg
            </S.TestLink>
            <S.TestLink>
              https://i.pinimg.com/originals/3e/2b/b0/3e2bb0e5ca44f5c65c2432aae9d94ab1.jpg
            </S.TestLink>
          </S.TestLinks>
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
