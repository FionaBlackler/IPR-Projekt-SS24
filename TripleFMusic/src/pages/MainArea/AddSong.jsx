import React, { useState } from "react";
import "./AddSong.css";

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
                <Checkbox name="allGenres" label="All"></Checkbox>
              </div>
              <div>
                <Checkbox name="genre" label="Girl Punk"></Checkbox>
                <Checkbox name="genre" label="Rock"></Checkbox>
                <Checkbox name="genre" label="Pop"></Checkbox>
                <br />
                <Checkbox name="genre" label="Blues"></Checkbox>
                <Checkbox name="genre" label="Country"></Checkbox>
                <Checkbox name="genre" label="Rap"></Checkbox>
                <br />
                <Checkbox name="genre" label="Raggae"></Checkbox>
                <Checkbox name="genre" label="Electronic/Dance"></Checkbox>
                <Checkbox name="genre" label="R&B"></Checkbox>
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
    </ThemeProvider>
  );
}

export default AddSong;
