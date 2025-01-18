import { Alert, Avatar, Box, Button, Container, Grid2, TextField, Typography } from '@mui/material';
import {useState } from 'react';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { ILoginMutation } from '../../types';
import { signInThunk} from './usersThunk.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectLoginError } from './usersSlice.ts';
import { NavLink, useNavigate } from 'react-router-dom';


const initialState ={
  username:"",
  password:""
}

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const loginError = useAppSelector(selectLoginError)
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState<ILoginMutation>(initialState);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setUserForm((prevState)=>({
      ...prevState,
      [name]:value
    }))
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(signInThunk(userForm)).unwrap();
      navigate('/')
    }catch(e){
      console.log(e);
    }
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ p:1, bgcolor: 'secondary.main', size: 'large' }}>
            <LockOpenIcon fontSize="large"/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {loginError &&(
            <Alert severity="error" sx={{mt:3, width:'100%'}}>
              {loginError.error}
            </Alert>
          )}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid2 container direction={'column'} size={12} spacing={2}>
              <Grid2 size={12}>
                <TextField
                  onChange={handleChange}
                  value={userForm.username}
                  name="username"
                  fullWidth
                  id="username"
                  label="Username"

                />
              </Grid2>
              <Grid2 size={12}>
                <TextField
                  onChange={handleChange}
                  fullWidth
                  value={userForm.password}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid2>
            </Grid2>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign in
            </Button>
            <Grid2 container justifyContent="flex-end">
              <Grid2>
                <NavLink to={'/register'}>
                  Do not have account? Sign up
                </NavLink>
              </Grid2>
            </Grid2>
          </Box>
        </Box>
      </Container>

    </>
  );
};

export default RegisterPage;