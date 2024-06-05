//Funda

import React, { useState } from "react";
import "./Login.css";

import { ThemeProvider } from "styled-components";
import logo from "../Images/TripleF3_2.png";

import {
  Window,
  WindowHeader,
  WindowContent,
  Button,
  Checkbox,
  TextInput,
  AppBar,
  Toolbar,
} from "react95";

import rose from "react95/dist/themes/rose";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleLogin = () => {
    // Hier prüfung Anmeldedaten mit der Datenbank
    if (username === "funda" && password === "funda") {
      setIsLoggedIn(true);
      navigate("/welcome/home");
    } else {
      alert("Login failed. Please check your access data.");
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
  const navigate = useNavigate();

  return (
    <>
      <ThemeProvider theme={rose}>
        <div className="login-container">
          <Window resizable>
            <div className="login-window">
              <div className="title-bar-login">
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
                    <Button primary onClick={handleLogin}>
                      Login
                    </Button>
                    <Button primary>Sign up</Button>
                  </ThemeProvider>
                </div>
                {showForgotPassword && (
                  <p>Contact support for help triplefmusic@support.de</p>
                )}
                {isLoggedIn && <p>logged in</p>}
              </div>
            </div>
          </Window>
        </div>
      </ThemeProvider>
      <div className="login-header">
        <ThemeProvider theme={rose}>
          <AppBar position="relative">
            <Toolbar style={{ justifyContent: "space-between" }}>
              <Button
                className="back"
                onClick={() => {
                  navigate("/");
                }}
                style={{ fontWeight: "bold", marginLeft: "2rem" }}
              >
                <img
                  src={logo}
                  alt="TripleF Music"
                  style={{ height: "20px", marginRight: 4 }}
                />
                Back
              </Button>

              <p style={{ marginRight: "2rem" }}>
                {new Date().getFullYear()} TripleF Music. All rights reserved.
              </p>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </div>
    </>
  );
}

export default Login;
