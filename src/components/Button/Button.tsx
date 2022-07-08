import { FC } from 'react';
import * as S from './Button.style';

type Props = {
  type?: 'button' | 'reset' | 'submit';
  children: React.ReactNode;
};

const Button: FC<Props> = ({ type, children }) => {
  return <S.Button type={type}>{children}</S.Button>;
};

Button.defaultProps = {
  type: 'button',
};

export default Button;
