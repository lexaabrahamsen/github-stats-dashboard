import { Card, Typography, Grid, Link as MuiLink, Box, CardHeader } from '@mui/material';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ForkRightOutlinedIcon from '@mui/icons-material/ForkRightOutlined';

interface TopRepositoriesProps {
  username: string;
  topRepos: Array<{
    id: number;
    name: string;
    stargazers_count: number;
    language: string;
    forks_count: number;
    size: number;
  }>;
}

export const TopRepositories = ({ topRepos, username }: TopRepositoriesProps) => {
  return (
    <Card
      sx={{
        padding: '16px',
        backgroundColor: '#111C44',
        borderRadius: '20px',
        boxShadow: 'none', // no default card hover weirdness
      }}
    >
      <CardHeader title="Top Repositories" sx={{ color: 'white' }} />
      <Grid container spacing={2} component="ul" sx={{ listStyle: 'none', padding: 0 }}>
        {topRepos.map((repo) => (
          <Grid
            item
            xs={12}
            sm={6}
            key={repo.id}
            component="li"
            sx={{ listStyle: 'none' }}
          >
            <MuiLink
              href={`https://github.com/${username}/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                display: 'block',
                backgroundColor: '#1A2451',
                borderRadius: '12px',
                padding: '12px',
                height: '100%',
                transition: 'background-color 0.3s, box-shadow 0.3s, transform 0.2s',
                textDecoration: 'none',
                outline: 'none',
                '&:hover': {
                  backgroundColor: '#243158',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  transform: 'translateY(-2px)', // slight lift
                },
                '&:focus-visible': {
                  outline: 'none',
                  backgroundColor: '#243158',
                },
                '&:active': {
                  backgroundColor: '#243158',
                  boxShadow: 'none',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <InsertDriveFileOutlinedIcon sx={{ color: 'white', mr: 1, fontSize: '20px' }} />
                <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                  {repo.name}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                {repo.language && (
                  <Typography sx={{ color: '#A0AEC0', fontSize: '0.8rem' }}>
                    {repo.language}
                  </Typography>
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#A0AEC0', fontSize: '0.8rem' }}>
                  <StarBorderOutlinedIcon sx={{ fontSize: '18px', mr: 0.5 }} />
                  {repo.stargazers_count}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#A0AEC0', fontSize: '0.8rem' }}>
                  <ForkRightOutlinedIcon sx={{ fontSize: '18px', mr: 0.5 }} />
                  {repo.forks_count}
                </Box>
                <Typography sx={{ color: '#A0AEC0', fontSize: '0.8rem' }}>
                  {repo.size} KB
                </Typography>
              </Box>
            </MuiLink>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};
