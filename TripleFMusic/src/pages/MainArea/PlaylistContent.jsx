import React from 'react';
import { Table, TableBody, TableRow, TableDataCell } from 'react95';
import { ThemeProvider } from 'styled-components';
import rose from 'react95/dist/themes/rose';

function PlaylistContent({ playlist }) {
  return (
    <ThemeProvider theme={rose}>
      <Table>
        <TableBody>
          {playlist.songs.map((song, index) => (
            <TableRow key={index}>
              <TableDataCell>{index + 1}</TableDataCell>
              <TableDataCell>{song.title}</TableDataCell>
              <TableDataCell>{song.artist}</TableDataCell>
              <TableDataCell>{song.genre}</TableDataCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ThemeProvider>
  );
}

export default PlaylistContent;
