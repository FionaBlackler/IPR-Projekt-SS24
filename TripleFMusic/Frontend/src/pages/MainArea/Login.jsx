import React, { useState } from "react";
import axios from 'axios';
import "./Login.css";

import { ThemeProvider } from "styled-components";
import logo from "../Images/TripleF3_2.png";
import ComputerCanvas from "../../models/computer";

import {
  Window,
  WindowHeader,
  WindowContent,
  Button,
  Checkbox,
  TextInput,
  AppBar,
  Toolbar,
  Separator
} from "react95";

import original from "react95/dist/themes/original";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/login', { username, password });
      console.log('Login successful:', response.data);
      navigate('/welcome/home');
      // Weiterleitungslogik oder Status setzen
    } catch (error) {
      console.error('Login failed:', error);
      // Detaillierte Fehlerbehandlung hier
      if (error.response) {
        console.error('Server responded with:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }

    } 
    


    }

  };
  

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/forgot_password', {
        email
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error requesting password reset:', error);
      setMessage('Error requesting password reset');
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ThemeProvider theme={original}>
        <div className="header">
          <AppBar>
            <Toolbar style={{ justifyContent: "space-between" }}>
              <Button
                disabled
                style={{
                  fontWeight: "bold",
                  marginLeft: "2rem",
                  color: "white",
                }}
              >
                <img
                  src={logo}
                  alt="TripleF Music"
                  style={{ height: "20px", marginRight: 4 }}
                />
                Login
              </Button>
              <p style={{ marginRight: "2rem", color: "black" }}>
                {new Date().getFullYear()} TripleF Music. All rights reserved.
              </p>
            </Toolbar>
          </AppBar>
        </div>

        <section className="home-container">
          <ComputerCanvas />
        </section>

        <div className="login-container">
          <Window className="funda">
            <div className="login-window">
              <div className="title-bar-login">
                <WindowHeader className="login-window-header">
                  <span>TripleF Music - Sign in</span>
                  <Button onClick={() => navigate("/")}>
                    <span className="login-close-icon" />
                  </Button>
                </WindowHeader>
              </div>
              <div className="content">
                <WindowContent>
                  <div className="input-container">
                    <TextInput
                      value={username}
                      placeholder="Username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <br />
                    <TextInput
                      type="password"
                      value={password}
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <br />
                  <div className="checkbox-container">
                    <Checkbox
                      label="Remember me"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <span
                      className="forgot-password"
                      onClick={openModal}
                    >
                      Forgot password?
                    </span>
                  </div>
                </WindowContent>

                <div className="button-container">
                  <ThemeProvider theme={original}>
                    <Button primary onClick={handleLogin}>
                      Login
                    </Button>
                    <Button
                      primary
                      onClick={() => navigate("/register")}
                    >
                      Sign up
                    </Button>
                  </ThemeProvider>
                </div>

                {showForgotPassword && (
                  <p>Contact support for help at triplefmusic@support.de</p>
                )}
                {isLoggedIn && <p>Logged in</p>}
              </div>
            </div>
          </Window>

          {isModalOpen && (
            <div className="forgotPasswordBackground">
              <div className="forgotPassword-modal">
                <Window className="forgotPassword-modal-window">
                  <WindowHeader className="forgotPassword-window-header">
                    <span>Forgot Password</span>
                    <Button onClick={closeModal}>
                      <span className="forgotPassword-close-icon" />
                    </Button>
                  </WindowHeader>
                  <WindowContent>
                    <TextInput
                      className="text-field-forgotPassword"
                      value={email}
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Separator />
                    <Button
                      className="inquiry-button"
                      onClick={handleForgotPassword}
                    >
                      Send Inquiry
                    </Button>
                    {message && <p>{message}</p>}
                  </WindowContent>
                </Window>
              </div>
            </div>
          )}
        </div>
      </ThemeProvider>
    </>
  );
}

export default Login;