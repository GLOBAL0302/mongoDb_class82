import { useState } from 'react';
import { Button, Grid2, TextField } from '@mui/material';
import FileInput from '../../components/FileInput/FileInput.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';

import { selectAllArtists } from '../Artists/artistsSlice.ts';
import { addAlbum } from './albumsThunk.ts';

const initialState = {
  title: '',
  create_at: '',
  image: null,
  artist: '',
};

const AddAlbum = () => {
  const albums = useAppSelector(selectAllArtists);
  console.log(albums);

  const [albumForm, setAlbumForm] = useState(initialState);
  const dispatch = useAppDispatch();

  const onChangeAlbumForm = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setAlbumForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addAlbum(albumForm));
  };

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files) {
      setAlbumForm((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  return (
    <Grid2 component="form" container flexDirection="column" spacing={2} onSubmit={onSubmit}>
      <Grid2>
        <TextField
          variant="outlined"
          label="title"
          value={albumForm.title}
          onChange={onChangeAlbumForm}
          id="title"
          name="title"
          fullWidth
        />
      </Grid2>
      <Grid2>
        <TextField
          variant="outlined"
          label="Created at"
          name="create_at"
          onChange={onChangeAlbumForm}
          value={albumForm.create_at}
          id="create_at"
          type="number"
          fullWidth
        />
      </Grid2>
      <Grid2>
        <select value={albumForm.artist} name="artist" id="artist" onChange={onChangeAlbumForm}>
          <option disabled>Select Artist</option>
          {albums.map((item) => (
            <option key={item._id} value={item._id}>
              {item.title}
            </option>
          ))}
        </select>
      </Grid2>
      <Grid2>
        <FileInput onGetFile={onChangeFile} name="image" label="image" />
      </Grid2>
      <Grid2>
        <Button variant="contained" type="submit">
          Add Album
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default AddAlbum;
