import React, { useState, useRef, useEffect } from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableDataCell,
  ScrollView,
  Button,
} from "react95";
import { ThemeProvider } from "styled-components";
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
              onClick={() => handleDeleteSongs(selectedSongs.map((song) => song.id))}
            >
              Delete
            </Button>
          )}
        </div>
      )}
    </ThemeProvider>
  );
};

export default PlaylistContent;
