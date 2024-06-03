import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Window, WindowHeader, WindowContent, Panel, Cutout, Button, Tooltip } from 'react95';
import rose from 'react95/dist/themes/rose';
import './About.css';

const About = () => {
  return (
    <ThemeProvider theme={rose}>
      <div className="about-container">
        <Window className="window">
          <WindowHeader className="window-header">
            <span>About TripleF Music</span>
          </WindowHeader>
          <WindowContent>
            <Panel variant="well" className="about-section">
              <h2 className="section-header">About us</h2>
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
              <h2 className="section-header">Our vision and goal</h2>
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
              <h2 className="section-header">Our Team</h2>
              <Cutout className="cutout">
                <div className="team-container">
                  <div className="team-member">
                    <img src="/Fatima.png" alt="Fatima" />
                    <p>Fatima</p>
                  </div>
                  <div className="team-member">
                    <img src="/Funda.png" alt="Funda" />
                    <p>Funda</p>
                  </div>
                  <div className="team-member">
                    <img src="/Fiona.png" alt="Fiona" />
                    <p>Fiona</p>
                  </div>
                </div>
              </Cutout>
            </Panel>

            <Panel variant="well" className="about-section">
              <h2 className="section-header">Our motivation</h2>
              <Cutout className="cutout">
          <Tooltip text='Lets tackle this module like its a piñata filled with passing grades – swing hard and aim for success! 🤷' enterDelay={100} leaveDelay={200} position='top'>
                 <div className='matze'>
                  <Button>Matze</Button>
                </div>
              </Tooltip>
            </Cutout>
          </Panel>

            <Panel variant="well" className="about-section">
              <h2 className="section-header">Contact</h2>
              <Cutout className="cutout">
                <p>Email: info@triplefmusic.de</p>
                <p>Telefon: +49 171 56920382</p>
              </Cutout>
            </Panel>
          </WindowContent>
        </Window>
      </div>
    </ThemeProvider>
  );
}

export default About;
