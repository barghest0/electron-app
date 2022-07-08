import theme from 'shared/styles/theme';
import styled from 'styled-components';

const Button = styled.button`
  border: none;
  background-color: ${theme.second};
  color: ${theme.white};
  font-family: Poppins;
  padding: 5px;
  cursor: pointer;
  transition: all 0.2s linear;
  width: 100%;
  height: 100%;

  :hover {
    filter: brightness(1.2);
  }
`;

export { Button };
