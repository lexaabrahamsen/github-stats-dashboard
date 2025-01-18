import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { PieChart } from '@mui/x-charts/PieChart';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

const token = import.meta.env.VITE_GITHUB_TOKEN;

// Fetch GitHub repositories
const fetchGithubRepos = async () => {
  const githubRepos = await fetch(
    'https://api.github.com/users/lexaabrahamsen/repos',
    {
      headers: {
        Authorization: `token ${token}`,
      },
    }
  );
  if (!githubRepos.ok) {
    throw new Error('Failed to fetch repositories');
  }
  return githubRepos.json();
};

// Fetch languages for all repositories
const fetchGithubLanguages = async (repos: any[]) => {
  const languageData = await Promise.all(
    repos.map(async (repo: any) => {
      const githubLanguages = await fetch(repo.languages_url, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      if (!githubLanguages.ok) {
        console.error(`Failed to fetch languages for ${repo.name}`);
        return {};
      }
      return githubLanguages.json();
    })
  );

  const languageCounts: Record<string, number> = {};
  languageData.forEach((languages) => {
    Object.keys(languages).forEach((language) => {
      languageCounts[language] = (languageCounts[language] || 0) + 1;
    });
  });

  return languageCounts;
};

// Fetch user details
const fetchUserDetails = async () => {
  const userDetails = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  if (!userDetails.ok) {
    throw new Error('Failed to fetch user details');
  }
  return userDetails.json();
};

function App() {
  const [count, setCount] = useState(0);

  // Use React Query to fetch repositories
  const {
    data: githubRepos = [],
    isLoading: reposLoading,
    error: reposError,
  } = useQuery({
    queryKey: ['githubRepos'],
    queryFn: fetchGithubRepos,
  });

  // Use React Query to fetch languages
  const { data: githubLanguages = {} } = useQuery({
    queryKey: ['githubLanguages', githubRepos],
    queryFn: () => fetchGithubLanguages(githubRepos),
    enabled: !!githubRepos.length,
  });

  // Use React Query to fetch user details
  const {
    data: userDetails,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ['userDetails'],
    queryFn: fetchUserDetails,
  });

  // Sort and slice the top 8 repositories
  const topRepos = githubRepos
    .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count) // Sort by stars
    .slice(0, 8); // Take the top 8

  if (reposLoading || userLoading) return <div>Loading...</div>;
  if (reposError instanceof Error)
    return <div>Error: {reposError.message}</div>;
  if (userError instanceof Error) return <div>Error: {userError.message}</div>;
  // Prepare data for Pie Chart
  const languageData = Object.entries(githubLanguages).map(
    ([language, value]) => ({
      id: language,
      label: language,
      value,
    })
  );

  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#FF6384',
    '#36A2EB',
  ];
  console.log(userDetails);
  return (
    <>
      <Grid container>
        <Grid>
          <Typography variant="h1">{userDetails.login}</Typography>
        </Grid>
        <Grid>
          <img src={userDetails.avatar_url} alt="Avatar" />
        </Grid>
      </Grid>
      <p>Name: {userDetails.name}</p>
      <p>Followers: {userDetails.followers}</p>
      <p>Following: {userDetails.following}</p>
      <p>Repository Count: {githubRepos.length}</p>
      <h2>Top 8 Repositories</h2>
      <ul>
        {topRepos.map((repo: any) => (
          <li key={repo.id}>
            <strong>{repo.name}</strong> - ⭐ {repo.stargazers_count}
          </li>
        ))}
      </ul>
      <ul>
        <h3>Repositories</h3>
        {githubRepos.map((repo: any) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
      <ul>
        <h3>Languages</h3>
        {Object.entries(githubLanguages).map(([language, count]) => (
          <li key={language}>
            {language}: {count}
          </li>
        ))}
      </ul>
      <h1>GitHub Repository Language Breakdown</h1>
      <PieChart
        series={[
          {
            data: languageData,
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            valueFormatter: (item: any) => `${item.value}`,
          },
        ]}
        height={300}
      />
    </>
  );
}

export default App;
