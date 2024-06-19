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
  Separator,
  Toolbar
} from "react95";

import original from "react95/dist/themes/original";
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

  const handleClose = () => {
    navigate("/");
  };

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleInquiry = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/forgot_password', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error requesting password reset');
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  
 
  
  /*
  const handleSignUp = () => {
    //Hier Registrieren
  */
  const navigate = useNavigate();

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

        <a>
          <section className="home-container">
            <ComputerCanvas />
          </section>
        </a>

        <div className="login-container">
          <Window className="funda" >
            <div className="login-window">
              <div className="title-bar-login">
                <div>
                  <WindowHeader className="login-window-header">
                    <span>
                    TripleF Music-Sign in 
                    </span>
                    
                    <Button onClick={handleClose}>
                      <span className="login-close-icon" />
                  </Button>

                  </WindowHeader>
                  
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
                      onClick={openModal}
                    >
                      forgot password?
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
                      onClick={() => {
                        navigate("/register");
                      }}
                    >
                      Sign up
                    </Button>
                  </ThemeProvider>
                </div>
                {showForgotPassword && (
                  <p>Contact support for help triplefmusic@support.de</p>
                )}
                {isLoggedIn && <p>logged in</p>}
              </div>
            </div>
          </Window>

          
          {isModalOpen && (
          <>
          <div className="forgotPasswordBackground ">
          <div className="forgotPassword-modal">
            <Window className="forgotPassword-modal-window">
              <WindowHeader className="forgotPassword-window-header">
                <span>Forgot Password</span>
                <Button onClick={closeModal}>
                <span className="forgotPassword-close-icon" />
                </Button>
              </WindowHeader>
              <WindowContent>
              <TextInput className="text-field-forgotPassword"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Separator />
              <Button className="inquiry-button" onClick={handleInquiry}>Send Inquiry</Button>
              {message && <p>{message}</p>}
              </WindowContent>
            </Window>
          </div>
          </div>
          </>
          
          )}



        </div>
      </ThemeProvider>
    </>
  );
}

export default Login;
