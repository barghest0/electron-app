import { useFormik } from 'formik';
import { ipcRenderer } from 'electron';

import TextField from 'components/TextField/TextField';
import Button from 'components/Button/Button';

import * as S from './Main.style';
import { urlValidationSchema } from 'shared/form-validators/url-validations';

type UrlValues = {
  url: string;
};

const Main = () => {
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
        </S.Content>
      </S.Container>
    </S.Main>
  );
};

export default Main;
