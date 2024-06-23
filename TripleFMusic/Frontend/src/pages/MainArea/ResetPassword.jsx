import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from "../Images/TripleF3_2.png";
import "./ResetPassword.css";

import { ThemeProvider } from 'styled-components';
import {
  Window,
  WindowHeader,
  WindowContent,
  Button,
  TextInput,
  AppBar,
  Toolbar,
  Separator
} from "react95";
import original from 'react95/dist/themes/original';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get token and email from query parameters
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const email = queryParams.get('email');

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/reset_password', { token, email, newPassword });
      setMessage(response.data.message);
      setTimeout(() => {
        navigate('/login');
      }, 3000); // Redirect after 3 seconds
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('Error resetting password');
    } finally {
      setLoading(false);
    }
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
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

      <div className="reset-password-container">
        <Window className="reset-password-window">
          <WindowHeader className="reset-header">
            <span>Reset Password</span>
          </WindowHeader>
          <WindowContent>
            <div className="reset-container">
              <TextInput
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={newPassword}
                placeholder="Type new password here..."
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ marginBottom: "10px" }}
              />
              <br />
              <span style={{ display: "block", marginBottom: "5px" }}>Confirm New Password:</span>
              <TextInput
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm new password here..."
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ marginBottom: "10px" }}
              />
              <span 
                role="img" 
                aria-label="toggle password visibility" 
                style={{ fontSize: "24px", marginLeft: 475, cursor: "pointer" }}
                onClick={toggleShowPassword}
              >
              {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
            <Separator />
            <Button className='reset-button' primary onClick={handleResetPassword} disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
            
          </WindowContent>
        </Window>
      </div>
    </ThemeProvider>
  );
}

export default ResetPassword;
