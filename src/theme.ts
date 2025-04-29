import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      dark: "#5e3bdb",
      main: '#7551FF', 
    },
  },
  typography: {
    fontFamily: `'Jost', 'Futura', 'Trebuchet MS', system-ui, sans-serif`,
    overline: {
      fontSize: '0.7rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: '#666666',
    },
  },
});
