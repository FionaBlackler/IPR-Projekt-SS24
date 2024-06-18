import React, { useState } from "react";
import axios from 'axios';
import { ThemeProvider } from "styled-components";
import original from "react95/dist/themes/original"; // Theme der UI-Elemente
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Window, 
  WindowHeader, 
  WindowContent, 
  TextInput, 
  Separator
} from "react95";
import "./ForgotPassword.css";

function ForgotPassword() {
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

  return (
    <>
      <ThemeProvider theme={original}>
        <AppBar>
          <Toolbar style={{ justifyContent: "space-between" }}>
            <Button disabled style={{ fontWeight: "bold", marginLeft: "2rem" }}>
              Forgot Password
            </Button>
          </Toolbar>
        </AppBar>
        <div className="forgot-password-container">
          <Window className="forgot-password-window">
            <WindowHeader className="forgot-password-window-header">
              <span>Forgot Password</span>
            </WindowHeader>
            <WindowContent>
              <TextInput
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Separator />
              <Button onClick={handleInquiry}>Send Inquiry</Button>
              {message && <p>{message}</p>}
            </WindowContent>
          </Window>
        </div>
      </ThemeProvider>
    </>
  );
}

export default ForgotPassword;
