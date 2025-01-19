import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import './App.css';
import { PieChart } from '@mui/x-charts/PieChart';
import { Typography, Grid, TextField, Button } from '@mui/material';

const token = import.meta.env.VITE_GITHUB_TOKEN;

// Fetch GitHub repositories
const fetchGithubRepos = async (username: string) => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`,
    {
      headers: { Authorization: `token ${token}` },
    }
  );
  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }
  return response.json();
};

// Fetch languages for all repositories
const fetchGithubLanguages = async (repos: any[]) => {
  const languageData = await Promise.all(
    repos.map(async (repo: any) => {
      const response = await fetch(repo.languages_url, {
        headers: { Authorization: `token ${token}` },
      });
      if (!response.ok) {
        console.error(`Failed to fetch languages for ${repo.name}`);
        return {};
      }
      return response.json();
    })
  );

  const languageCounts: Record<string, number> = {};
  languageData.forEach((languages) => {
    Object.keys(languages).forEach((language) => {
      languageCounts[language] =
        (languageCounts[language] || 0) + languages[language];
    });
  });

  return languageCounts;
};

// Fetch user details
const fetchUserDetails = async (username: string) => {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: { Authorization: `token ${token}` },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user details');
  }
  return response.json();
};

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState('');

  // Repositories Query
  const { data: githubRepos = [], isLoading: reposLoading } = useQuery({
    queryKey: ['githubRepos', username],
    queryFn: () => fetchGithubRepos(username!), // Ensure username is non-null
    enabled: !!username, // Ensure the query runs only if username is truthy
  });

  // User Details Query
  const { data: userDetails, isLoading: userLoading } = useQuery({
    queryKey: ['userDetails', username],
    queryFn: () => fetchUserDetails(username!), // Fetch function
    enabled: !!username,
  });

  // Languages Query
  const { data: githubLanguages = {} } = useQuery({
    queryKey: ['githubLanguages', githubRepos],
    queryFn: () => fetchGithubLanguages(githubRepos), // Fetch function
    enabled: !!githubRepos.length,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setUsername(searchInput.trim());
    }
  };

  // Prepare data for Pie Chart
  const languageData = Object.entries(githubLanguages).map(
    ([language, value]) => ({
      id: language,
      label: language,
      value,
    })
  );

  // Sort and slice the top 8 repositories
  const topRepos = githubRepos
    .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count) // Sort by stars
    .slice(0, 8); // Take the top 8

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        GitHub Profile Dashboard
      </Typography>
      <form onSubmit={handleSearch}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <TextField
              label="GitHub Username"
              variant="outlined"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Search
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Conditionally Render Dashboard */}
      {username && (
        <div>
          {reposLoading || userLoading ? (
            <Typography variant="h6">Loading...</Typography>
          ) : (
            <>
              <Grid
                container
                spacing={2}
                alignItems="center"
                style={{ marginTop: '20px' }}
              >
                <Grid item>
                  <img
                    src={userDetails.avatar_url}
                    alt="Avatar"
                    style={{ width: '100px', borderRadius: '50%' }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h5">{userDetails.name}</Typography>
                  <Typography>Followers: {userDetails.followers}</Typography>
                  <Typography>Following: {userDetails.following}</Typography>
                  <Typography>Repositories: {githubRepos.length}</Typography>
                </Grid>
              </Grid>

              <Typography variant="h6" style={{ marginTop: '20px' }}>
                Top Repositories
              </Typography>
              <ul>
                {topRepos.map((repo: any) => (
                  <li key={repo.id}>
                    <strong>{repo.name}</strong> - ⭐ {repo.stargazers_count}
                  </li>
                ))}
              </ul>

              <Typography variant="h6" style={{ marginTop: '20px' }}>
                Languages Breakdown
              </Typography>
              <PieChart
                series={[
                  {
                    data: languageData,
                    highlightScope: { fade: 'global', highlight: 'item' },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: 'gray',
                    },
                    valueFormatter: (item: any) => `${item.value} bytes`,
                  },
                ]}
                height={300}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
