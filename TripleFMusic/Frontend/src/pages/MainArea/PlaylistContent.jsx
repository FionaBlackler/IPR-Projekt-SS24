import React from "react";
import { Table, TableBody, TableRow, TableDataCell, ScrollView } from "react95";
import { ThemeProvider } from "styled-components";
import rose from "react95/dist/themes/rose";
import "./PlaylistContent.css";

function PlaylistContent({ playlist, onSongClick }) {
  return (
    <ThemeProvider theme={rose}>
      <ScrollView classname="playlist-content-scrollview">
        <div className="playlist-content-container">
          <Table className="playlist-table">
            <TableBody>
              {playlist.songs.map((song, index) => (
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
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollView>
    </ThemeProvider>
  );
}

export default PlaylistContent;
