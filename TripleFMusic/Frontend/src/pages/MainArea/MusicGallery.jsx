import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PlaylistContent from "./PlaylistContent";
import Draggable from "react-draggable";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import {
  Window,
  WindowHeader,
  WindowContent,
  Button as BaseButton,
  Separator,
  Frame as BaseFrame,
  TextInput,
} from "react95";
import axios from "axios";
import original from "react95/dist/themes/original";
import "./MusicGallery.css";
import aboutIcon from "../Images/icons/recycle2.png";
import galleryIcon from "../Images/icons/gallery4.png";
import addSongIcon from "../Images/icons/addsong2.png";
import homeIcon from "../Images/icons/computer3.png";
import internetexplorerIcon from "../Images/icons/internetexplorer.png";

// Styled-components with transient props
const Button = styled(BaseButton)`
  /* Custom styles here */
`;

const Frame = styled(BaseFrame)`
  /* Custom styles here */
`;

function MusicGallery() {
  const navigate = useNavigate();
  const contextMenuRef = useRef(null);

  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    playlistId: null,
  });
  const [currentSong, setCurrentSong] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const response = await axios.get("http://localhost:8080/api/playlists");
        if (Array.isArray(response.data)) {
          setPlaylists(response.data);
        } else {
          console.error("Fetched data is not an array", response.data);
        }
      } catch (error) {
        console.error("Error fetching playlists", error);
      }
    }
    fetchPlaylists();
  }, []);

  const fetchSongsForPlaylist = async (playlistId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/playlists/${playlistId}/songs`);
      setSongs(response.data);
    } catch (error) {
      console.error("Error fetching songs for playlist", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target)
      ) {
        closeContextMenu();
      }
    };

    if (contextMenu.visible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contextMenu.visible]);

  const selectPlaylist = (playlist, event) => {
    if (event.ctrlKey) {
      if (selectedPlaylists.includes(playlist)) {
        setSelectedPlaylists(selectedPlaylists.filter((p) => p !== playlist));
      } else {
        setSelectedPlaylists([...selectedPlaylists, playlist]);
      }
    } else {
      setSelectedPlaylists([playlist]);
      fetchSongsForPlaylist(playlist.id);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewPlaylistName("");
  };

  const handleNewPlaylistNameChange = (e) => {
    setNewPlaylistName(e.target.value);
  };

  const addNewPlaylist = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/playlists", {
        name: newPlaylistName,
      });
      setPlaylists([...playlists, response.data]);
      closeModal();
    } catch (error) {
      console.error("Error adding new playlist:", error);

      if (error.response) {
        if (error.response.status === 400) {
          alert("Playlist name must be unique");
        } else {
          alert(`An error occurred: ${error.response.data.message}`);
        }
      } else {
        alert(
          "An error occurred while creating the playlist. Please check the console for details."
        );
      }
    }
  };

  const handleRightClick = (e, playlist) => {
    e.preventDefault();
    if (!selectedPlaylists.includes(playlist)) {
      setSelectedPlaylists([playlist]);
    }
    setContextMenu({
      visible: true,
      x: e.pageX,
      y: e.pageY,
      playlistId: playlist.id,
    });
  };

  const deletePlaylists = async () => {
    try {
      await Promise.all(
        selectedPlaylists.map(async (playlist) => {
          await axios.delete(
            `http://localhost:8080/api/playlists/${playlist.id}`
          );
        })
      );
      setPlaylists(
        playlists.filter((playlist) => !selectedPlaylists.includes(playlist))
      );
      setContextMenu({ ...contextMenu, visible: false });
      setSelectedPlaylists([]);
    } catch (error) {
      console.error("Error deleting playlists", error);
    }
  };

  const deletePlaylist = async (playlistId) => {
    try {
      await axios.delete(`http://localhost:8080/api/playlists/${playlistId}`);
      setPlaylists(playlists.filter((playlist) => playlist.id !== playlistId));
      setContextMenu({ ...contextMenu, visible: false });
      setSelectedPlaylists([]);
    } catch (error) {
      console.error("Error deleting playlist", error);
    }
  };

  const closeContextMenu = () => {
    setContextMenu({ ...contextMenu, visible: false });
  };

  const handleClose = () => {
    navigate("/welcome/home");
  };

  const handleAddSong = () => {
    navigate("/welcome/addsong");
  };

  return (
    <div className="music-gallery-body">
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
      <ThemeProvider theme={original}>
        <Draggable
          handle=".music-gallery-window-header"
          defaultPosition={{ x: 100, y: 50 }}
        >
          <div className="draggable-window">
            <Window className="music-gallery-window">
              <WindowHeader className="music-gallery-window-header">
                <span>MIXTAPES</span>
                <Button onClick={handleClose}>
                  <span className="music-gallery-close-icon" />
                </Button>
              </WindowHeader>
              <WindowContent>
                <div className="music-gallery">
                  <Frame
                    variant="field"
                    style={{
                      width: "20%",
                      height: "432px",
                      backgroundColor: "#ffffff",
                      borderLeft: "3px solid #333333",
                      borderTop: "3px solid #333333",
                      boxShadow: "none",
                      borderRadius: "0",
                      marginBottom: "10px",
                    }}
                  >
                    <div className="playlist-menu-button-panel">
                      <Button
                        onClick={handleAddSong}
                        className="playlist-menu-button"
                      >
                        Add Song
                      </Button>
                      <Button onClick={openModal}>Add Mixtape</Button>
                    </div>
                    <Separator style={{ margin: "10px 0" }} />
                    <div className="playlist-menu">
                      {playlists.map((playlist) => (
                        <div
                          key={playlist.id}
                          className={`playlist-item ${
                            selectedPlaylists.includes(playlist)
                              ? "selected"
                              : ""
                          }`}
                        >
                          <a
                            className="playlist-link"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              selectPlaylist(playlist, e);
                            }}
                            onContextMenu={(e) => handleRightClick(e, playlist)}
                          >
                            {playlist.name}
                          </a>
                        </div>
                      ))}
                    </div>
                  </Frame>
                  <div className="playlist-content">
                    {selectedPlaylists.length === 1 ? (
                      <div>
                        <div className="playlist-header">
                          <h2>{selectedPlaylists[0].name}</h2>
                          <Button>►</Button>
                        </div>
                        <PlaylistContent
                          playlist={selectedPlaylists[0]}
                          onSongClick={setCurrentSong}
                          songs={songs}
                        />
                      </div>
                    ) : (
                      <p>Select a Mixtape.</p>
                    )}
                  </div>
                </div>
                <div className="player-controls">
                  <div className="player-left">
                    <img
                      src="album-cover-url"
                      alt="Album Cover"
                      className="player-album-cover"
                    />
                    <div className="player-song-info">
                      <div className="player-song-title">
                        {currentSong ? currentSong.songTitle : "Song Title"}
                      </div>
                      <div className="player-song-artist">
                        {currentSong ? currentSong.artist : "Artist Name"}
                      </div>
                    </div>
                  </div>
                  <div className="player-middle">
                    <Button>{"<<"}</Button>
                    <Button>►</Button>
                    <Button>{">>"}</Button>
                    <Button>↻</Button>
                  </div>
                  <div className="player-right"></div>
                </div>
              </WindowContent>
            </Window>
          </div>
        </Draggable>

        {isModalOpen && (
          <>
            <div className="modal-background" />
            <Draggable handle=".add-playlist-window-header">
              <div className="add-playlist-modal">
                <Window className="add-playlist-modal-window">
                  <WindowHeader className="add-playlist-window-header">
                    <span>Add New Mixtape</span>
                    <Button onClick={closeModal}>
                      <span className="music-gallery-close-icon" />
                    </Button>
                  </WindowHeader>
                  <WindowContent>
                    <div className="add-playlist-input-container">
                      <TextInput
                        value={newPlaylistName}
                        placeholder="Playlist Name"
                        onChange={handleNewPlaylistNameChange}
                      />
                    </div>
                    <div className="add-playlist-modal-buttons">
                      <Button onClick={addNewPlaylist}>Add</Button>
                      <Button onClick={closeModal}>Cancel</Button>
                    </div>
                  </WindowContent>
                </Window>
              </div>
            </Draggable>
          </>
        )}

        {contextMenu.visible && (
          <div
            ref={contextMenuRef}
            className="add-playlist-context-menu"
            style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
          >
            {selectedPlaylists.length === 1 ? (
              <Button onClick={() => deletePlaylist(contextMenu.playlistId)}>
                Delete
              </Button>
            ) : (
              <Button onClick={deletePlaylists}>Delete</Button>
            )}
          </div>
        )}
      </ThemeProvider>
    </div>
  );
}

export default MusicGallery;
