import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Redirect, Navigate} from "react-router-dom";

import Landing from './components/Landing';
import Register from "./components/Register";
import Login from './components/Login';
import './App.css';

//Material UI
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0582CA'
    },
    secondary: {
      main: '#64b5f6'
    }
  },
  // typography: {
  //   fontFamily: 'Quicksand',
  //   fontWeightLight: 400,
  //   fontWeightRegular: 500,
  //   fontWeightMedium: 600,
  //   fontWeightBold: 700,
  // }
});

function App() {

  const [isAuthenticated, setIsAuthenticated] =useState(false);

  const setAuth = boolean => {
      setIsAuthenticated(boolean);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/register' element={<Register/>}/>
          {/* <Route path="/register" element={props => !isAuthenticated?<Register {...props} setAuth={setAuth}/> :<Navigate to="/login"/>}/> */}
          {/* <Route exact path="/signup" render={props => !isAuthenticated? <SignUp {...props} setAuth={setAuth}/>:<Redirect to="/loginform"/>}/> */}
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </ThemeProvider>

  );
};

export default App;