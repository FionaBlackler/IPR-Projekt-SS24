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
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/login', { username, password, rememberMe });
      const { token, user } = response.data;
      
      login(token, rememberMe, user);
      navigate('/welcome/home');
    } catch (error) {
      alert('Login failed. Please check your credentials and try again.');
      console.error('Login failed:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/forgot_password', { email });
      if (response.data.userExists) {
        setIsModalOpen(false);  // Close the forgot password modal
        setSuccess(true);       // Show the success message
        setTimeout(() => {
          setSuccess(false);    // Hide the success message
          navigate("/login");   // Redirect to the login page
        }, 3000); // 3 seconds delay
      } else {
        alert('No user found with the provided email.');
      }
    } catch (error) {
      alert('Error requesting password reset');
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
                      type={showPassword ? "text" : "password"}
                      value={password}                      
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <br />
                  <span 
                    role="img" 
                    aria-label="toggle password visibility" 
                    style={{ fontSize: "24px", marginLeft: 500, cursor: "pointer" }}
                    onClick={toggleShowPassword}>
                    {showPassword ? "🙈" : "👁️"}
                  </span>

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
                    <Button primary onClick={handleLogin} disabled={loading}>
                      {loading ? 'Loading...' : 'Login'}
                    </Button>
                    <Button primary onClick={() => navigate("/register")}>
                      Sign up
                    </Button>
                  </ThemeProvider>
                </div>
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
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'Send Inquiry'}
                    </Button>
                  </WindowContent>
                </Window>
              </div>
            </div>
          )}

          {success && (
            <div className="success-background">
              <div className="success-div">
                <Window className="success-window">
                  <WindowContent>
                    <p className="success-text">
                      Inquiry sent. Please check your email for further instructions.
                    </p>
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
