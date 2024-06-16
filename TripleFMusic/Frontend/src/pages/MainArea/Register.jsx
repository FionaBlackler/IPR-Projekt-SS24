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

function Register() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAndConditions, settermsAndConditions] = useState(false);
  const [username, setUsername] = useState("");

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

  const handleRegister = () => {
    navigate("/login");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
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
    <div className="termsBackground">
      <div className="terms-modal">
        <Window className="terms-modal-window">
          <WindowHeader className="terms-window-header">
            <span>Terms and Conditions</span>
            <Button onClick={closeModal}>
              <span className="register-close-icon" />
            </Button>
          </WindowHeader>
         
          <WindowContent>
        <ScrollView className="notes-scroll" style={{ width: "555px" }}>
          <div>
            <span style={{textAlign: "center", fontSize: '17px',display: "block", fontWeight: "bolder" }}> 
             Welcome to TripleF Music!
            </span> 

           <span className="terms-text">
              Before you dive into our world of melodious wonders, 
              we need you to read and agree to the following terms and conditions. But don't worry, 
              we promise to keep it light and fun.
           </span>
            <Separator></Separator>
            <span className="terms-title">Acceptance of Terms</span>
            <span className="terms-text">
              By using our services, you agree to these terms. If you don't agree,
              you can still hum your favorite tunes, but you can't use our app. Sorry, not sorry!
            </span>
            <Separator></Separator>
              <span className="terms-title">
                User Conduct
              </span>
              <span className="terms-text">
                Be nice. No spamming, trolling, or using our platform to spread bad vibes.
                We're all about good music and good times here.
              </span>
              <Separator></Separator>
              <span className="terms-title">
                Account
              </span>
              <span className="terms-text">
                Keep your password a secret. Sharing your password is like sharing your toothbrush 
                – just don't do it.
              </span>
              <Separator></Separator>
              <span className="terms-title">
                Content Ownership
              </span>
              <span className="terms-text">
                Your music, your rules. You own the content you upload, but you give us permission 
                to share your beats with the world. We promise not to take credit for your killer 
                basslines.
              </span>
              <Separator></Separator>
              <span className="terms-title">
                License to Use
              </span>
              <span className="terms-text">
                We grant you a non-transferable, non-exclusive license to use our app.
                Basically, you can't sell our app on the black market.
              </span>
              <Separator></Separator>
              <span className="terms-title">
                Termination
              </span>
              <span className="terms-text">
                If you break the rules, we might have to show you the door. 
                But we'll do it gently, like a polite bouncer.
              </span>
              <Separator></Separator>
              <span className="terms-title">
                Privacy
              </span>
              <span className="terms-text">
                We care about your privacy almost as much as we care about our playlists. 
                Check out our Privacy Policy to see how we protect your data.
              </span>
              <Separator></Separator>
              <span className="terms-title">
                Limitation of Liability
              </span>
              <span className="terms-text">
                We strive to keep our app glitch-free, but if something goes wrong, 
                please don't throw your phone. 
                We're not responsible for any damages, including your shattered screen.
              </span>
              <Separator></Separator>
              <span className="terms-title">
                Governing Law
              </span>
              <span className="terms-text">
                These terms are governed by the laws of the Internet – just kidding.
                They are governed by the laws of the jurisdiction where our headquarters are located.
              </span>
              <Separator></Separator>
              <span className="terms-title">
                Changes to Terms
              </span>
              <span className="terms-text">
                We might update these terms occasionally. When we do, we'll send you a friendly heads-up.
                No one likes surprises, except maybe in birthday parties.
              </span>
              <Separator></Separator>
              <span className="terms-title">
                Contact Us
              </span>
              <span className="terms-text">
                Got questions? Need support? Want to share your latest playlist? 
                Contact us at support@triplefmusic.com. We love hearing from you!
              </span>
              <Separator></Separator>
              <span style={{textAlign: "center", fontSize: '10px',display: "block"  }}>
                By clicking "I Agree," you promise to abide by these terms and maybe,
                just maybe, discover your new favorite song.
              </span>
              <Separator></Separator>
              <span style={{ display: "block", textAlign: "center", fontSize: '17px'}}>
              Rock on,
              <br />
              The TripleF Music Team
              </span>
 
 
          </div> 
        </ScrollView>
        <div className="terms-modal-buttons">
            <Button onClick={closeModal}>Close</Button>
          </div> 
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

/**
 * 
 *         
            <div>
                         
              </div>
              </ScrollView>
 */