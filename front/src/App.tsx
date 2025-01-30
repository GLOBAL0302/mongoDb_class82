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
import AddArtist from './features/Artists/AddArtist.tsx';
import { useAppSelector } from './app/hooks.ts';
import { selectUser } from './features/Users/usersSlice.ts';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx';
import AddAlbum from './features/Albums/AddAlbums.tsx';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <AppToolBar />
      <Container>
        <Routes>
          <Route path="/" element={<Artists />} />
          <Route
            path="/addArtist"
            element={
              <ProtectedRoute isAllowed={user !== null}>
                <AddArtist />
              </ProtectedRoute>
            }
          />

          <Route path="/addAlbum" element={
            <ProtectedRoute isAllowed={user !== null}>
              <AddAlbum/>
            </ProtectedRoute>
          }/>


          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/trackHistory" element={<TrackHistory />} />
          <Route path="/Albums/:id" element={<Albums />} />
          <Route path="/Tracks/:id" element={<Tracks />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
