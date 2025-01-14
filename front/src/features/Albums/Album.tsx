import { IAlbums } from '../../types';
import { CardMedia, Grid2, Typography } from '@mui/material';
import { apiUrl } from '../../globalConstants.ts';
import { useNavigate } from 'react-router-dom';

interface Props {
  album: IAlbums;
}

const Album: React.FC<Props> = ({ album }) => {
  const navigate = useNavigate();

  let albumPic = '';

  if (album.image) {
    albumPic = apiUrl + '/' + album.image;
  }

  const onClickGoToAlbum = () => {
    navigate(`/tracks/${album._id}`);
  };
  return (
    <Grid2
      onClick={onClickGoToAlbum}
      sx={{
        border: '4px solid brown',
        padding: '3px',
      }}
      container
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid2>
        <CardMedia component="img" image={albumPic} style={{ width: '100px', height: '100px' }} title={album.title} />
      </Grid2>
      <Grid2>
        <Typography textAlign="center" variant="h5" component="h5">
          {album.title}
        </Typography>
      </Grid2>
      <Grid2>
        <Typography textAlign="center" variant="h5" component="h5">
          {album.create_at} year
        </Typography>
      </Grid2>
      <Grid2>
        <Typography textAlign="center" variant="h5" component="h5">
          back track amount
        </Typography>
      </Grid2>
    </Grid2>
  );
};

export default Album;
