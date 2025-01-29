import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import AnonymousMenu from './AnonymousMenu.tsx';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../../features/Users/usersSlice.ts';
import UserMenu from './UserMenu.tsx';

const AppToolBar = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const goToMainPage = () => {
    navigate('/');
  };
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 3 }}>
      <AppBar position="static">
        <Toolbar sx={{ background: 'purple' }}>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }}>
            <AudiotrackIcon />
          </IconButton>
          <Typography onClick={goToMainPage} variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }}>
            Spotify
          </Typography>
          {user ? <UserMenu user={user} /> : <AnonymousMenu />}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolBar;
