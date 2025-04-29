import { Box, CircularProgress, Grid, Typography } from '@mui/material';

export const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Grid container direction="column" alignItems="center">
        <CircularProgress size={40} sx={{ mb: 4, color: '#5e3bdb' }} />
        <Typography variant="h5" sx={{ color: 'white' }}>
          Loading GitHub Profile...
        </Typography>
      </Grid>
    </Box>
  );
};
