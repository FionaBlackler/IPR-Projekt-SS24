import React, { useState } from "react";
import logo from "../Images/TripleF3_2.png";
import { ThemeProvider } from "styled-components";
import original from "react95/dist/themes/original"; 
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Window, 
  WindowHeader, 
  WindowContent, 
  TextInput, 
  Separator,
} from "react95";

import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from "axios";

function ForgotPassword() {
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/login");
  };

  const handleReset = async () => {
    try {
      // Hier den Axios-Aufruf implementieren, um das Passwort zurückzusetzen
      const response = await axios.post('http://localhost:8080/api/reset_password', {
        newPassword: password
      });
      console.log('Password reset successful:', response.data);
      setIsModalOpen(true); // Öffnet das Modal nach erfolgreicher Passwortrücksetzung
    } catch (error) {
      console.error('Password reset failed:', error);
      // Fehlerbehandlung hier
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="header">
        <ThemeProvider theme={original}>
          <AppBar>
            <Toolbar style={{ justifyContent: "space-between" }}>
              <Button disabled style={{ fontWeight: "bold", marginLeft: "2rem" }}>
                <img src={logo} alt="TripleF Music" style={{ height: "20px", marginRight: 4 }} />
                Login
              </Button>
              <p style={{ marginRight: "2rem" }}>
                {new Date().getFullYear()} TripleF Music. All rights reserved.
              </p>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </div>

      <div className="register-container">
        <ThemeProvider theme={original}>
          <Window className="register-window">
            <WindowHeader className="register-window-header">
              <span>TripleF Music - Reset Password</span>
            </WindowHeader>
            <WindowContent className="register-window-content">
              <TextInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
              />
              <Separator />
              <Button onClick={handleReset} style={{ marginLeft: 4 }}>
                Reset Password
              </Button>
            </WindowContent>
          </Window>
        </ThemeProvider>
      </div>

      {isModalOpen && (
        <div className="modal">
          <Window className="modal-window">
            <WindowHeader className="modal-window-header">
              <span>Password Reset Successful</span>
              <Button onClick={closeModal}>
                <span className="modal-close-icon" />
              </Button>
            </WindowHeader>
            <WindowContent className="modal-window-content">
              <p>Your password has been successfully reset.</p>
            </WindowContent>
          </Window>
        </div>
      )}
    </>
  );
}

export default ForgotPassword;
