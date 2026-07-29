import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-mui-color-scheme',
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#17251C',
          contrastText: '#FFFDF7',
        },
        secondary: {
          main: '#C8F169',
          contrastText: '#17251C',
        },
        background: {
          default: '#F3F0E7',
          paper: '#FFFDF8',
        },
        text: {
          primary: '#17251C',
          secondary: '#5D685F',
        },
        divider: '#D9DDD3',
        error: {
          main: '#BA3B3B',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#C8F169',
          contrastText: '#142019',
        },
        secondary: {
          main: '#BCEB63',
          contrastText: '#142019',
        },
        background: {
          default: '#101512',
          paper: '#171E19',
        },
        text: {
          primary: '#F1F5ED',
          secondary: '#AAB5AB',
        },
        divider: '#344038',
        error: {
          main: '#FF8A8A',
        },
      },
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: 'var(--font-roboto), "Segoe UI", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.055em',
      lineHeight: 0.98,
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.045em',
      lineHeight: 1.02,
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.035em',
      lineHeight: 1.08,
    },
    button: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: '100vh',
          backgroundColor: 'var(--mui-palette-background-default)',
          color: 'var(--mui-palette-text-primary)',
        },
        '*::selection': {
          backgroundColor: 'var(--mui-palette-secondary-main)',
          color: 'var(--mui-palette-secondary-contrastText)',
        },
      },
    },
    MuiFormControl: {
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          minHeight: 48,
          paddingInline: 22,
          borderRadius: 12,
          transition: 'transform 180ms ease, background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
          '&:focus-visible': {
            outline: '3px solid rgba(200, 241, 105, 0.7)',
            outlineOffset: 3,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          minHeight: 54,
          borderRadius: 12,
          backgroundColor: 'var(--fc-input-background)',
          transition: 'background-color 160ms ease, box-shadow 160ms ease',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--fc-input-border)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--fc-input-border-hover)',
          },
          '&.Mui-focused': {
            backgroundColor: 'var(--mui-palette-background-paper)',
            boxShadow: '0 0 0 4px rgba(200, 241, 105, 0.22)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--mui-palette-primary-main)',
            borderWidth: 1,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'var(--mui-palette-text-secondary)',
          '&.Mui-focused': {
            color: 'var(--mui-palette-primary-main)',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: 'var(--fc-control-muted)',
          '&.Mui-checked': {
            color: 'var(--mui-palette-primary-main)',
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          marginTop: 8,
          border: '1px solid var(--mui-palette-divider)',
          borderRadius: 14,
          boxShadow: 'var(--fc-menu-shadow)',
        },
      },
    },
  },
});

export default theme;
