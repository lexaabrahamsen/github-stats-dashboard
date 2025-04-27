import { Box, Button, Card, Grid, TextField, Typography } from '@mui/material';
import github480White from '../assets/github-480-white.svg';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

interface UsernameSearchCardProps {
  handleSearch: (e: React.FormEvent) => void;
  searchInput: string;
  isSearching?: boolean;
  setSearchInput: (value: string) => void;
}

export const UsernameSearchCard = ({
  handleSearch,
  searchInput,
  setSearchInput,
}: UsernameSearchCardProps) => {
  return (
    <Grid container justifyContent="center" sx={{ m: '20px' }}>
      <Card
        sx={{
          padding: '30px',
          backgroundColor: '#111C44',
          borderRadius: '20px',
        }}
      >
        <Grid container direction="column" alignItems="center">
          <Box
            component="img"
            src={github480White}
            alt="GitHub Background"
            sx={{
              height: 140,
              width: 140,
              color: '#ffffff',
              fill: 'currentColor',
              borderRadius: '50%',
              mb: 3,
            }}
          />
          <Grid item>
            <Typography
              variant="overline"
              align="center"
              sx={{ color: '#ffffff', fontWeight: 500, letterSpacing: '1px' }}
            >
              Profile Insights
            </Typography>
          </Grid>
          <Grid item mb={3}>
            <Typography
              variant="h5"
              gutterBottom
              align="center"
              sx={{ color: 'white', fontWeight: 500 }}
            >
              Enter GitHub Username
            </Typography>
          </Grid>
          <form onSubmit={handleSearch}>
            <Grid item>
              <TextField
                label="GitHub Username"
                variant="outlined"
                fullWidth
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                InputProps={{
                  sx: {
                    backgroundColor: '#0B1437 !important',
                    color: 'white',
                    borderRadius: '8px',
                    '& input': {
                      color: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: '#646cff',
                    },
                    '& fieldset': {
                      borderColor: '#444A66',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#7551FF',
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&.Mui-focused': {
                      color: '#ffffff',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item sx={{ mt: 3 }}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<ArrowForwardOutlinedIcon />}
                sx={{
                  backgroundColor: '#7551FF',
                  minWidth: '400px',
                  borderRadius: '8px',
                  height: '54px',
                }}
              >
                Search
              </Button>
            </Grid>
          </form>
        </Grid>
      </Card>
    </Grid>
  );
};
