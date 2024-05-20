import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PlaylistContent from './PlaylistContent';
import { ThemeProvider } from 'styled-components';
import { Window, WindowHeader, WindowContent, Button, Separator, Frame } from 'react95';
import rose from 'react95/dist/themes/rose';
import './MusicGallery.css';

function MusicGallery() {
  const [playlists, setPlaylists] = useState([
    {
      id: 1,
      name: 'Pop Punk Favorites',
      songs: [
        { title: 'Obsessed', artist: 'Olivia Rodrigo', genre: 'Pop Punk' },
        { title: 'I Want You To Want Me', artist: 'Letters To Cleo', genre: 'Pop Punk' },
        { title: 'Real Wild Child', artist: 'Iggy Pop', genre: 'Pop Punk' },
        { title: 'Rebel Girl', artist: 'Bikini Kill', genre: 'Girl Pop Punk' },
        { title: 'Misery Business', artist: 'Paramore', genre: 'Girl Pop Punk' },
        { title: 'The Anthem', artist: 'Good Charlotte', genre: 'Girl Pop Punk' },
        { title: 'Sk8er Boi', artist: 'Avril Lavigne', genre: 'Girl Pop Punk' },
        { title: 'Complicated', artist: 'Avril Lavigne', genre: 'Girl Pop Punk' },
        { title: 'Bad Reputation', artist: 'Joan Jett', genre: 'Girl Pop Punk' },
        { title: 'Just a Girl', artist: 'No Doubt', genre: 'Girl Pop Punk' },
        { title: 'He Wasn’t', artist: 'Avril Lavigne', genre: 'Girl Pop Punk' },
        { title: 'Cherry Bomb', artist: 'The Runaways', genre: 'Girl Pop Punk' },
        { title: 'She’s Kerosene', artist: 'The Interrupters', genre: 'Girl Pop Punk' },
        { title: 'American Idiot', artist: 'Green Day', genre: 'Girl Pop Punk' },
        { title: 'Dear Maria, Count Me In', artist: 'All Time Low', genre: 'Girl Pop Punk' },
        { title: 'I Miss You', artist: 'blink-182', genre: 'Girl Pop Punk' },
        { title: 'Sugar, We’re Goin Down', artist: 'Fall Out Boy', genre: 'Girl Pop Punk' },
        { title: 'Welcome to the Black Parade', artist: 'My Chemical Romance', genre: 'Girl Pop Punk' },
        { title: 'All the Small Things', artist: 'blink-182', genre: 'Girl Pop Punk' },
        { title: 'In Too Deep', artist: 'Sum 41', genre: 'Girl Pop Punk' },
        { title: 'Basket Case', artist: 'Green Day', genre: 'Girl Pop Punk' },
        { title: 'Fat Lip', artist: 'Sum 41', genre: 'Girl Pop Punk' },
        { title: 'Ocean Avenue', artist: 'Yellowcard', genre: 'Girl Pop Punk' },
        { title: 'Girls & Boys', artist: 'Good Charlotte', genre: 'Girl Pop Punk' },
        { title: 'My Friends Over You', artist: 'New Found Glory', genre: 'Girl Pop Punk' },
        { title: 'The Middle', artist: 'Jimmy Eat World', genre: 'Girl Pop Punk' },
        { title: 'Famous Last Words', artist: 'My Chemical Romance', genre: 'Girl Pop Punk' },
        { title: 'Swing, Swing', artist: 'The All-American Rejects', genre: 'Girl Pop Punk' },
        { title: 'Check Yes Juliet', artist: 'We The Kings', genre: 'Girl Pop Punk' },
        { title: 'Dirty Little Secret', artist: 'The All-American Rejects', genre: 'Girl Pop Punk' },
        { title: 'Headstrong', artist: 'Trapt', genre: 'Girl Pop Punk' },
        { title: 'The Rock Show', artist: 'blink-182', genre: 'Girl Pop Punk' },
        { title: 'Somewhere on Fullerton', artist: 'Allister', genre: 'Girl Pop Punk' },
        { title: 'My Own Worst Enemy', artist: 'Lit', genre: 'Girl Pop Punk' },
        { title: 'I Write Sins Not Tragedies', artist: 'Panic! At The Disco', genre: 'Girl Pop Punk' },
        { title: 'Stacy’s Mom', artist: 'Fountains of Wayne', genre: 'Girl Pop Punk' },
        { title: 'Dance, Dance', artist: 'Fall Out Boy', genre: 'Girl Pop Punk' },
        { title: 'Thnks fr th Mmrs', artist: 'Fall Out Boy', genre: 'Girl Pop Punk' },
        { title: '1985', artist: 'Bowling for Soup', genre: 'Girl Pop Punk' },
        { title: 'American Hi-Fi', artist: 'Flavor of the Weak', genre: 'Girl Pop Punk' },
        { title: 'Kiss Me', artist: 'New Found Glory', genre: 'Girl Pop Punk' },
        { title: 'Gives You Hell', artist: 'The All-American Rejects', genre: 'Girl Pop Punk' },
        { title: 'Weightless', artist: 'All Time Low', genre: 'Girl Pop Punk' },
        { title: 'Bring Me to Life', artist: 'Evanescence', genre: 'Girl Pop Punk' },
        { title: 'Pieces', artist: 'Sum 41', genre: 'Girl Pop Punk' },
        { title: 'Punk Rock Princess', artist: 'Something Corporate', genre: 'Girl Pop Punk' },
        { title: 'Hold On', artist: 'Good Charlotte', genre: 'Girl Pop Punk' },
        { title: 'Perfect', artist: 'Simple Plan', genre: 'Girl Pop Punk' },
        { title: 'Time-Bomb', artist: 'All Time Low', genre: 'Girl Pop Punk' }
      ]
    },
    {
      id: 1,
      name: 'Pop Punk Favorites',
      songs: [
        { title: 'Obsessed', artist: 'Olivia Rodrigo', genre: 'Pop Punk' },
        { title: 'I Want You To Want Me', artist: 'Letters To Cleo', genre: 'Pop Punk' },
        { title: 'Real Wild Child', artist: 'Iggy Pop', genre: 'Pop Punk' }
      ]
    }
    // Add additional playlists as needed...
  ]);

  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const selectPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  const addSong = (newSong) => {
    setPlaylists((prevPlaylists) =>
      prevPlaylists.map((playlist) =>
        playlist.id === selectedPlaylist.id
          ? { ...playlist, songs: [...playlist.songs, newSong] }
          : playlist
      )
    );
  };

  return (
    <ThemeProvider theme={rose}>
      <Window className="playlistwindow">
        <WindowHeader className="window-header">
          <span>MIXTAPES</span>
        </WindowHeader>
        <WindowContent>
          <div className="music-gallery">
            <Frame
              variant='field'
              style={{
                width: '20%',
                height: '416px',
                backgroundColor: '#f0f0f0',
                borderLeft: '3px solid #333333',
                borderTop: '3px solid #333333',
                boxShadow: 'none',
                borderRadius: '0'
              }}
            >
              <div className="button-panel">
                <Link to="/addsong"><Button className="button">Add Song</Button></Link>
                <Button>Add Playlist</Button>
              </div>
              <Separator style={{ margin: '10px 0' }} />
              <div className="playlist-menu">
                {playlists.map((playlist) => (
                  <div key={playlist.id} className="playlist-item">
                    <a
                      className="playlist-link"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        selectPlaylist(playlist);
                      }}
                    >
                      {playlist.name}
                    </a>
                  </div>
                ))}
              </div>
            </Frame>
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
          <div className="player-controls">
            <Button>&lt;&lt;</Button>
            <Button>Play</Button>
            <Button>&gt;&gt;</Button>
          </div>
        </WindowContent>
      </Window>
    </ThemeProvider>
  );
}

export default MusicGallery;
