import { useQuery } from '@tanstack/react-query';
import '../App.css';
import { Typography, Grid, Box, Button, CircularProgress } from '@mui/material';
import avatarBackground from '../assets/avatarBackground.png';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { fetchGithubLanguages, fetchGithubRepos, fetchUserDetails } from '../services/githubServices';
import { ProfileHeader } from '../components/ProfileHeader';
import { TopRepositories } from '../components/TopRepositories';
import { LanguagesBreakdown } from '../components/LanguagesBreakdown';
import { RepoSizeWidget } from '../components/RepoSizeWidget';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Repository } from '../types';
import SentimentVeryDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';

export const UserProfilePage = () => {
  const [searchParams] = useSearchParams();
  const username = searchParams.get('id');

  const { data: githubRepos = [], isLoading: reposLoading } = useQuery<Repository[]>({
    queryKey: ['githubRepos', username],
    queryFn: () => fetchGithubRepos(username!),
    enabled: !!username,
  });

  const { data: userDetails, isLoading: userLoading } = useQuery({
    queryKey: ['userDetails', username],
    queryFn: () => fetchUserDetails(username!),
    enabled: !!username,
  });

  const { data: githubLanguages = {} } = useQuery({
    queryKey: ['githubLanguages', githubRepos],
    queryFn: () => fetchGithubLanguages(githubRepos),
    enabled: !!githubRepos.length,
  });

  const languageData = Object.entries(githubLanguages).map(
    ([language, value]) => ({
      id: language,
      label: language,
      value,
    })
  );

  const topRepos = githubRepos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 8);

  const repoSizeData = githubRepos
    .map((repo) => ({ name: repo.name, size: repo.size }))
    .sort((a, b) => b.size - a.size)
    .slice(0, 10);

  const handleClear = () => {
    window.location.href = '/';
  };

  if (!username) {
    return <Navigate to="/" />;
  }

  if (reposLoading || userLoading) {
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
  }

  if (!userDetails) {
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
        <SentimentVeryDissatisfiedOutlinedIcon sx={{ fontSize: 80, color: 'white', mb: 4 }} />
        <Typography variant="h6" sx={{ color: 'white' }}>
          Couldn't load profile. Please try again.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          onClick={handleClear}
          variant="contained"
          startIcon={<ArrowBackOutlinedIcon />}
          sx={{
            backgroundColor: '#7551FF',
            borderRadius: '8px',
            height: '54px',
            minWidth: '200px',
            '&:hover': {
              backgroundColor: '#5e3bdb',
            },
          }}
        >
          Search Another Profile
        </Button>
      </Box>
      <Grid container sx={{ m: 4 }}>
        <Grid item xs={12}>
          <ProfileHeader
            avatarBackground={avatarBackground}
            userDetails={userDetails}
            githubRepos={githubRepos}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TopRepositories topRepos={topRepos} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <LanguagesBreakdown languageData={languageData} />
        </Grid>

        {repoSizeData.length > 0 && (
          <Grid item xs={12}>
            <RepoSizeWidget repoSizeData={repoSizeData} />
          </Grid>
        )}
      </Grid>
    </>
  );
}