import './App.css';
import { Route, Routes } from 'react-router-dom';
import Artists from './features/Artists/Artists.tsx';
import Albums from './features/Albums/Albums.tsx';
import { Container } from '@mui/material';
import Tracks from './features/Tracks/Tracks.tsx';

const App = () => (
  <Container>
    <Routes>
      <Route path="/" element={<Artists />} />
      <Route path="/Albums/:id" element={<Albums />} />
      <Route path="/Tracks/:id" element={<Tracks />} />
    </Routes>
  </Container>
);

export default App;
