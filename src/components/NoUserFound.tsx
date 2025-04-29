import { Box, Typography } from '@mui/material';
import SentimentVeryDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';

export const NoUserFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <SentimentVeryDissatisfiedOutlinedIcon
        sx={{ fontSize: 80, color: 'white', mb: 4 }}
      />
      <Typography variant="h6" sx={{ color: 'white' }}>
        Couldn't load profile. Please try again.
      </Typography>
    </Box>
  );
};
