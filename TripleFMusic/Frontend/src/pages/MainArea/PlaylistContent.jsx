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

/**
 * PlaylistContent component displays the playlist content.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.playlist - The playlist.
 * @param {Function} props.onSongClick - The function to handle song click.
 * @param {Array} props.songs - The songs in the playlist.
 * @param {Function} props.deleteSong - The function to delete a song.
 * @param {Function} props.deleteSongs - The function to delete multiple songs.
 * @returns {JSX.Element} The PlaylistContent component.
 */
const PlaylistContent = ({
  playlist,
  onSongClick,
  songs,
  deleteSong,
  deleteSongs,
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
  const contextMenuRef = useRef(null);

  /**
   * Handles the selection of a song.
   *
   * @param {Object} song - The selected song.
   * @param {Object} event - The click event.
   */
  const selectSong = (song, event) => {
    event.preventDefault();
    if (event.ctrlKey) {
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
    /**
     * Handles the click outside of the context menu.
     *
     * @param {Object} event - The click event.
     */
    const handleClickOutside = (event) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target)
      ) {
        closeContextMenu();
      }
    };

    if (contextMenu.visible) {
      // Adds the event listener for mousedown when the context menu is visible.
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Removes the event listener for mousedown when the context menu is not visible.
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      // Cleanup function to remove the event listener on component unmount or when dependencies change.
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contextMenu.visible]);

  const closeContextMenu = () => {
    setContextMenu({ ...contextMenu, visible: false });
  };

  /**
   * Handles the right click event on a song.
   *
   * @param {Object} e - The right click event.
   * @param {Object} song - The selected song.
   */
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

  /**
   * Handles the deletion of a song.
   *
   * @param {string} songId - The ID of the song to delete.
   */
  const handleDeleteSong = async (songId) => {
    await deleteSong(songId);
    closeContextMenu();
  };

  /**
   * Handles the deletion of multiple songs.
   *
   * @param {Array} songIds - The IDs of the songs to delete.
   */
  const handleDeleteSongs = async (songIds) => {
    await deleteSongs(songIds);
    closeContextMenu();
  };

  /**
   * Opens the modal window.
   */
  const openModal = () => {
    setIsModalOpen(true);
  };

  /**
   * Closes the modal window.
   */
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
  };

  /**
   * Toggles the edit mode.
   */
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  /**
   * Handles the change of song details.
   *
   * @param {Object} event - The change event.
   */
  const handleInputChange = (event, field) => {
    const value = event.target.value;
    setSelectedSongs((prevSelectedSongs) => {
      const updatedSong = { ...prevSelectedSongs[0], [field]: value };
      return [updatedSong];
    });
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
            <Button onClick={() => handleDeleteSong(contextMenu.songId)}>
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

      {isModalOpen && (
        <>
          <div className="song-details-modal-background" />
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
                      {selectedSongs.length > 0 && (
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
                                  value={selectedSongs[0].songTitle}
                                  onChange={(e) =>
                                    handleInputChange(e, "songTitle")
                                  }
                                  fullWidth
                                />
                              ) : (
                                selectedSongs[0].songTitle
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
                                  value={selectedSongs[0].artist}
                                  onChange={(e) =>
                                    handleInputChange(e, "artist")
                                  }
                                  fullWidth
                                />
                              ) : (
                                selectedSongs[0].artist
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
                            <span style={{ width: "100px" }}>Genres:</span>
                            <span style={{ flex: 1, textAlign: "left" }}>
                              {isEditMode ? (
                                <TextInput
                                  value={selectedSongs[0].selectedGenres.join(
                                    ", "
                                  )}
                                  onChange={(e) =>
                                    handleInputChange(e, "selectedGenres")
                                  }
                                  fullWidth
                                />
                              ) : (
                                selectedSongs[0].selectedGenres.join(", ")
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
                            <span style={{ width: "100px" }}>Playlist:</span>
                            <span style={{ flex: 1, textAlign: "left" }}>
                              {isEditMode ? (
                                <TextInput
                                  value={selectedSongs[0].selectedPlaylists}
                                  onChange={(e) =>
                                    handleInputChange(e, "selectedPlaylists")
                                  }
                                  fullWidth
                                />
                              ) : (
                                selectedSongs[0].selectedPlaylists
                              )}
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
                                  value={selectedSongs[0].notes}
                                  onChange={(e) =>
                                    handleInputChange(e, "notes")
                                  }
                                  fullWidth
                                />
                              ) : (
                                selectedSongs[0].notes
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
