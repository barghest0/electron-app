import { createTheme } from '@mui/material/styles';

import theme from 'shared/styles/theme';

const MUItheme = createTheme({
  palette: {
    primary: {
      main: theme.second,
      dark: theme.black,
    },

    secondary: {
      main: theme.second,
    },

    text: {
      primary: theme.white,
    },
  },

  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          height: '100%',
          width: '100%',
        },
      },

      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            backgroundColor: theme.dark,
            borderRadius: 5,
          },
        },
        {
          props: { variant: 'standard' },
          style: {
            backgroundColor: 'transparent',
          },
        },
      ],
    },

    MuiFilledInput: {
      styleOverrides: {
        root: {
          '&:before': {
            borderBottom: `1px solid ${theme.border}`,
          },
        },
      },
    },

    MuiInput: {
      styleOverrides: {
        root: {
          color: theme.white,
          transition: 'all 0.2s linear',

          '&:hover': {
            '&::before': {
              borderBottom: `1px solid ${theme.white} !important`,
            },
          },
          '&::before': {
            color: theme.white,
            borderColor: theme.white,
          },
          '&::after': {
            borderBottom: `1px solid ${theme.second}`,
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: theme.white,
          height: '100%',
          backgroundColor: theme.dark,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.second,
          },
        },
        notchedOutline: {
          transition: 'all 0.2s linear',
          borderColor: theme.white,
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: theme.white,
        },
      },
    },
  },
});

export default MUItheme;
