import React, { Suspense } from "react";
import {
  Hourglass,
  Button,
  Window,
  WindowContent,
  WindowHeader,
} from "react95";
import "./Home.css";
import { ThemeProvider } from "styled-components";

import aboutIcon from "../Images/icons/recycle2.png";
import galleryIcon from "../Images/icons/gallery4.png";
import addSongIcon from "../Images/icons/addsong2.png";
import { useNavigate } from "react-router-dom";
import homeIcon from "../Images/icons/computer3.png";
import internetexplorerIcon from "../Images/icons/internetexplorer.png";

function Home() {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
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
              alt="MusicGallery"
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
      <div className="home-window-container">
        {/*<ThemeProvider theme={rose}>
          <Window className="home-window">
            <WindowHeader className="home-window-header">header</WindowHeader>
            <WindowContent className="home-window-content">
              content
            </WindowContent>
          </Window>
        </ThemeProvider>*/}
      </div>
    </div>
  );
}

export default Home;
