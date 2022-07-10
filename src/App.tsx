import { ThemeProvider } from '@mui/material';
import Main from 'pages/Main/Main';

import MUItheme from 'shared/mui/mui-theme';

import * as S from './App.style';
import GlobalStyle from './shared/styles/GlobalStyle.style';

const App = () => {
  return (
    <ThemeProvider theme={MUItheme}>
      <S.App>
        <GlobalStyle />
        <Main />
      </S.App>
    </ThemeProvider>
  );
};

export default App;
