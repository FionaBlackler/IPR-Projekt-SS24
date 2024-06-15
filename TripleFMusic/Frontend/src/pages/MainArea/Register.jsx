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
  Separator,
  Checkbox 
} from "react95";
import "./Welcome.css"; // Importiere deine CSS-Datei für das Styling
import { useNavigate } from "react-router-dom";

import "./Register.css";

function Register() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  /*const [emailConfirm, setEmailConfirm] = useState("");*/
  const [password, setPassword] = useState("");
  /*const [passwordConfirm, setPasswordConfirm] = useState("");*/
  const [termsAndConditions, settermsAndConditions] = useState(false);
  const[username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/login");
  };

  const handleReset = () => {
    // Logik für Reset Button (alle Felder leeren)
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setUsername("");
    settermsAndConditions(false);
  };

  const handleRegister = () => {
    //hier noch Datenbank logik
    navigate("/login");
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
              <span>TripleF Music-Sign up</span>
              <Button onClick={handleClose}>
                <span className="register-close-icon" />
              </Button>
            </WindowHeader>
            <WindowContent className="register-window-content">
              <div className="firstname">
                <span>firstname:</span>
                <TextInput
                  value={firstname}
                  placeholder="firstname"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="lastname">
                <span>lastname:</span>
                <TextInput
                  value={lastname}
                  placeholder="lastname"
                  onChange={(e) => setLastName(e.target.value)}
                />
                <Separator />
                <Separator />
                <span>username:</span>
                <TextInput
                  value={username}
                  placeholder="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <span>e-mail:</span>
                <TextInput
                  value={email}
                  placeholder="e-mail"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Separator />
                <Separator />
                <span>password:</span>
                <TextInput
                  type="password"
                  value={password}
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />

              </div>

              <div className="register-checkbox">
                <Checkbox
                  className="termsAndConditions"
                  label="I agree to the terms and conditions"
                  checked={termsAndConditions}
                  onChange={() => settermsAndConditions(!termsAndConditions)}
                />
              </div>
              <div className="button-container">
                <Button onClick={handleReset} style={{ marginLeft: 4 }}>
                  Clear
                </Button>
                <Button onClick={handleRegister} style={{ marginLeft: 4 }}>
                  Register account
                </Button>
              </div>
            </WindowContent>
          </Window>
        </ThemeProvider>
      </div>
    </>
  );
}

export default Register;
