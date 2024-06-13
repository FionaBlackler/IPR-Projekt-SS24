import React, { useState } from "react";
import "./AddSong.css";
import Draggable from "react-draggable";

import { createGlobalStyle, ThemeProvider } from "styled-components";

import rose from "react95/dist/themes/rose"; //Thema der UI-Elemente
import def from "react95/dist/themes/original"; //Thema der UI-Elemente

import {
  Button,
  Window,
  WindowHeader,
  WindowContent,
  Separator,
  TextInput,
  ScrollView,
  GroupBox,
  Checkbox,
} from "react95";
import aboutIcon from "../Images/icons/recycle2.png";
import galleryIcon from "../Images/icons/gallery4.png";
import addSongIcon from "../Images/icons/addsong2.png";
import { useNavigate } from "react-router-dom";
import homeIcon from "../Images/icons/computer3.png";

function AddSong() {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="addsong-body">
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
      </div>
      <div className="space" />
      <ThemeProvider theme={def}>
        <Draggable>
          <div className="draggable-window-add-song">
            <div className="space-2" />
            <div className="add-song-space">
              <Window className="add-song-window">
                <WindowHeader className="window-title">
                  <span className="newSong">Add new song</span>
                  <Button className="help"> x </Button>
                </WindowHeader>

                <WindowContent className="add-song-window-content">
                  <Button primary className="mp3-button">
                    Upload mp3-file
                  </Button>

                  <Separator />

                  <div>
                    <Button primary className="cover-button">
                      Upload song cover
                    </Button>
                  </div>

                  <Separator />

                  <div className="song-title">
                    <TextInput
                      className="input-field-title"
                      placeholder="Add song title"
                      fullWidth
                    />
                  </div>

                  <Separator />

                  <div className="Test">Playlist-Zuordnung</div>

                  <GroupBox label="Genre">
                    <ScrollView>
                      <div>
                        <Checkbox name="allGenres" label="All" />
                      </div>
                      <div className="other-genres">
                        <Checkbox
                          className="girlpunk"
                          name="genre"
                          label="Girl Punk"
                        />
                        <Checkbox className="rock" name="genre" label="Rock" />
                        <Checkbox className="pop" name="genre" label="Pop" />

                        <Checkbox name="genre" label="Blues" />
                        <Checkbox name="genre" label="Country" />
                        <Checkbox name="genre" label="Rap" />

                        <Checkbox name="genre" label="Reggae" />
                        <Checkbox name="genre" label="EDM" />
                        <Checkbox name="genre" label="R&B" />
                      </div>
                    </ScrollView>
                  </GroupBox>

                  <div className="notes">
                    <ScrollView className="notes-scroll" fullWidth>
                      <TextInput
                        className="input-field-notes"
                        placeholder="Add other notes or lyrics here"
                        multiline
                        fullWidth
                      />
                    </ScrollView>
                    <div className="save-cancle">
                      <Button>Save</Button>
                      <Button>Cancle</Button>
                    </div>
                  </div>
                </WindowContent>
              </Window>
            </div>
          </div>
        </Draggable>
      </ThemeProvider>
    </div>
  );
}

export default AddSong;
