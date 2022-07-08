import { createGlobalStyle } from 'styled-components';

import theme from './theme';

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    ::placeholder{
      font-family: Poppins;
    }
  }
  body {
    font-family: Poppins;
    background-color: ${theme.main};
    color: ${theme.white};
    overflow-x: hidden;
    font-size: 14px;
  }
    
`;

export default GlobalStyle;
