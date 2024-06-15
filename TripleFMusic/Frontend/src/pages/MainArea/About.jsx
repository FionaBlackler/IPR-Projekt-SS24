import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Window, WindowHeader, WindowContent, Panel, Cutout, Button, Tooltip, ScrollView } from 'react95';
import original from 'react95/dist/themes/original';
import './About.css';
import Fatima from '../Images/Fatima.png';
import Funda from '../Images/Funda.png';
import Fiona from '../Images/Fiona.png';
import Draggable from 'react-draggable';

function About() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/welcome/home');
  };

  return (
    <ThemeProvider theme={original}>
      <Draggable handle=".about-window-header">
        <div className="draggable-aboutWindow">
          <Window className="about-window">
            <WindowHeader className="about-window-header">
              <span>About TripleF Music</span>
              <Button onClick={handleClose}>
                <span className="about-close-icon" />
              </Button>
            </WindowHeader>
            <WindowContent className="about-window-content">
              <ScrollView>
                <div className="about-wrapper">
                  <div className="about">
                    <Panel variant="well" className="about-section">
                      <h2 className="section-header">ABOUT US!</h2>
                      <Cutout className="cutout">
                        <p>Welcome to TripleF Music! 
                          We are a passionate team of three students from HFT Stuttgart, 
                          dedicated to bringing you a unique and engaging music experience. 
                          Our journey began with a shared love for music and technology, 
                          driving us to create a platform where users can explore, discover, 
                          and enjoy music in an oldschool and exciting way. Join us on our journey 
                          to revolutionize the way you experience music.</p>
                      </Cutout>
                    </Panel>
                    <Panel variant="well" className="about-section">
                      <h2 className="section-header">OUR VISION AND GOAL</h2>
                      <Cutout className="cutout">
                        <p>We aim to bring back the old-school nostalgia, 
                          giving users a delightful time-travel experience to the days when life was 
                          simpler and music had that special charm. Our main goal? Well, it's to pass 
                          our module, to be honest! But hey, a bit of creativity and fun never hurt anyone, 
                          right? We're here to combine our passion for retro vibes with modern technology, 
                          crafting a unique platform that makes discovering and enjoying music feel like a 
                          nostalgic adventure. Join us on this whimsical journey as we blend the best of the 
                          past with the present!</p>
                      </Cutout>
                    </Panel>
                    <Panel variant="well" className="about-section">
                      <h2 className="section-header">OUR TEAM</h2>
                      <Cutout className="cutout">
                        <div className="team-container">
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
                        </div>
                      </Cutout>
                    </Panel>
                    <Panel variant="well" className="about-section">
                      <h2 className="section-header">OUR MOTIVATION</h2>
                      <Cutout className="cutout">
                        <Tooltip text="Lets tackle this module like its a piñata filled with passing grades – swing hard and aim for success! 🤷" enterDelay={100} leaveDelay={200} position="top">
                          <div className="matze">
                            <Button>Matze</Button>
                          </div>
                        </Tooltip>
                      </Cutout>
                    </Panel>
                    <Panel variant="well" className="about-section">
                      <h2 className="section-header">CONTACT</h2>
                      <Cutout className="cutout">
                        <p>Email: info@triplefmusic.de</p>
                        <p>Telefon: +49 171 56920382</p>
                      </Cutout>
                    </Panel>
                  </div>
                </div>
              </ScrollView>
            </WindowContent>
          </Window>
        </div>
      </Draggable>
    </ThemeProvider>
  );
}

export default About;