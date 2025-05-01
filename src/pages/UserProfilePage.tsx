import { useQuery } from '@tanstack/react-query';
import '../App.css';
import { Grid, Box, Button, Container } from '@mui/material';
import avatarBackground from '../assets/avatarBackground.png';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import {
  fetchGithubLanguages,
  fetchGithubRepos,
  fetchUserDetails,
} from '../services/githubServices';
import { ProfileHeader } from '../components/ProfileHeader';
import { TopRepositories } from '../components/TopRepositories';
import { LanguagesBreakdown } from '../components/LanguagesBreakdown';
import { RepoSizeWidget } from '../components/RepoSizeWidget';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Repository } from '../types';
import { Loading } from '../components/Loading';
import { NoUserFound } from '../components/NoUserFound';

export const UserProfilePage = () => {
  const [searchParams] = useSearchParams();
  const username = searchParams.get('id');

  const { data: githubRepos = [], isLoading: reposLoading } = useQuery<
    Repository[]
  >({
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

  const hasStarredRepos = githubRepos.some(repo => repo.stargazers_count > 0);

  const topRepos = githubRepos
  .map(repo => ({
    id: repo.id,
    name: repo.name,
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count ?? 0,
    language: repo.language ?? 'Unknown',
    size: repo.size ?? 0,
  }))
  .sort((a, b) => {
    if (hasStarredRepos) {
      return b.stargazers_count - a.stargazers_count;
    } else {
      return b.size - a.size;
    }
  })
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
    return <Loading />;
  }

  if (!userDetails) {
    return <NoUserFound />;
  }

  return (
    <>
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          onClick={handleClear}
          variant="outlined"
          color="primary"
          startIcon={<ArrowBackOutlinedIcon />}
          sx={{
            borderRadius: '8px',
            height: '54px',
            minWidth: '200px',
          }}
        >
          Search Another Profile
        </Button>
      </Box>
      <Grid container spacing={3} sx={{ p: 2 }}>
        <Grid item xs={12}>
          <ProfileHeader
            avatarBackground={avatarBackground}
            userDetails={userDetails}
            githubRepos={githubRepos}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LanguagesBreakdown languageData={languageData} />
        </Grid>
        {repoSizeData.length > 0 && (
          <Grid item xs={12} sm={6}>
            <RepoSizeWidget repoSizeData={repoSizeData} />
          </Grid>
        )}
        <Grid item xs={12}>
          <TopRepositories topRepos={topRepos} username={username} />
        </Grid>
      </Grid>
      </Container>
    </>
  );
};
