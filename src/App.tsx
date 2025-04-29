import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Layout } from './layouts/Layout';
import { SearchPage } from './pages/SearchPage';
import { UserProfilePage } from './pages/UserProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/user" element={<UserProfilePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
