import React from 'react';
import { Table, TableBody, TableRow, TableDataCell } from 'react95';
import { ThemeProvider } from 'styled-components';
import rose from 'react95/dist/themes/rose';
import './PlaylistContent.css';

function PlaylistContent({ playlist }) {
  return (
    <ThemeProvider theme={rose}>
      <div className="playlist-content-container">
        <Table className="playlist-table">
          <TableBody>
            {playlist.songs.map((song, index) => (
              <TableRow key={index}>
                <TableDataCell className="table-cell">{index + 1}</TableDataCell>
                <TableDataCell className="table-cell">{song.title}</TableDataCell>
                <TableDataCell className="table-cell">{song.artist}</TableDataCell>
                <TableDataCell className="table-cell">{song.genre}</TableDataCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ThemeProvider>
  );
}

export default PlaylistContent;