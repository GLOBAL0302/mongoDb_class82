import { IArtists } from '../../types';
import { apiUrl } from '../../globalConstants.ts';
import { Button, CardMedia, Grid2, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

interface Props {
  artist: IArtists;
}

const Artist: React.FC<Props> = ({ artist }) => {
  let artistsPic: string = '';

  if (artist.image) {
    artistsPic = apiUrl + '/' + artist.image;
  }

  return (
    <Grid2
      container
      direction="column"
      sx={{
        padding: '3px',
        border: '5px solid brown',
      }}
    >
      <Grid2>
        <CardMedia
          component="img"
          image={artistsPic}
          style={{ width: '200px', height: '200px' }}
          title={artist.title}
        />
      </Grid2>
      <Grid2 marginTop={2}>
        <Typography textAlign="center" variant="h5" component="h5">
          <Button component={NavLink} variant="outlined" to={`Albums/${artist._id}`}>
            {artist.title}
          </Button>
        </Typography>
      </Grid2>
    </Grid2>
  );
};

export default Artist;
