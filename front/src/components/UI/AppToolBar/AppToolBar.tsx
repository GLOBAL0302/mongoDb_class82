import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import AnonymousMenu from './AnonymousMenu.tsx';
import { useNavigate } from 'react-router-dom';

const AppToolBar = () => {
  const navigate = useNavigate();

  const goToMainPage = ()=>{
    navigate("/")
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{background:"purple"}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
          >
            <AudiotrackIcon/>
          </IconButton>
          <Typography onClick={goToMainPage} variant="h6" component="div" sx={{ flexGrow: 1, cursor: "pointer" }}>
            Spotify
          </Typography>
          <AnonymousMenu/>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolBar;