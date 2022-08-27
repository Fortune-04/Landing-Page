import React,{useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Register = ({setAuth}) => {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        password2: "",
    });

    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false);

    const { username, email, password, password2 } = inputs;

    const onChange = e => setInputs({ ...inputs, [e.target.name]: e.target.value });

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!email) {
          errors.email = "Email is required!";
        }else if (!regex.test(email)){
          errors.email = "Email is invalid!"
        }
  
        return errors;
    };

    const handleSubmit = async e => {
        e.preventDefault()
        setFormErrors(validate());
        setIsSubmit(true);
    
        if(isSubmit === true){
            try {
                const body = { username, email, password };
                const response = await fetch(
                "/register",
                {
                    method: "POST",
                    headers: {
                    "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
                );
                const parseRes = await response.json();
    
                if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                // setAuth(true);
                navigate('/login')
                } else {
                setAuth(false);
                }
    
            } catch (err) {
                console.error(err.message);
            }
        } 

        // try {
        //     const body = { username, email, password };
        //     const response = await fetch(
        //     "http://localhost:4000/register",
        //     {
        //         method: "POST",
        //         headers: {
        //         "Content-type": "application/json"
        //         },
        //         body: JSON.stringify(body)
        //     }
        //     );
        //     const parseRes = await response.json();

        //     if (parseRes.token) {
        //         localStorage.setItem("token", parseRes.token);
        //         // setAuth(true);
        //         navigate('/login')
        //     } else {
        //         setAuth(false);
        //     }

        // } catch (err) {
        //     console.error(err.message);
        // }
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
            Sign up
        </Typography>
            <Box component="form" autoComplete="off" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        // autoComplete="given-name"
                        // autoComplete="off"
                        name="username"
                        required
                        fullWidth
                        id="firstName"
                        label="Username"
                        value={username}
                        onChange={e => onChange(e)}
                        autoFocus
                        />
                        {/* <Typography variant="caption">{formErrors.username}</Typography> */}
                    </Grid>
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
                        <Typography variant="caption">{formErrors.email}</Typography>
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
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        name="password2"
                        label="Confirm Password"
                        type="password"
                        id="password2"
                        // autoComplete="new-password"
                        value={password2}
                        onChange={e => onChange(e)}
                        />
                        {/* <Typography variant="caption">{formErrors.password2}</Typography> */}
                    </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link to="/login" variant="body2">
                        Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
        </Container>
    )
}

export default Register;