import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Login = ({setAuth}) => {

  const navigate = useNavigate()

  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });
  
  const { email, password } = inputs;
  
  const onChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }
  
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(
        "/login",
        {
          method: "POST",
          headers: {"Content-type": "application/json"},
          body: JSON.stringify(body)
        }
      );

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        // setAuth(true);
        navigate('/')
      } else {
        setAuth(false);
      }
    } catch (err) {
      console.error(err.message);
    }
    console.log(email);
  };

  return(
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
    </Avatar>
    <Typography component="h1" variant="h5">
        Login
    </Typography>
        <Box component="form" autoComplete="off" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    // autoComplete="email"
                    value={email}
                    onChange={e => onChange(e)}
                    />
                    {/* <Typography variant="caption">{formErrors.email}</Typography> */}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    // autoComplete="new-password"
                    value={password}
                    onChange={e => onChange(e)}
                    />
                    {/* <Typography variant="caption">{formErrors.password}</Typography> */}
                </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Login
                </Button>
                <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link to="/register" variant="body2">
                    Don't have an account? Sign Up
                    </Link>
                </Grid>
            </Grid>
        </Box>
    </Box>
    </Container>
  )
}

export default Login;