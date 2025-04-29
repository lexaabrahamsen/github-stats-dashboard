import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

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
                border: '4px solid #111C44',
              }}
            />
          </Grid>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={2}
            sx={{ transform: 'translateY(-20%)' }}
          >
            <Grid item xs={12}>
              <Typography
                variant="h3"
                align="center"
                gutterBottom
                sx={{ color: 'white' }}
              >
                {userDetails.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                align="center"
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
            <Grid container justifyContent="center" spacing={5}>
              <Grid item>
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ color: 'white', fontWeight: 'bold' }}
                >
                  {userDetails.followers}
                </Typography>
                <br />
                <Typography
                  variant="overline"
                  align="center"
                  sx={{
                    color: '#ffffff',
                    fontWeight: 500,
                    letterSpacing: '1px',
                  }}
                >
                  Followers
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ color: 'white', fontWeight: 'bold' }}
                >
                  {userDetails.following}
                </Typography>
                <br />
                <Typography
                  variant="overline"
                  align="center"
                  sx={{
                    color: '#ffffff',
                    fontWeight: 500,
                    letterSpacing: '1px',
                  }}
                >
                  Following
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ color: 'white', fontWeight: 'bold' }}
                >
                  {githubRepos.length}
                </Typography>
                <br />
                <Typography
                  variant="overline"
                  align="center"
                  sx={{
                    color: '#ffffff',
                    fontWeight: 500,
                    letterSpacing: '1px',
                  }}
                >
                  Repositories
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
