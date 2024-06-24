import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Window, WindowHeader, WindowContent, Panel, Cutout, Button, ScrollView } from 'react95';
import original from 'react95/dist/themes/original';
import './About.css';
import Fatima from '../Images/Fatima.png';
import Funda from '../Images/Funda.png';
import Fiona from '../Images/Fiona.png';
import Draggable from 'react-draggable';

import aboutIcon from "../Images/icons/recycle2.png";
import galleryIcon from "../Images/icons/gallery4.png";
import addSongIcon from "../Images/icons/addsong2.png";
import homeIcon from "../Images/icons/computer3.png";
import internetexplorerIcon from "../Images/icons/internetexplorer.png";

function About() {
  const navigate = useNavigate();
  const [showTooltipText, setShowTooltipText] = useState(false);

  const handleClose = () => {
    navigate('/welcome/home');
  };

  return (
    <div className="about-body">
      <div className="icons-menu">
        <div style={{ height: "3rem" }} />
        <div className="icon">
          <img src={aboutIcon} alt="About" onClick={() => navigate("/welcome/about")} />
          <span>About</span>
        </div>
        <div className="buffer" />
        <div className="icon">
          <img src={homeIcon} alt="Home" onClick={() => navigate("/welcome/home")} />
          <span>Home</span>
        </div>
        <div className="buffer" />
        <div className="icon">
          <img src={galleryIcon} alt="Music Gallery" onClick={() => navigate("/welcome/musicgallery")} />
          <span>Music Gallery</span>
        </div>
        <div className="buffer" />
        <div className="icon">
          <img src={addSongIcon} alt="Upload new song" onClick={() => navigate("/welcome/addsong")} />
          <span>Upload new song</span>
        </div>
        <div className="buffer" />
        <div className="icon">
          <img src={internetexplorerIcon} alt="Internet Explorer" onClick={() => navigate("/welcome/internet")} />
          <span>Internet Explorer</span>
        </div>
      </div>
      <div className="space" />
      <ThemeProvider theme={original}>
        <Draggable handle=".about-window-header" defaultPosition={{ x: 420, y: 0 }}>
          <div className="draggable-aboutWindow">
            <Window className="about-window">
              <WindowHeader className="about-window-header">
                <span>About TripleF Music</span>
                <Button onClick={handleClose}>
                  <span className="about-close-icon" />
                </Button>
              </WindowHeader>
              <WindowContent className="about-window-content">
                <ScrollView style={{ height: 550 }}>
                  <div className="about-wrapper">
                    <Panel variant="well" className="about-section">
                      <h2 className="about-header">About us!</h2>
                      <Cutout className="about-text">
                        <p>Welcome to TripleF Music! We are a passionate team of three students from HFT Stuttgart, dedicated to bringing you a unique and engaging music experience. Our journey began with a shared love for music and technology, driving us to create a platform where users can explore, discover, and enjoy music in an oldschool and exciting way. Join us on our journey to revolutionize the way you experience music.</p>
                      </Cutout>
                    </Panel>
                    <Panel variant="well" className="about-section">
                      <h2 className="about-header">Our vision and goal</h2>
                      <Cutout className="about-text">
                        <p>We aim to bring back the old-school nostalgia, giving users a delightful time-travel experience to the days when life was simpler and music had that special charm. Our main goal? Well, it's to pass our module, to be honest! But hey, a bit of creativity and fun never hurt anyone, right? We're here to combine our passion for retro vibes with modern technology, crafting a unique platform that makes discovering and enjoying music feel like a nostalgic adventure. Join us on this whimsical journey as we blend the best of the past with the present!</p>
                      </Cutout>
                    </Panel>
                    <Panel variant="well" className="about-section">
                      <h2 className="about-header">Our team</h2>
                      <Cutout className="team-cutout">
                        <div className="team-member">
                          <img src={Fatima} alt="Fatima" />
                          <p>Fatima</p>
                        </div>
                        <div className="team-member">
                          <img src={Funda} alt="Funda" />
                          <p>Funda</p>
                        </div>
                        <div className="team-member">
                          <img src={Fiona} alt="Fiona" />
                          <p>Fiona</p>
                        </div>
                      </Cutout>
                    </Panel>
                    <Panel variant="well" className="about-section">
                      <h2 className="about-header">Our motivation</h2>
                      <Cutout>
                      {showTooltipText && (
                        <div className="tooltip-text">
                          <p>Lets tackle this module like its a piñata filled with passing grades – swing hard and aim for success!</p>
                        </div>
                      )}
                      <div className="tooltip-button" onClick={() => setShowTooltipText(!showTooltipText)}>
                        <Button>Matze</Button>
                      </div>
                      </Cutout>
                      </Panel>

                    <Panel variant="well" className="about-section">
                      <h2 className="about-header">Contact</h2>
                      <Cutout className="contact-cutout">
                        <p>Email: info@triplefmusic.de</p>
                        <p>Telefon: +49 171 56920382</p>
                      </Cutout>
                    </Panel>
                  </div>
                </ScrollView>
              </WindowContent>
            </Window>
          </div>
        </Draggable>
      </ThemeProvider>
    </div>
  );
}

export default About;
