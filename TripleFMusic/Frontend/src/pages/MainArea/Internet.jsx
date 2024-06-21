import React, { useState } from 'react';
import './Internet.css';
import Draggable from 'react-draggable';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import { Button, Window, WindowHeader, WindowContent, Toolbar, Separator, TextInput } from 'react95';
import SnakeGame from './SnakeGame';
import { useNavigate } from "react-router-dom";

import aboutIcon from "../Images/icons/recycle2.png";
import galleryIcon from "../Images/icons/gallery4.png";
import addSongIcon from "../Images/icons/addsong2.png";
import homeIcon from "../Images/icons/computer3.png";
import internetexplorerIcon from "../Images/icons/internetexplorer.png";

const Internet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/welcome/home");
  };

  const handleRetry = () => {
    alert("still no connection...");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="internet-body">
      <div className="icons-menu">
        <div style={{ height: "3rem" }} />
        
        <div>
          <a onClick={() => {navigate("/welcome/about");}}className="icon">
          <img src={aboutIcon} alt="About" style={{ marginRight: 4 }} />
            <span>About</span>
          </a>
        </div>
  
        <div className="buffer"></div>
  
        <div>
          <a onClick={() => {navigate("/welcome/home");}} className="icon">
          <img src={homeIcon} alt="home" style={{ marginRight: 4 }} />
            <span>Home</span>
          </a>
        </div>
  
        <div className="buffer"></div>
  
        <div>
          <a onClick={() => {navigate("/welcome/musicgallery");}} className="icon">
            <img src={galleryIcon} alt="Music Gallery" style={{ marginRight: 4 }}/>
              <span>Music Gallery</span>
          </a>
        </div>
  
        <div className="buffer"></div>
  
        <div>
          <a onClick={() => {navigate("/welcome/addsong");}} className="icon">
            <img src={addSongIcon} alt="addsong" style={{ marginRight: 4 }} />
              <span>Upload new song</span>
          </a>
        </div>
  
        <div className="buffer"></div>
  
        <div>
          <a onClick={() => {navigate("/welcome/internet");}} className="icon">
            <img src={internetexplorerIcon} alt="internetexplorer" style={{ marginRight: 4 }}/>
              <span>Internet Explorer</span>
          </a>
        </div>
      </div>

      <div className="space" />
        
      <ThemeProvider theme={original}>
        <Draggable 
          handle=".internet-window-header" 
          defaultPosition={{ x: 100, y: 50 }}
        >
        <div className="draggable-window-internet">
          <Window className="internet-window">
            <WindowHeader className="internet-window-header">
              <span>Microsoft Internet Explorer - [No Document]</span>
              <Button onClick={handleClose}>
                <span className="internet-close-icon" />
              </Button>
            </WindowHeader>
            <Toolbar>
              <Button variant="menu" size="sm">
                File
              </Button>
              <Button variant="menu" size="sm">
                Edit
              </Button>
              <Button variant="menu" size="sm">
                View
              </Button>
              <Button disabled variant="menu" size="sm">
                Favorites
              </Button>
              <Button variant="menu" size="sm">
                Help
              </Button>
            </Toolbar>
            <div className="separator-horizontal" />
            
    
            <WindowContent className="internet-container">
                <div className="address-input-container">
                  <span>Address:</span>
                  <TextInput
                    className="textinput"
                    placeholder='Type address here...'
                  />
                  <Button className="button-retry" onClick={handleRetry}>
                    ↻ 
                  </Button>
                </div>

                <Separator />

                <div className="internet-message-container">
                  <span className='internet-text'>Unfortunately no internet connection could be established.</span>
                    <div className="internet-button-container">
                      <Button className="button-game" onClick={openModal}>
                        Snake me up!
                      </Button>
                    </div>
                </div>
            </WindowContent>
            
            
          </Window>
        </div>
        </Draggable>
  
        {isModalOpen && (
        <>
          <div className="game-background" />
            <Draggable handle=".game-window-header">
              <div className="game-modal">
                <Window className="game-modal-window">
                  <WindowHeader className="game-window-header">
                    <span>Play with Snaki</span>
                    <Button onClick={closeModal}>
                    <span className="internet-close-icon" />
                    </Button>
                  </WindowHeader>
                  <WindowContent>
                    <SnakeGame />
                  </WindowContent>
                </Window>
              </div>
            </Draggable>
          </>
        )}
  
      </ThemeProvider>
    </div> );
};

export default Internet;
