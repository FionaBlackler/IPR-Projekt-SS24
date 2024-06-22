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
import { useAuth } from '../../authContext';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      console.log('handleLogin: Attempting to log in with', { username, password, rememberMe });
      const response = await axios.post('http://localhost:8080/api/login', { username, password, rememberMe });
      const { token } = response.data;
      console.log('handleLogin: Received token:', token);
      
      login(token, rememberMe);
      console.log('handleLogin: Navigating to /welcome/home');
      navigate('/welcome/home');
    } catch (error) {
      console.error('handleLogin: Login failed:', error);
      if (error.response) {
        console.error('handleLogin: Server responded with:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('handleLogin: No response received:', error.request);
      } else {
        console.error('handleLogin: Error setting up request:', error.message);
      }
    }
  };

  const handleForgotPassword = async () => {
    try {
      console.log('handleForgotPassword: Requesting password reset for email:', email);
      const response = await axios.post('http://localhost:8080/api/forgot_password', { email });
      setMessage(response.data.message);
      console.log('handleForgotPassword: Response message:', response.data.message);
    } catch (error) {
      console.error('handleForgotPassword: Error requesting password reset:', error);
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
                style={{ fontWeight: "bold", marginLeft: "2rem", color: "white" }}
              >
                <img src={logo} alt="TripleF Music" style={{ height: "20px", marginRight: 4 }} />
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
          <Window>
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
                    <span className="forgot-password" onClick={openModal}>
                      Forgot password?
                    </span>
                  </div>
                </WindowContent>

                <div className="button-container">
                  <ThemeProvider theme={original}>
                    <Button primary onClick={handleLogin}>
                      Login
                    </Button>
                    <Button primary onClick={() => navigate("/register")}>
                      Register
                    </Button>
                  </ThemeProvider>
                </div>

                {isModalOpen && (
                  <Window className="forgot-password-window">
                    <WindowHeader>
                      <span>Reset Password</span>
                      <Button onClick={() => setShowForgotPassword(false)}>
                        <span className="forgot-password-close-icon" />
                      </Button>
                    </WindowHeader>
                    <WindowContent>
                      <div>
                        <p>Enter your email to reset your password:</p>
                        <TextInput
                          value={email}
                          placeholder="Email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <br />
                      <ThemeProvider theme={original}>
                        <Button primary onClick={handleForgotPassword}>
                          Submit
                        </Button>
                      </ThemeProvider>
                      {message && <p>{message}</p>}
                    </WindowContent>
                  </Window>
                )}
              </div>
            </div>
          </Window>
        </div>
      </ThemeProvider>
    </>
  );
}

export default Login;
