import styled from 'styled-components';

import { container } from 'shared/styles/mixins';

const Main = styled.div``;

const Container = styled.div`
  ${container}
`;

const Title = styled.h1`
  margin-bottom: 20px;
  text-align: center;
`;

const Content = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormField = styled.div`
  margin-bottom: 30px;
  width: 100%;
`;

const FormSubmit = styled.div`
  width: 20%;
  min-width: 80px;
  height: 40px;
  margin-bottom: 50px;
`;

const Downloads = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const DownloadedFile = styled.div`
  height: 50px;
`;

const DownloadsTitle = styled.div`
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 20px;
`;

export {
  Main,
  Container,
  Form,
  FormField,
  FormSubmit,
  Content,
  Title,
  Downloads,
  DownloadedFile,
  DownloadsTitle,
};
