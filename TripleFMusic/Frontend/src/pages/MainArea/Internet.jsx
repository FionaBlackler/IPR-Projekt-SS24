import React, { useState } from 'react';
import './Internet.css';
import Draggable from 'react-draggable';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import { Button, Window, WindowHeader, WindowContent, Toolbar, Separator, TextInput } from 'react95';

import aboutIcon from '../Images/icons/recycle2.png';
import galleryIcon from '../Images/icons/gallery4.png';
import addSongIcon from '../Images/icons/addsong2.png';
import homeIcon from '../Images/icons/computer3.png';
import internetexplorerIcon from '../Images/icons/internetexplorer.png';
import SnakeGame from './SnakeGame'; // Import the SnakeGame component

const Internet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    // Implement your close logic here
  };

  const handleRetry = () => {
    // Handle retry action
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
        {/* Your icon menu here */}
      </div>
      <div className="space" />
      <ThemeProvider theme={original}>
        <div className="draggable-window-internet">
          <Draggable handle=".internetwindow-title">
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
                <Button variant="menu" size="sm" disabled>
                  Favorites
                </Button>
                <Button variant="menu" size="sm">
                  Help
                </Button>
              </Toolbar>
              <div className="separator-horizontal" />
              <WindowContent className="internet-window-content">
                <div className="flex-container">
                  <Separator style={{ margin: "10px 0" }}>
                    <span>Adresse:</span>
                    <TextInput
                      className="textinput"
                      placeholder='type address here...'
                    />
                  </Separator>
                </div>

                <div className="internet-message-container">
                  <span className='internet-text'>Unfortunately no internet connection could be established</span>
                  <div className="internet-button-container">
                    <Button className="button-retry" onClick={handleRetry}>
                      ↻ Retry
                    </Button>
                    <Button className="button-game" onClick={openModal}>
                      Let's play a game
                    </Button>
                  </div>
                </div>
              </WindowContent>
            </Window>
          </Draggable>
        </div>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="snake-overlay">
              <Draggable handle=".modal-header">
                <Window className="modal-window">
                  <WindowHeader className="modal-header">
                    <span>Snake Game</span>
                    <Button onClick={closeModal}>
                      <span className="close-icon" />
                    </Button>
                  </WindowHeader>
                  <WindowContent>
                    <SnakeGame onClose={closeModal} /> {/* Pass onClose function */}
                  </WindowContent>
                </Window>
              </Draggable>
            </div>
          </div>
        )}
      </ThemeProvider>
    </div>
  );
};

export default Internet;
