import React, { useState } from "react";
import "./AddSong.css";
import Draggable from 'react-draggable';

import { createGlobalStyle, ThemeProvider } from "styled-components";

import rose from "react95/dist/themes/rose"; //Thema der UI-Elemente
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
import vaporTeal from "react95/dist/themes/vaporTeal";

function AddSong() {
  return (
    <ThemeProvider theme={rose}>
      <Draggable handle=".window-title">
        <div className="draggable-window-add-song">
          <Window className="parent">
            <WindowHeader className="window-title">
              <span className="newSong">Add new song</span>
              <Button className="help"> ? </Button>
            </WindowHeader>

            <WindowContent className="addSongcontent">
              <Button primary>Upload mp3-file</Button>

              <Separator />

              <div>
                <Button primary>Upload song cover</Button>
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
                  <div>
                    <Checkbox name="genre" label="Girl Punk" />
                    <Checkbox name="genre" label="Rock" />
                    <Checkbox name="genre" label="Pop" />
                    <br />
                    <Checkbox name="genre" label="Blues" />
                    <Checkbox name="genre" label="Country" />
                    <Checkbox name="genre" label="Rap" />
                    <br />
                    <Checkbox name="genre" label="Reggae" />
                    <Checkbox name="genre" label="Electronic/Dance" />
                    <Checkbox name="genre" label="R&B" />
                    <br />
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
              </div>
            </WindowContent>
          </Window>
        </div>
      </Draggable>
    </ThemeProvider>
  );
}

export default AddSong;
