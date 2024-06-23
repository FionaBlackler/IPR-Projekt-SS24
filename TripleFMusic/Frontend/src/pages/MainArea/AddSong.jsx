import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
import Draggable from "react-draggable";
import { ThemeProvider } from "styled-components";
import def from "react95/dist/themes/original";
import "./AddSong.css";
import aboutIcon from "../Images/icons/recycle2.png";
import galleryIcon from "../Images/icons/gallery4.png";
import addSongIcon from "../Images/icons/addsong2.png";
import homeIcon from "../Images/icons/computer3.png";
import internetexplorerIcon from "../Images/icons/internetexplorer.png";

function AddSong() {
  const navigate = useNavigate();

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const [mp3File, setMp3File] = useState(null);
  const [jpgFile, setJpgFile] = useState(null);
  const [songTitle, setSongTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [notes, setNotes] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [allPlaylistsChecked, setAllPlaylistsChecked] = useState(false);
  const [allGenresChecked, setAllGenresChecked] = useState(false);
  const [mp3FilePath, setMp3FilePath] = useState("");
  const [jpgFilePath, setJpgFilePath] = useState("");
  const mp3InputRef = useRef(null);
  const jpgInputRef = useRef(null);

  const handleMp3Upload = (e) => {
    const file = e.target.files[0];
    setMp3File(file);
    setMp3FilePath(file.name);
  };

  const triggerMp3Upload = () => {
    mp3InputRef.current.click();
  };

  const handleJpgUpload = (e) => {
    const file = e.target.files[0];
    setJpgFile(file);
    setJpgFilePath(file.name);
  };

  const triggerJpgUpload = () => {
    jpgInputRef.current.click();
  };

  const addNewSong = async () => {
    const formData = new FormData();
    formData.append("mp3File", mp3File);
    formData.append("jpgFile", jpgFile);
    formData.append("songTitle", songTitle);
    formData.append("artist", artist);
    formData.append("selectedPlaylists", JSON.stringify(selectedPlaylists));
    formData.append("selectedGenres", JSON.stringify(selectedGenres));
    formData.append("notes", notes);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/songs",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload successful");
      alert("Upload successful");
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed");
    }
  };

  const handlePlaylistChange = (playlistId) => {
    setSelectedPlaylists((prevSelected) =>
      prevSelected.includes(playlistId)
        ? prevSelected.filter((id) => id !== playlistId)
        : [...prevSelected, playlistId]
    );
  };

  const handleAllGenresChange = () => {
    if (allGenresChecked) {
      setSelectedGenres([]);
    } else {
      setSelectedGenres([
        "Girl Punk",
        "Rock",
        "Pop",
        "Blues",
        "Country",
        "Rap",
        "Reggae",
        "EDM",
        "Classic",
      ]);
    }
    setAllGenresChecked(!allGenresChecked);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenres((prevSelected) =>
      prevSelected.includes(genre)
        ? prevSelected.filter((item) => item !== genre)
        : [...prevSelected, genre]
    );
  };

  const handleAllPlaylistsChange = () => {
    if (allPlaylistsChecked) {
      setSelectedPlaylists([]);
    } else {
      setSelectedPlaylists(playlists.map((playlist) => playlist.id));
    }
    setAllPlaylistsChecked(!allPlaylistsChecked);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/playlists")
      .then((response) => response.json())
      .then((data) => setPlaylists(data))
      .catch((error) => console.error("Error fetching playlists:", error));
  }, []);

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
        <Draggable defaultPosition={{ x: 250, y: 0 }}>
          <div className="draggable-window-add-song">
            <div className="space-2" />
            <div className="add-song-space">
              <Window className="add-song-window">
                <WindowHeader className="window-title">
                  <span className="newSong">Add new song</span>
                  <Button
                    style={{ margin: "0.2rem" }}
                    onClick={() => {
                      navigate("/welcome/home");
                    }}
                  >
                    <span className="add-song-close-icon" />
                  </Button>
                </WindowHeader>

                <WindowContent className="add-song-window-content">
                  <div style={{ display: "flex", gap: "13rem" }}>
                    <div style={{ display: "flex" }}>
                      <Button
                        primary
                        className="mp3-button"
                        onClick={triggerMp3Upload}
                      >
                        Upload mp3 file
                        <input
                          ref={mp3InputRef}
                          type="file"
                          accept=".mp3"
                          style={{
                            position: "absolute",
                            opacity: 0,
                            cursor: "pointer",
                          }}
                          onChange={handleMp3Upload}
                        />
                      </Button>
                      <p style={{ marginTop: "1.15rem", marginLeft: "2rem" }}>
                        {mp3FilePath
                          ? truncateText(mp3FilePath, 17)
                          : "No file uploaded"}
                      </p>
                    </div>

                    <div style={{ display: "flex" }}>
                      <Button
                        primary
                        className="cover-button"
                        onClick={triggerJpgUpload}
                      >
                        Upload song cover
                        <input
                          ref={jpgInputRef}
                          type="file"
                          accept=".jpg"
                          style={{
                            position: "absolute",
                            opacity: 0,
                            cursor: "pointer",
                          }}
                          onChange={handleJpgUpload}
                        />
                      </Button>
                      <p style={{ marginTop: "1.15rem", marginLeft: "1rem" }}>
                        {jpgFilePath
                          ? truncateText(jpgFilePath, 17)
                          : "No .jpg-file uploaded"}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div
                    className="song-title"
                    style={{ display: "flex", gap: "3rem" }}
                  >
                    <TextInput
                      className="input-field-title"
                      placeholder="Add song title"
                      fullWidth
                      value={songTitle}
                      onChange={(e) => setSongTitle(e.target.value)}
                    />
                    <TextInput
                      className="input-field-artist"
                      placeholder="Add artist name"
                      fullWidth
                      value={artist}
                      onChange={(e) => setArtist(e.target.value)}
                    />
                  </div>

                  <Separator />
                  <div style={{ height: "1rem" }}></div>

                  <div>
                    Add to playlist
                    <div style={{ height: "0.5rem" }}></div>
                    <ScrollView
                      className="notes-scroll"
                      style={{ width: "100%" }}
                    >
                      <div>
                        <div>
                          <Checkbox
                            name="allPlaylists"
                            label="All"
                            checked={allPlaylistsChecked}
                            onChange={handleAllPlaylistsChange}
                          />
                        </div>
                        {playlists.map((playlist, index) => (
                          <div key={index}>
                            <Checkbox
                              name={`playlist-${index}`}
                              label={playlist.name}
                              checked={selectedPlaylists.includes(playlist.id)}
                              onChange={() => handlePlaylistChange(playlist.id)}
                            />
                          </div>
                        ))}
                      </div>
                    </ScrollView>
                  </div>

                  <div style={{ height: "1rem" }}></div>

                  <GroupBox label="Genre">
                    <div>
                      <Checkbox
                        name="allGenres"
                        label="All"
                        checked={allGenresChecked}
                        onChange={handleAllGenresChange}
                      />
                    </div>
                    <div className="other-genres">
                      {[
                        "Girl Punk",
                        "Rock",
                        "Pop",
                        "Blues",
                        "Country",
                        "Rap",
                        "Reggae",
                        "EDM",
                        "Classic",
                      ].map((genre, index) => (
                        <Checkbox
                          key={index}
                          className={genre.toLowerCase().replace(" ", "-")}
                          name="genre"
                          label={genre}
                          checked={selectedGenres.includes(genre)}
                          onChange={() => handleGenreChange(genre)}
                        />
                      ))}
                    </div>
                  </GroupBox>

                  <div className="notes">
                    <ScrollView className="notes-scroll" fullWidth>
                      <TextInput
                        className="input-field-notes"
                        placeholder="Add other notes or lyrics here"
                        multiline
                        fullWidth
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </ScrollView>
                    <div className="save-cancel">
                      <Button onClick={addNewSong}>Save</Button>
                      <Button
                        onClick={() => {
                          navigate("/welcome/home");
                        }}
                      >
                        Cancel
                      </Button>
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
