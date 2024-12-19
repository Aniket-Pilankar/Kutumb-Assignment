import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { Button, Container, TextField } from '@mui/material';

import { loginUser } from '../redux/slices/authSlice';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      otp: '',
    },
  });

  const onSubmit = async (data) => {
    console.log('data:', data);
    const { username, otp } = data;
    try {
      dispatch(loginUser({ username, otp })).then((action) => {
        if (action.type === 'auth/loginUser/fulfilled') navigate('/quotes');
      });
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
    >
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              margin="normal"
              id="outlined-basic"
              label="Enter User Name"
              variant="outlined"
              fullWidth
              {...field}
            />
          )}
        />
        <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <TextField
              margin="normal"
              id="outlined-basic"
              label="Enter Otp"
              variant="outlined"
              fullWidth
              {...field}
            />
          )}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default LoginPage;
