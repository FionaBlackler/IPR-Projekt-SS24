import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlaylistContent from "./PlaylistContent";
import { ThemeProvider } from "styled-components";
import Draggable from "react-draggable";
import {
  Window,
  WindowHeader,
  WindowContent,
  Button,
  Separator,
  Frame,
  TextInput,
} from "react95";
import original from "react95/dist/themes/original";
import "./MusicGallery.css";
import axios from 'axios';

function MusicGallery() {
  const navigate = useNavigate();

  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    playlistId: null,
  });
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const response = await axios.get('http://localhost:8080/api/playlists');
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
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

  const selectPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
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
      const response = await axios.post('http://localhost:8080/api/playlists', { name: newPlaylistName });
      setPlaylists([...playlists, response.data]); // Add new playlist to the list
      closeModal(); // Close the modal
    } catch (error) {
      console.error("Error adding new playlist:", error);

      if (error.response) {
        if (error.response.status === 400) {
          alert('Playlist name must be unique');
        } else {
          alert(`An error occurred: ${error.response.data.message}`);
        }
      } else {
        alert('An error occurred while creating the playlist. Please check the console for details.');
      }
    }
  };

  const handleRightClick = (e, playlistId) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.pageX,
      y: e.pageY,
      playlistId: playlistId,
    });
  };

  const deletePlaylist = async (playlistId) => {
    try {
      await axios.delete(`/api/playlists/${playlistId}`);
      setPlaylists(playlists.filter((playlist) => playlist.id !== playlistId));
      setContextMenu({ ...contextMenu, visible: false });
      if (selectedPlaylist && selectedPlaylist.id === playlistId) {
        setSelectedPlaylist(null);
      }
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
    <ThemeProvider theme={original}>
      <Draggable handle=".music-gallery-window-header">
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
                    <Button onClick={handleAddSong} className="playlist-menu-button">
                      Add Song
                    </Button>
                    <Button onClick={openModal}>Add MIXTAPE</Button>
                  </div>
                  <Separator style={{ margin: "10px 0" }} />
                  <div className="playlist-menu">
                    {playlists.map((playlist) => (
                      <div key={playlist.id} className="playlist-item">
                        <a
                          className="playlist-link"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            selectPlaylist(playlist);
                          }}
                          onContextMenu={(e) => handleRightClick(e, playlist.id)}
                        >
                          {playlist.name}
                        </a>
                      </div>
                    ))}
                  </div>
                </Frame>
                <div className="playlist-content">
                  {selectedPlaylist ? (
                    <div>
                      <div className="playlist-header">
                        <h2>{selectedPlaylist.name}</h2>
                        <Button>►</Button>
                      </div>
                      <PlaylistContent playlist={selectedPlaylist} onSongClick={setCurrentSong} />
                    </div>
                  ) : (
                    <p></p>
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
                      {currentSong ? currentSong.title : "Song Title"}
                    </div>
                    <div className="player-song-artist">
                      {currentSong ? currentSong.artist : "Artist Name"}
                    </div>
                  </div>
                </div>
                <div className="player-middle">
                  <Button>{'<<'}</Button>
                  <Button>►</Button>
                  <Button>{'>>'}</Button>
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
                  <span>Add New MIXTAPE</span>
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
          className="add-playlist-context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={closeContextMenu}
        >
          <Button onClick={() => deletePlaylist(contextMenu.playlistId)}>
            Delete Playlist
          </Button>
        </div>
      )}
    </ThemeProvider>
  );
}

export default MusicGallery;
