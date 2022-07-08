import theme from 'shared/styles/theme';
import styled from 'styled-components';

const DownloadedFile = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s linear;
  padding: 0 10px;

  :hover {
    background-color: rgba(69, 154, 132, 0.3);
  }
`;

export { DownloadedFile };
