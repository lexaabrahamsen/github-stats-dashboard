const token = import.meta.env.VITE_GITHUB_TOKEN;

// Fetch GitHub repositories
export const fetchGithubRepos = async (username: string) => {
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
export const fetchGithubLanguages = async (repos: any[]) => {
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
export const fetchUserDetails = async (username: string) => {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: { Authorization: `token ${token}` },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user details');
  }
  return response.json();
};

export const fetchCommitActivity = async (repos: any[], username: string) => {
  const weeklyTotals: Record<number, number> = {};

  for (const repo of repos) {
    const res = await fetch(
      `https://api.github.com/repos/${username}/${repo.name}/stats/commit_activity`,
      {
        headers: { Authorization: `token ${token}` },
      }
    );

    const data = await res.json();
    if (!Array.isArray(data)) continue;

    data.forEach((week: any) => {
      const weekTimestamp = week.week * 1000;
      weeklyTotals[weekTimestamp] =
        (weeklyTotals[weekTimestamp] || 0) + week.total;
    });
  }

  // Convert to array of { date, count }
  return Object.entries(weeklyTotals)
    .map(([timestamp, total]) => ({
      date: new Date(Number(timestamp)).toISOString().split('T')[0],
      count: total,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};
