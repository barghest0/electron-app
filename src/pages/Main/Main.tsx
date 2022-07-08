import { useFormik } from 'formik';

import TextField from 'components/TextField/TextField';
import Button from 'components/Button/Button';

import * as S from './Main.style';

type UrlValues = {
  url: string;
};

const Main = () => {
  const initialUrlValues = {
    url: '',
  };

  const onUrlFormSubmit = ({ url }: UrlValues) => {
    console.log(url);
  };

  const { handleChange, values, handleSubmit } = useFormik({
    initialValues: initialUrlValues,
    onSubmit: onUrlFormSubmit,
  });
  return (
    <S.Main>
      <S.Container>
        <S.Form onSubmit={handleSubmit}>
          <TextField name="url" onChange={handleChange} value={values.url} />
          <Button>Download</Button>
        </S.Form>
      </S.Container>
    </S.Main>
  );
};

export default Main;
