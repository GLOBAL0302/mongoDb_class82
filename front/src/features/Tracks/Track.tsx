import { ITracks } from '../../types';
import { Button, Grid2, Typography } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useAppDispatch } from '../../app/hooks.ts';
import { addTrack } from './tracksThunks.ts';

interface Props {
  track: ITracks;
}

const Track: React.FC<Props> = ({ track }) => {

  const dispatch = useAppDispatch()

  const addOneTrack = ()=>{
    dispatch(addTrack(track))
  }

  return (
    <Grid2
      sx={{
        border: '5px solid black',
        padding: '5px',
      }}
      container
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid2>
        <Typography component="p" variant="body1">
          {track.track_number}
        </Typography>
      </Grid2>
      <Grid2>
        <Typography component="p" variant="body1">
          {track.title}
        </Typography>
      </Grid2>
      <Grid2>
        <Typography component="p" variant="body1">
          {track.duration}
        </Typography>
      </Grid2>
      <Grid2>
        <Button onClick={addOneTrack} type="button"  variant="contained" color="inherit">
          <PlayCircleIcon fontSize="large"/>
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default Track;
