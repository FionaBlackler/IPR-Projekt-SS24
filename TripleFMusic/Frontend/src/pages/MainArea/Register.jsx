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
  Checkbox,
  ScrollView
} from "react95";

import { useNavigate } from "react-router-dom";
import "./Register.css";
import styled from 'styled-components';
import axios from "axios";

function Register() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAndConditions, settermsAndConditions] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/login");
  };

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setUsername("");
    settermsAndConditions(false);
  };

  const handleRegister = async () => {
    if (!firstname || !lastname || !email || !password || !username) {
      alert("All fields are required");
      return;
    }

    if (!termsAndConditions) {
      alert("You must accept the terms and conditions");
      return;
    }

    console.log('Register button clicked');
    try {
      const response = await axios.post("http://localhost:8080/api/register", {
        firstname,
        lastname,
        email,
        password,
        username,
      });
      console.log('Registration response:', response);
      if (response.status === 201) {
        console.log('Registration successful');
        setIsConfirmationOpen(true); // Show confirmation dialog
        setTimeout(() => {
          navigate("/login");
        }, 3000); // Redirect after 3 seconds
      } else {
        console.error('Registration failed:', response.data.message);
        setError(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      if (error.response && error.response.data && error.response.data.message) {
        const errorMessage = error.response.data.message.toLowerCase();
        if (errorMessage.includes("username already taken")) {
          alert("Username is already taken");
        } else if (errorMessage.includes("email already taken")) {
          alert("Email is already taken");
        } else {
          alert(error.response.data.message || "Something went wrong");
        }
      } else {
        alert("Something went wrong");
      }
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openConfirmationOpen = () => {
    setIsConfirmationOpen(true);
  };

  const closeConfirmationOpen = () => {
    setIsConfirmationOpen(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
              <div className="form-group">
                <span>Firstname:</span>
                <TextInput
                  value={firstname}
                  placeholder="Firstname"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <span>Lastname:</span>
                <TextInput
                  value={lastname}
                  placeholder="Lastname"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <span>Username:</span>
                <TextInput
                  value={username}
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="form-group">
                <span>E-Mail:</span>
                <TextInput
                  value={email}
                  placeholder="E-Mail"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <span>Password:</span>
                <TextInput
                  type={showPassword ? "text" : "password"}
                  value={password}      
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br/>
                <span 
                  role="img" 
                  aria-label="toggle password visibility" 
                  style={{ fontSize: "24px", marginLeft: 490, cursor: "pointer" }}
                  onClick={toggleShowPassword}>
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>

              <div className="register-checkbox">
                <Checkbox
                  id="termsCheckbox"
                  checked={termsAndConditions}
                  onChange={() => settermsAndConditions(!termsAndConditions)}
                />
                <label className="termsCheckbox">
                  I agree to the 
                  <span className="terms-link" onClick={openModal}> terms and conditions</span>
                </label>
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

          {isModalOpen && (
            <>
              <div className="terms-background">
                <div className="terms-modal">
                  <Window className="terms-modal-window" style={{ overflowY: 'hidden' }}>
                    <WindowHeader className="terms-window-header">
                      <span>Terms and Conditions</span>
                      <Button onClick={closeModal}>
                        <span className="register-close-icon" />
                      </Button>
                    </WindowHeader>
                    <WindowContent>
                      <ScrollView style={{ height: 355 , width:485}}>
                        <div className="terms-wrapper">
                          <div className="terms">
                          
                            <span className="terms-title">
                              Welcome to TripleF Music!
                            </span> 
                            <p className="terms-text">
                              Before you dive into our world of melodious wonders, 
                              we need you to read and agree to the following terms and conditions. But don't worry, 
                              we promise to keep it light and fun.
                            </p>

                            <Separator></Separator>

                            <span className="terms-title">Acceptance of Terms</span>
                            <p className="terms-text">
                              By using our services, you agree to these terms. If you don't agree,
                              you can still hum your favorite tunes, but you can't use our app. Sorry, not sorry!
                            </p>
                            
                            <Separator></Separator>

                            <span className="terms-title">User Conduct</span>
                            <p className="terms-text">
                              Be nice. No spamming, trolling, or using our platform to spread bad vibes.
                              We're all about good music and good times here.
                            </p>

                            <Separator></Separator>

                            <span className="terms-title">Account</span>
                            <p className="terms-text">
                              Keep your password a secret. Sharing your password is like sharing your toothbrush 
                              – just don't do it.
                            </p>

                            <Separator></Separator>

                            <span className="terms-title">Content Ownership</span>
                            <p className="terms-text">
                              Your music, your rules. You own the content you upload, but you give us permission 
                              to share your beats with the world. We promise not to take credit for your killer 
                              basslines.
                            </p>

                            <Separator></Separator>
                            
                            <span className="terms-title">License to Use</span>
                            <p className="terms-text">
                              We grant you a non-transferable, non-exclusive license to use our app.
                              Basically, you can't sell our app on the black market.
                            </p>

                            <Separator></Separator>

                            <span className="terms-title">Termination</span>
                            <p className="terms-text">
                              If you break the rules, we might have to show you the door. 
                              But we'll do it gently, like a polite bouncer.
                            </p>

                            <Separator></Separator>

                            <span className="terms-title">Privacy</span>
                            <p className="terms-text">
                              We care about your privacy almost as much as we care about our playlists. 
                              Check out our Privacy Policy to see how we protect your data.
                            </p>

                            <Separator></Separator>

                            <span className="terms-title">Limitation of Liability</span>
                            <p className="terms-text">
                              We strive to keep our app glitch-free, but if something goes wrong, 
                              please don't throw your phone. 
                              We're not responsible for any damages, including your shattered screen.
                            </p>

                            <Separator></Separator>

                            <span className="terms-title">Governing Law</span>
                            <p className="terms-text">
                              These terms are governed by the laws of the Internet – just kidding.
                              They are governed by the laws of the jurisdiction where our headquarters are located.
                            </p>

                            <Separator></Separator>

                            <span className="terms-title">Changes to Terms</span>
                            <p className="terms-text">
                              We might update these terms occasionally. When we do, we'll send you a friendly heads-up.
                              No one likes surprises, except maybe in birthday parties.
                            </p>

                            <Separator></Separator>
                            
                            <span className="terms-title">Contact Us</span>
                            <p className="terms-text">
                              Got questions? Need support? Want to share your latest playlist? 
                              Contact us at support@triplefmusic.com. We love hearing from you!
                            </p>

                            <Separator></Separator>
                            
                            <p className="terms-note">
                              By clicking "I Agree," you promise to abide by these terms and maybe,
                              just maybe, discover your new favorite song.
                            </p>
                            <p className="terms-signoff">
                              Rock on,
                              <br />
                              The TripleF Music Team
                            </p>
                          </div>

                          
                        </div>
                      </ScrollView>

                      <Separator></Separator>
                      
                      <div className="terms-modal-buttons">
                        <Button onClick={closeModal} style={{marginLeft:430}}>Close</Button>
                      </div> 
                    </WindowContent>
                  </Window>
                </div>
              </div>
            </>
          )}

          {isConfirmationOpen && (
            <>
              <div className="confirmation-background">
                <div className="confirmation">
                  <Window className="confirmation-window">
                    <WindowContent>
                      <p className="success">
                      Registration successful! <br/>
                      You will be redirected to the login page.
                      </p>
                    </WindowContent>
                  </Window>
                </div>
              </div>
            </>
          )}
        </ThemeProvider>
      </div>
    </>
  );
}

export default Register;