import React, { useState, useRef, useEffect } from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableDataCell,
  ScrollView,
  Frame,
  Button,
  Window,
  WindowHeader,
  WindowContent,
  TextInput,
} from "react95";
import { ThemeProvider } from "styled-components";
import Draggable from "react-draggable";
import original from "react95/dist/themes/original";
import "./PlaylistContent.css";
import axios from '../../axiosConfig'; // Import your Axios instance

const PlaylistContent = ({
  playlist,
  onSongClick,
  songs,
  deleteSong,
  deleteSongs,
  fetchSongs,
}) => {
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    songId: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedSong, setEditedSong] = useState({}); // Initialize as an empty object
  const contextMenuRef = useRef(null);


  const selectSong = (song, event) => {
    event.preventDefault();
    if (event.ctrlKey|| event.metaKey) {
      setSelectedSongs((prevSelectedSongs) => {
        if (prevSelectedSongs.includes(song)) {
          return prevSelectedSongs.filter((s) => s !== song);
        } else {
          return [...prevSelectedSongs, song];
        }
      });
    } else {
      setSelectedSongs([song]);
      onSongClick(song);
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

  const closeContextMenu = () => {
    setContextMenu({ ...contextMenu, visible: false });
  };

  const handleRightClick = (e, song) => {
    e.preventDefault();
    if (!selectedSongs.includes(song)) {
      setSelectedSongs([song]);
    }
    setContextMenu({
      visible: true,
      x: e.clientX - 28,
      y: e.clientY - 20,
      songId: song.id,
    });
  };

  const handleDeleteSong = async (playlistId, songId) => {
    await deleteSong(playlistId, songId);
    closeContextMenu();
  };

  const handleDeleteSongs = async (songIds) => {
    await deleteSongs(playlist.id, songIds);
    closeContextMenu();
  };

  const openModal = () => {
    setIsModalOpen(true);
    setEditedSong(selectedSongs[0]);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    fetchSongs();
  };

  const toggleEditMode = async () => {
    if (isEditMode) {
      // Save the changes
      try {
        await axios.put(`http://localhost:8080/api/songs/${editedSong.id}`, {
          songTitle: editedSong.songTitle,
          artist: editedSong.artist,
          selectedGenres: editedSong.selectedGenres,
          notes: editedSong.notes,
        });
        // Update the song in the songs list locally
        const updatedSongs = songs.map(song =>
          song.id === editedSong.id ? editedSong : song
        );
        setSelectedSongs([editedSong]);
        setIsModalOpen(false);
        setIsEditMode(false);
        fetchSongs();
      } catch (error) {
        console.error('Error updating song:', error);
      }
    } else {
      setIsEditMode(true);
    }
  };

  const handleInputChange = (event, field) => {
    const value = event.target.value;
    setEditedSong((prevEditedSong) => ({
      ...prevEditedSong,
      [field]: field === 'selectedGenres' ? value.split(', ') : value,
    }));
  };

  return (
    <ThemeProvider theme={original}>
      <ScrollView className="playlist-content-scrollview">
        <div className="playlist-content-container">
          <Table className="playlist-table">
            <TableBody>
              {songs && songs.length > 0 ? (
                songs.map((song, index) => (
                  <TableRow
                    key={index}
                    onClick={(e) => selectSong(song, e)}
                    onContextMenu={(e) => handleRightClick(e, song)}
                    className={`playlist-table-row ${
                      selectedSongs.includes(song) ? "selected" : ""
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    <TableDataCell className="playlist-table-cell">
                      {index + 1}
                    </TableDataCell>
                    <TableDataCell className="playlist-table-cell">
                      {song.songTitle}
                    </TableDataCell>
                    <TableDataCell className="playlist-table-cell">
                      {song.artist}
                    </TableDataCell>
                    <TableDataCell className="playlist-table-cell">
                      {song.selectedGenres.join(", ")}
                    </TableDataCell>
                    <TableDataCell
                      className="playlist-table-cell"
                      onClick={openModal}
                    >
                      ...
                    </TableDataCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableDataCell className="playlist-table-cell">
                    No songs available
                  </TableDataCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </ScrollView>

      {contextMenu.visible && (
        <div
          ref={contextMenuRef}
          className="delete-song-context-menu"
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
        >
          {selectedSongs.length === 1 ? (
            <Button onClick={() => handleDeleteSong(playlist.id, contextMenu.songId)}>
              Delete
            </Button>
          ) : (
            <Button
              onClick={() =>
                handleDeleteSongs(selectedSongs.map((song) => song.id))
              }
            >
              Delete
            </Button>
          )}
        </div>
      )}

      {isModalOpen && editedSong && (
        <>
          <Draggable handle=".song-details-window-header">
            <div className="song-details-modal">
              <Window
                className="song-details-modal-window"
                style={{ overflowY: "hidden" }}
              >
                <WindowHeader className="song-details-window-header">
                  <span>Song Details</span>
                  <Button onClick={closeModal}>
                    <span className="song-details-close-icon" />
                  </Button>
                </WindowHeader>
                <WindowContent>
                  <Frame
                    variant="field"
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#ffffff",
                      borderLeft: "0px solid #333333",
                      borderTop: "0px solid #333333",
                      boxShadow: "none",
                      borderRadius: "0",
                      marginBottom: "10px",
                      maxHeight: "260px",
                      overflowY: "hidden",
                    }}
                  >
                    <ScrollView
                      style={{
                        height: "270px",
                        overflow: isEditMode ? "hidden" : "auto",
                      }}
                    >
                      {selectedSongs.length > 0 && editedSong && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            margin: "10px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "10px",
                            }}
                          >
                            <span style={{ width: "100px" }}>Song Title:</span>
                            <span style={{ flex: 1, textAlign: "left" }}>
                              {isEditMode ? (
                                <TextInput
                                  value={editedSong.songTitle || ""}
                                  onChange={(e) =>
                                    handleInputChange(e, "songTitle")
                                  }
                                  fullWidth
                                />
                              ) : (
                                editedSong.songTitle
                              )}
                            </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "10px",
                            }}
                          >
                            <span style={{ width: "100px" }}>Artist:</span>
                            <span style={{ flex: 1, textAlign: "left" }}>
                              {isEditMode ? (
                                <TextInput
                                  value={editedSong.artist || ""}
                                  onChange={(e) =>
                                    handleInputChange(e, "artist")
                                  }
                                  fullWidth
                                />
                              ) : (
                                editedSong.artist
                              )}
                            </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "10px",
                            }}
                          >
                            <span style={{ width: "100px" }}>Genre:</span>
                            <span style={{ flex: 1, textAlign: "left" }}>
                              {editedSong.selectedGenres.join(", ")}
                            </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: isEditMode ? "center" : "flex-start",
                              marginBottom: "10px",
                            }}
                          >
                            <span style={{ width: "100px" }}>Notes:</span>
                            <span style={{ flex: 1, textAlign: "left" }}>
                              {isEditMode ? (
                                <TextInput
                                  value={editedSong.notes || ""}
                                  onChange={(e) =>
                                    handleInputChange(e, "notes")
                                  }
                                  fullWidth
                                />
                              ) : (
                                editedSong.notes
                              )}
                            </span>
                          </div>
                        </div>
                      )}
                    </ScrollView>
                  </Frame>

                  <div>
                    <Button onClick={toggleEditMode}>
                      {isEditMode ? "Save" : "Edit"}
                    </Button>
                  </div>
                </WindowContent>
              </Window>
            </div>
          </Draggable>
        </>
      )}
    </ThemeProvider>
  );
};

export default PlaylistContent;
