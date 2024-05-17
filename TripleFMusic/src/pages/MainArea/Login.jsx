//Funda

import React, { useState } from 'react';
import '../../../src/index.css';

import { createGlobalStyle, ThemeProvider } from 'styled-components';

import {Window, WindowHeader, WindowContent, Button, TextInput} from 'react95';
import vaporTeal from 'react95/dist/themes/vaporTeal'; 
import rose from 'react95/dist/themes/rose';



function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleLogin = () => {
    // Hier könntest du die Überprüfung der Anmeldeinformationen durchführen
    if (username === 'funda' && password === 'funda') {
      setIsLoggedIn(true);
    } else {
      alert('Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Zugangsdaten.');
    }
  };

  const handleForgotPassword = () => {
    // Hier könntest du die Funktion "Passwort vergessen" implementieren
    setShowForgotPassword(true);
  };

  const handleSignUp = () => {
    // Hier könntest du die Funktion "Registrieren" implementieren
    alert('Sign up Button wurde geklickt');
  };

  return (
  <ThemeProvider theme={vaporTeal}>
    <div className="login-container">
      <Window resizable>
      <div className="window">
        <div className="title-bar">
          <div>
            <WindowHeader className='window-title'>TripleF Music-Sign in</WindowHeader> 
          </div>
        </div>
        <div className="content">
        <WindowContent>



        <div className="checkbox-container">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>
          </div>

  

        </WindowContent>



          
          <div className="button-container">
            <ThemeProvider theme={rose}>
            <Button primary>Login</Button>
            <Button primary>Sign up</Button>
            </ThemeProvider>
          </div>
          {showForgotPassword && <p>Keine Sorge! Kontaktieren Sie den Support für Hilfe.</p>}
          {isLoggedIn && <p>Anmeldung erfolgreich! Willkommen zurück!</p>}
        </div>
        
      </div>
      </Window>
    </div>
  </ThemeProvider>
  );
}

export default Login;
