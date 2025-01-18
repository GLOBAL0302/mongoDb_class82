import './App.css';
import { Route, Routes } from 'react-router-dom';
import Artists from './features/Artists/Artists.tsx';
import Albums from './features/Albums/Albums.tsx';
import { Container } from '@mui/material';
import Tracks from './features/Tracks/Tracks.tsx';
import AppToolBar from './components/UI/AppToolBar/AppToolBar.tsx';
import RegisterPage from './features/Users/RegisterPage.tsx';
import LoginPage from './features/Users/LoginPage.tsx';
import TrackHistory from './features/TrackHistory/TrackHistory.tsx';

const App = () => (
  <>
    <AppToolBar />
    <Container>
      <Routes>
        <Route path="/" element={<Artists />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/trackHistory" element={<TrackHistory />} />
        <Route path="/Albums/:id" element={<Albums />} />
        <Route path="/Tracks/:id" element={<Tracks />} />
      </Routes>
    </Container>
  </>
);

export default App;
