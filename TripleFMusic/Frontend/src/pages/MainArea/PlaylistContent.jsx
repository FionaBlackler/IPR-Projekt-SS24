import React, { useState, useRef, useEffect } from "react";
import { Table, TableBody, TableRow, TableDataCell, ScrollView, Button } from "react95";
import { ThemeProvider } from "styled-components";
import original from "react95/dist/themes/original";
import "./PlaylistContent.css";

const PlaylistContent = ({ playlist, onSongClick, songs, deleteSong, deleteSongs }) => {
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    songId: null,
  });
  const contextMenuRef = useRef(null);

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

  const selectSong = (song, event) => {
    event.preventDefault(); // Prevent any default behavior
    console.log('Song selected:', song);
    console.log('Ctrl key pressed:', event.ctrlKey);
    if (event.ctrlKey) {
      setSelectedSongs((prevSelectedSongs) => {
        if (prevSelectedSongs.includes(song)) {
          const newSelectedSongs = prevSelectedSongs.filter((s) => s !== song);
          console.log('Updated selected songs (removal):', newSelectedSongs);
          return newSelectedSongs;
        } else {
          const newSelectedSongs = [...prevSelectedSongs, song];
          console.log('Updated selected songs (addition):', newSelectedSongs);
          return newSelectedSongs;
        }
      });
    } else {
      setSelectedSongs([song]);
      onSongClick(song); // Update currentSong when a single song is selected
      console.log('Updated selected songs (single):', [song]);
    }
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
                    onClick={(e) => selectSong(song, e)} // Bind selectSong here
                    onContextMenu={(e) => handleRightClick(e, song)}
                    className={`playlist-table-row ${selectedSongs.includes(song) ? "selected" : ""}`}
                    style={{ cursor: "pointer" }}
                  >
                    <TableDataCell className="playlist-table-cell">{index + 1}</TableDataCell>
                    <TableDataCell className="playlist-table-cell">{song.songTitle}</TableDataCell>
                    <TableDataCell className="playlist-table-cell">{song.artist}</TableDataCell>
                    <TableDataCell className="playlist-table-cell">{song.selectedGenres.join(", ")}</TableDataCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableDataCell className="playlist-table-cell">No songs available</TableDataCell>
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
            <Button onClick={() => deleteSong(contextMenu.songId)}>Delete</Button>
          ) : (
            <Button onClick={() => deleteSongs(selectedSongs.map(song => song.id))}>Delete</Button>
          )}
        </div>
      )}
    </ThemeProvider>
  );
};

export default PlaylistContent;
