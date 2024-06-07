import React from "react";
import "./Internet.css";
import Draggable from "react-draggable";
import { ThemeProvider } from "styled-components";
import def from "react95/dist/themes/millenium";

import {
  Button,
  Window,
  WindowHeader,
  WindowContent,
  Toolbar
} from "react95";

import aboutIcon from "../Images/icons/recycle2.png";
import galleryIcon from "../Images/icons/gallery4.png";
import addSongIcon from "../Images/icons/addsong2.png";
import homeIcon from "../Images/icons/computer3.png";
import internetexplorerIcon from "../Images/icons/internetexplorer.png";
import { useNavigate } from "react-router-dom";

function Internet() {
  const navigate = useNavigate();

  return (
    <div className="internet-body">
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
      <ThemeProvider theme={def}>
        <div className="draggable-window-internet">
          <Draggable handle=".internetwindow-title">
            <Window className="internet-window">
              <WindowHeader className="internetwindow-title">
                <span>Microsoft Internet Explorer - [No Document]</span>

                <Button
                  size={"sm"}
                  onClick={() => alert("Close button clicked")}
                >
                  X
                </Button>
              </WindowHeader>
              <Toolbar>
                <Button variant='menu' size='sm'>
                  File
                </Button>
                <Button variant='menu' size='sm'>
                  Edit
                </Button>
                <Button variant='menu' size='sm'>
                  View
                </Button>
                <Button variant='menu' size='sm' disabled>
                  Favorites
                </Button>
                <Button variant='menu' size='sm'>
                  Help
                </Button>
              </Toolbar>
              <div className="separator-horizontal" />
              <WindowContent className="internet-window-content">
                  <div className="address-bar">
                    <span>Adresse:</span>
                    <input type="text" className="address-input" />
                  </div>
                  
                  <div className="separator-horizontal" />
                  <div className="text-internet">
                    Unfortunately no internet connection can be established
                  </div>
              </WindowContent>
            </Window>
          </Draggable>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default Internet;
