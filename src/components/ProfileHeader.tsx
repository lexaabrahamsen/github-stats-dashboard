import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

interface ProfileHeaderProps {
  avatarBackground: string;
  userDetails: {
    avatar_url: string;
    name: string;
    login: string;
    followers: number;
    following: number;
  };
  githubRepos: Array<{ name: string }>;
}

export const ProfileHeader = ({
  avatarBackground,
  userDetails,
  githubRepos,
}: ProfileHeaderProps) => {
  return (
    <Card
      sx={{
        backgroundColor: '#111C44',
        borderRadius: '20px',
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={avatarBackground}
        alt="Background"
      />
      <CardContent>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <img
              src={userDetails.avatar_url}
              alt="Avatar"
              style={{
                width: '100px',
                borderRadius: '50%',
                transform: 'translateY(-60%)',
                border: '2px solid #0B1437',
              }}
            />
          </Grid>
          <Grid item>
            <Typography
              variant="h3"
              gutterBottom
              sx={{ color: 'white', transform: 'translateY(-70%)' }}
            >
              {userDetails.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                mb: 2,
                transform: 'translateY(-70%)',
              }}
            >
              @{userDetails.login}
            </Typography>
          </Grid>
          {/* <Grid item> */}
          <Typography variant="h5" sx={{ color: 'white' }}>
            {userDetails.followers}
          </Typography>
          <br />
          <Typography variant="overline" sx={{ color: 'white' }}>
            Followers
          </Typography>
          {/* </Grid> */}
          <Box display="flex" alignItems="center">
            <Typography sx={{ color: 'white' }}>
              Following: {userDetails.following}
            </Typography>
            <Typography sx={{ color: 'white' }}>
              Repositories: {githubRepos.length}
            </Typography>
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};
