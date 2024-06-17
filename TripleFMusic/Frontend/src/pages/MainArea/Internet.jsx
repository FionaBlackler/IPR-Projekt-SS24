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
    <div>
      <div className="home-body">
        <div className="icons-menu">
          <div style={{ height: "3rem" }} />

          <div>
            <a
              onClick={() => {
                navigate("/welcome/about");
              }}
              className="icon"
            >
              <img src={aboutIcon} alt="About" style={{ marginRight: 4 }} />
              <span>About</span>
            </a>
          </div>

          <div className="buffer"></div>

          <div>
            <a
              onClick={() => {
                navigate("/welcome/home");
              }}
              className="icon"
            >
              <img src={homeIcon} alt="home" style={{ marginRight: 4 }} />
              <span>Home</span>
            </a>
          </div>

          <div className="buffer"></div>

          <div>
            <a
              onClick={() => {
                navigate("/welcome/musicgallery");
              }}
              className="icon"
            >
              <img
                src={galleryIcon}
                alt="Music Gallery"
                style={{ marginRight: 4 }}
              />
              <span>Music Gallery</span>
            </a>
          </div>

          <div className="buffer"></div>

          <div>
            <a
              onClick={() => {
                navigate("/welcome/addsong");
              }}
              className="icon"
            >
              <img src={addSongIcon} alt="addsong" style={{ marginRight: 4 }} />
              <span>Upload new song</span>
            </a>
          </div>

          <div className="buffer"></div>

          <div>
            <a
              onClick={() => {
                navigate("/welcome/internet");
              }}
              className="icon"
            >
              <img
                src={internetexplorerIcon}
                alt="internetexplorer"
                style={{ marginRight: 4 }}
              />
              <span>Internet Explorer</span>
            </a>
          </div>
        </div>

        <div className="space" />
      
        <div className="internet-body">
          <ThemeProvider theme={original}>
            <div className="draggable-window-internet">
              <Draggable handle=".internetwindow-title">
                <Window className="internet-window">
                  <WindowHeader className="internet-window-header">
                    <span className="internetwindow-title">Microsoft Internet Explorer - [No Document]</span>
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
                    <Button variant="menu" size="sm">
                      Favorites
                    </Button>
                    <Button variant="menu" size="sm">
                      Help
                    </Button>
                  </Toolbar>

                  <div className="separator-horizontal" />

                  <WindowContent className="internet-window-content">
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
                          Play Snake!
                        </Button>
                      </div>
                    </div>

                    {isModalOpen && (
                      <div className="snakeBackground">
                        <div className="snake-modal">
                          <Window className="snake-modal-window" style={{ width: '320px', height: '370px' }}>
                            <WindowHeader className="snake-window-header">
                              <span>Snake Game</span>
                              <Button onClick={closeModal}>
                                <span className="internet-close-icon" />
                              </Button>
                            </WindowHeader>
                            <WindowContent>
                              <SnakeGame />
                            </WindowContent>
                          </Window>
                        </div>
                      </div>
                    )}
                  </WindowContent>
                </Window>
              </Draggable>
            </div>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default Internet;
