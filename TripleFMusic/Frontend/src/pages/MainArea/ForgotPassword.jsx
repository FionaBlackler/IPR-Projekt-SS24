import React, { useState } from "react";
import logo from "../Images/TripleF3_2.png";
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
import "./Welcome.css"; // Importiere deine CSS-Datei für das Styling
import { useNavigate } from "react-router-dom";

import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/login");
  };

  const handleInquiry = () => {
    /** 
     * Alert
    */
    alert("Your request has been forwarded to the support team. If you have any further questions, please contact support@triplefmusic.com");
    navigate("/login");
  }

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
              <span>TripleF Music-Forgot Password</span>
              <Button onClick={handleClose}>
                <span className="register-close-icon" />
              </Button>
            </WindowHeader>
            <WindowContent className="register-window-content">
              <span>please enter your email/username</span>
              <TextInput
                value={email}
                placeholder="e-mail/username"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Separator />
              <Separator />

              <div className="button-container">
                <Button onClick={handleInquiry} style={{ marginLeft: 4 }}>
                  send Inquiry
                </Button>
              </div>
            </WindowContent>
          </Window>
        </ThemeProvider>
      </div>
    </>
  );
}

export default ForgotPassword;
