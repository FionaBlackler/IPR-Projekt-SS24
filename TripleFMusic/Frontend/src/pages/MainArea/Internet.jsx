// Internet.jsx
import React, { useState } from 'react';
import './Internet.css';
import Draggable from 'react-draggable';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import { Button, Window, WindowHeader, WindowContent, Toolbar, Separator, TextInput } from 'react95';
import SnakeGame from './SnakeGame';
import { useNavigate } from "react-router-dom";

const Internet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/welcome/home");
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
                  <span>Adresse:</span>
                  <TextInput
                    className="textinput"
                    placeholder='type address here...'
                  />
                  <Button className="button-retry" onClick={handleRetry}>
                    ↻ 
                  </Button>
                </div>
                <Separator></Separator>
                <div className="internet-message-container">
                  <span className='internet-text'>Unfortunately no internet connection could be established</span>
                  <div className="internet-button-container">
                    <Button className="button-game" onClick={openModal}>
                      Snake Me Up! 
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
  );
};

export default Internet;
