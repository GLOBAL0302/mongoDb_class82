import { ITrackHistory } from '../../types';
import { Grid2, Typography } from '@mui/material';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import dayjs from 'dayjs';

interface Props {
  history: ITrackHistory;
}

const HistoryTrack: React.FC<Props> = ({ history }) => {
  return (
    <Grid2
      sx={{
        border: '2px solid brown',
      }}
      alignItems="center"
      padding="5px 15px"
      container
    >
      <Grid2 width="30%">
        <Typography variant="h5" component="p">
          {history.track.album.artist.title.toUpperCase()}
        </Typography>
      </Grid2>
      <Grid2 width="30%">
        <Typography variant="h5" component="p">
          {history.track.title.toUpperCase()}
        </Typography>
      </Grid2>
      <Grid2 width="40%">
        <Typography textAlign="right" variant="h5" component="p">
          {' '}
          {dayjs(history.dateTime).format('YYYY-MM-DD HH:mm:ss')}
          <HeadphonesIcon />
        </Typography>
      </Grid2>
    </Grid2>
  );
};

export default HistoryTrack;
