import React from "react";
import { 
  Table, 
  TableBody, 
  TableRow, 
  TableDataCell, 
  ScrollView 
} from "react95";
import { ThemeProvider } from "styled-components";
import original from "react95/dist/themes/original";
import "./PlaylistContent.css";

const PlaylistContent = ({ playlist, onSongClick, songs }) => {
  console.log("Rendering PlaylistContent", { playlist, songs });

  return (
    <ThemeProvider theme={original}>
      <ScrollView className="playlist-content-scrollview">
        <div className="playlist-content-container">
          <Table className="playlist-table">
            <TableBody>
              {songs && songs.length > 0 ? (
                songs.map((song, index) => (
                  <TableRow key={index} onClick={() => onSongClick(song)}>
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
    </ThemeProvider>
  );
};

export default PlaylistContent;
