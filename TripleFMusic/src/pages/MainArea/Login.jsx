// Login.jsx

import React, { useState } from 'react';
import '../../../src/index.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleLogin = () => {
    // Hier könntest du die Überprüfung der Anmeldeinformationen durchführen
    if (username === '90sUser' && password === 'password123') {
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
    <div className="login-container">
      <div className="window">
        <div className="title-bar">
          <div className="title">TripleF Music <br /> Sign in</div>
        </div>
        <div className="content">
          <div className="input-container">
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
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
          <div className="button-container">
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleForgotPassword}>Forgot password?</button>
            <button onClick={handleSignUp}>Sign up</button>
          </div>
          {showForgotPassword && <p>Keine Sorge! Kontaktieren Sie den Support für Hilfe.</p>}
          {isLoggedIn && <p>Anmeldung erfolgreich! Willkommen zurück!</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
