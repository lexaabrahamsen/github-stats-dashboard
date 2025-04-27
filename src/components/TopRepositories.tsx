import { Card, Typography } from '@mui/material';

interface TopRepositoriesProps {
  topRepos: Array<{
    id: number;
    name: string;
    stargazers_count: number;
  }>;
}
export const TopRepositories = ({ topRepos }: TopRepositoriesProps) => {
  return (
    <Card
      sx={{
        padding: '16px',
        backgroundColor: '#111C44',
        borderRadius: '20px',
      }}
    >
      <Typography variant="h6" style={{ marginTop: '20px', color: 'white' }}>
        Top Repositories
      </Typography>
      <ul>
        {topRepos.map((repo: any) => (
          <li key={repo.id}>
            <Typography sx={{ color: 'white' }}>
              {' '}
              <strong>{repo.name}</strong> - ⭐ {repo.stargazers_count}
            </Typography>
          </li>
        ))}
      </ul>
    </Card>
  );
};
