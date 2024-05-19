import React, { useState } from 'react';
import PlaylistContent from './PlaylistContent';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import {
  Window,
  WindowHeader,
  WindowContent,
  Anchor,
  MenuList,
  MenuListItem,
  Button
} from 'react95';
import rose from 'react95/dist/themes/rose';
import './MusicGallery.css';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'ms_sans_serif';
    background-color: #008080;
  }
`;

function MusicGallery() {
  const [playlists, setPlaylists] = useState([
    {
      id: 1,
      name: 'Girl Punk Favorites',
      songs: [
        { title: 'Obsessed', artist: 'Olivia Rodrigo', genre: 'Girl Punk Pop' },
        { title: 'I Want You To Want Me', artist: 'Letters To Cleo', genre: 'Girl Punk Pop' },
        { title: 'Real Wild Child', artist: 'Iggy Pop', genre: 'Girl Punk Pop' }
      ]
    },
    // Add additional playlists as needed...
  ]);

  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const selectPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  return (
    <ThemeProvider theme={rose}>
      <GlobalStyle />
        <Window className="playlistwindow">
          <WindowHeader className="window-header">
            <span>MIXTAPES</span>
          </WindowHeader>
          <WindowContent>
            <div className="music-gallery">
              <div className="playlist-menu">
                <MenuList>
                  {playlists.map(playlist => (
                    <MenuListItem key={playlist.id}>
                      <Anchor className="anchor" href="#" onClick={(e) => { e.preventDefault(); selectPlaylist(playlist); }}>
                        {playlist.name}
                      </Anchor>
                    </MenuListItem>
                  ))}
                </MenuList>
              </div>
              <div className="playlist-content">
                {selectedPlaylist ? (
                  <div>
                    <div className="playlist-header">
                      <h2>{selectedPlaylist.name}</h2>
                      <Button>Play</Button>
                    </div>
                    <PlaylistContent playlist={selectedPlaylist} />
                  </div>
                ) : (
                  <p>Please select a playlist.</p>
                )}
              </div>
            </div>
          </WindowContent>
        </Window>
    </ThemeProvider>
  );
}

export default MusicGallery;
