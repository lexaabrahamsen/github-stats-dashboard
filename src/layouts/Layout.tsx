import { Grid } from '@mui/material';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid
      container
      justifyContent="center"
      sx={{
        backgroundColor: '#0B1437',
        minHeight: '100vh',
        width: '100vw',
      }}
    >
      {children}
    </Grid>
  );
};
