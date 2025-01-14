import { ITracks } from '../../types';
import { Grid2, Typography } from '@mui/material';

interface Props {
  track: ITracks;
}

const Track: React.FC<Props> = ({ track }) => {
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
    </Grid2>
  );
};

export default Track;
