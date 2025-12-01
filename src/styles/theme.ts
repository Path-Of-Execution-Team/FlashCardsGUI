import { createTheme } from '@mui/material/styles';

const CONSTANTS = {
  BUTTON_AND_TEXTFIELD_HEIGHT_MULTIPLIER: 7,
};

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          height: theme.spacing(CONSTANTS.BUTTON_AND_TEXTFIELD_HEIGHT_MULTIPLIER),
        }),
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        fullWidth: true,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          height: theme.spacing(CONSTANTS.BUTTON_AND_TEXTFIELD_HEIGHT_MULTIPLIER),
        }),
      },
    },
  },
});

export default theme;
