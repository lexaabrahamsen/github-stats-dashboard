import { Box } from '@mui/material';
import { useState } from 'react';
import { UsernameSearchCard } from '../components/UsernameSearchCard';

export const SearchPage = () => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      window.location.href = `/user?id=${searchInput.trim()}`;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <UsernameSearchCard
        handleSearch={handleSearch}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
    </Box>
  );
};
