import React, { useState } from "react";
import "./AddSong.css";

import { createGlobalStyle, ThemeProvider } from "styled-components";

import rose from "react95/dist/themes/rose"; //Thema der UI-Elemente
import { Button, Window, WindowHeader, WindowContent } from "react95";
import vaporTeal from "react95/dist/themes/vaporTeal";

function AddSong() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No selected file");
  return (
    <ThemeProvider theme={rose}>
      <Window className="parent">
        <WindowHeader className="window-title">
          <span>Add new song</span>
          <Button className="help"> ? </Button>
        </WindowHeader>

        <div className="addSongcontent">
          <ThemeProvider theme={vaporTeal}>
            <Button primary>Upload mp3-file</Button>
          </ThemeProvider>
          <div>
            <form
              action=""
              onClick={() => document.querySelector(".imageUploader").click()}
            >
              <input
                type="file"
                accept="image/*"
                className="imageUploader"
                hidden
              />
            </form>
          </div>
          <div>
            <input type="text" className="songtitle" />
          </div>
          <input type="text" className="artist" />
          <div className="Test">Playlist-Zuordnung</div>
          <div>Genre</div>
          <input type="text" className="notesLyrics" />
        </div>
      </Window>
    </ThemeProvider>
  );
}

export default AddSong;
