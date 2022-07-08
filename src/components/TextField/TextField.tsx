import { FC, SyntheticEvent } from 'react';
import {TextField as MUITextField} from '@mui/material'

import * as S from './TextField.style';

type Props = {
  name: string;
  onChange: (event: SyntheticEvent) => void
  value: string | number;
  onBlur?: (event: SyntheticEvent) => void;
  label?: string;
  error?: string;
  variant?: 'standard' | 'outlined' | 'filled';
  touched?: boolean;
  placeholder?: string;
  type?: string;
};

const TextField: FC<Props> = ({
  name,
  onChange,
  value,
  onBlur,
  error,
  touched,
  placeholder,
  type,
  label,
  variant
}) => {
  return (
    <S.TextField>
      <MUITextField name={name} onChange={onChange} variant={variant} value={value} label={label} />
    </S.TextField>
  );
};

TextField.defaultProps = {
  error: '',
  touched: false,
  variant: 'standard',
  type: 'text',
  placeholder: '',
  label: '',
  onBlur: undefined,
};

export default TextField;
