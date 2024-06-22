import React, { useState, useRef, useEffect } from "react";
import { 
  Table, 
  TableBody, 
  TableRow, 
  TableDataCell, 
  ScrollView,
  Button
} from "react95";
import { ThemeProvider } from "styled-components";
import original from "react95/dist/themes/original";
import "./PlaylistContent.css";

const PlaylistContent = ({ playlist, onSongClick, songs, deleteSong }) => {
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    songId: null,
  });
  const contextMenuRef = useRef(null);

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
    setContextMenu({
      visible: true,
      x: e.clientX - 75,
      y: e.clientY,
      songId: song.id,
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
                    onClick={() => onSongClick(song)}
                    onContextMenu={(e) => handleRightClick(e, song)}
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
                      {song.selectedGenres.join(', ')}
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
          <Button onClick={() => deleteSong(contextMenu.songId)}>Delete</Button>
        </div>
      )}
    </ThemeProvider>
  );
};

export default PlaylistContent;
