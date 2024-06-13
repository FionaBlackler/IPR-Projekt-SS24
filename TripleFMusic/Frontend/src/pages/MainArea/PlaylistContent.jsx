import React from "react";
import { Table, TableBody, TableRow, TableDataCell, ScrollView } from "react95";
import { ThemeProvider } from "styled-components";
import original from "react95/dist/themes/original";
import "./PlaylistContent.css";

const PlaylistContent = ({ playlist, onSongClick }) => {
  console.log("Rendering PlaylistContent", { playlist });

  return (
    <ThemeProvider theme={original}>
      <ScrollView classname="playlist-content-scrollview">
        <div className="playlist-content-container">
          <Table className="playlist-table">
            <TableBody>
              {playlist && playlist.songs && playlist.songs.length > 0 ? (
                playlist.songs.map((song, index) => (
                  <TableRow key={index} onClick={() => onSongClick(song)}>
                    <TableDataCell className="playlist-table-cell">
                      {index + 1}
                    </TableDataCell>
                    <TableDataCell className="playlist-table-cell">
                      {song.title}
                    </TableDataCell>
                    <TableDataCell className="playlist-table-cell">
                      {song.artist}
                    </TableDataCell>
                    <TableDataCell className="playlist-table-cell">
                      {song.genre}
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
    </ThemeProvider>
  );
};

export default PlaylistContent;
