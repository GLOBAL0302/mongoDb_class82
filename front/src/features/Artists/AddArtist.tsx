import { useState } from 'react';
import { Button, Grid2, TextField } from '@mui/material';
import FileInput from '../../components/FileInput/FileInput.tsx';
import { useAppDispatch } from '../../app/hooks.ts';
import { addArtistThunk, fetchArtistsThunk } from './artistsThunk.ts';
import { useNavigate } from 'react-router-dom';

const initialState = {
  title: '',
  image: null,
  description: '',
};

const AddArtist = () => {
  const [artistForm, setArtistForm] = useState(initialState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onChangeArtistForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setArtistForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addArtistThunk(artistForm));
    dispatch(fetchArtistsThunk());
    navigate("/");
  };

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files) {
      setArtistForm((prevState) => ({
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
          value={artistForm.title}
          onChange={onChangeArtistForm}
          id="title"
          name="title"
          fullWidth
        />
      </Grid2>
      <Grid2>
        <TextField
          variant="outlined"
          label="description"
          name="description"
          onChange={onChangeArtistForm}
          value={artistForm.description}
          id="description"
          fullWidth
        />
      </Grid2>
      <Grid2>
        <FileInput onGetFile={onChangeFile} name="image" label="image" />
      </Grid2>
      <Grid2>
        <Button variant="contained" type="submit">
          Add Artist
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default AddArtist;
