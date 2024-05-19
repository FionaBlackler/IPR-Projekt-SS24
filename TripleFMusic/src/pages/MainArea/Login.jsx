//Funda

import React, { useState } from 'react';
import '../../../src/index.css';
import { createGlobalStyle, ThemeProvider } from 'styled-components';


import {Window, WindowHeader, WindowContent, Button, Checkbox,TextInput} from 'react95';
import vaporTeal from 'react95/dist/themes/vaporTeal'; 
import rose from 'react95/dist/themes/rose';



function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleLogin = () => {
    // Hier prüfung Anmeldedaten mit der Datenbank
    if (username === 'funda' && password === 'funda') {
      setIsLoggedIn(true);
    } else {
      alert('Login failed. Please check your access data.');
    }
  };

  /*
  const handleForgotPassword = () => {
    //Seite Passwort vergessen?
    setShowForgotPassword(true);
  };
  */
/*
  const handleSignUp = () => {
    //Hier Registrieren
    
  */

  return (
  <ThemeProvider theme={vaporTeal}>
    <div className="login-container">
      <Window resizable>
      <div className="window">
        <div className="title-bar">
          <div>
            <WindowHeader>TripleF Music-Sign in</WindowHeader> 
          </div>
        </div>
        <div className="content">
        <WindowContent>
          <div className="input-container">
            <TextInput
              value={username}
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              
            />
            <br />
            <TextInput
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              />
          </div>
          <br />
        
          <div className="checkbox-container">
              <Checkbox
                label="remember me"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />

              <span
                className="forgot-password"
                onClick={() => setShowForgotPassword(true)}
              >
                forgot password?
              </span>

            </div>

        </WindowContent>

          <div className="button-container">
            <ThemeProvider theme={rose}>
              <Button primary>Login</Button>
              <Button primary>Sign up</Button>
            </ThemeProvider>
          </div>
          {showForgotPassword && <p>Contact support for help triplefmusic@support.de</p>}
          {isLoggedIn && <p>logged in</p>}
        </div>
        
      </div>
      </Window>
    </div>
  </ThemeProvider>
  );
}

export default Login;
