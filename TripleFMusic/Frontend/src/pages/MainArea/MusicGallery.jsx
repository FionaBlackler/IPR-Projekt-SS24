import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PlaylistContent from './PlaylistContent';
import { ThemeProvider } from 'styled-components';
import { Window, WindowHeader, WindowContent, Button, Separator, Frame, TextInput } from 'react95';
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
        { title: 'Rebel Girl', artist: 'Bikini Kill', genre: 'Pop Punk' },
        { title: 'Misery Business', artist: 'Paramore', genre: 'Pop Punk' },
        { title: 'The Anthem', artist: 'Good Charlotte', genre: 'Pop Punk' },
        { title: 'Sk8er Boi', artist: 'Avril Lavigne', genre: 'Pop Punk' },
        { title: 'Complicated', artist: 'Avril Lavigne', genre: 'Pop Punk' },
        { title: 'Bad Reputation', artist: 'Joan Jett', genre: 'Pop Punk' },
        { title: 'Just a Girl', artist: 'No Doubt', genre: 'Pop Punk' },
        { title: 'He Wasn’t', artist: 'Avril Lavigne', genre: 'Pop Punk' },
        { title: 'Cherry Bomb', artist: 'The Runaways', genre: 'Pop Punk' },
      ]
    },
    // Add additional playlists as needed...
  ]);

  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, playlistId: null });

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewPlaylistName('');
  };

  const handleNewPlaylistNameChange = (e) => {
    setNewPlaylistName(e.target.value);
  };

  const addNewPlaylist = () => {
    const newPlaylist = {
      id: playlists.length + 1,
      name: newPlaylistName,
      songs: []
    };
    setPlaylists([...playlists, newPlaylist]);
    closeModal();
  };

  const handleRightClick = (e, playlistId) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.pageX,
      y: e.pageY,
      playlistId: playlistId
    });
  };

  const deletePlaylist = (playlistId) => {
    setPlaylists(playlists.filter(playlist => playlist.id !== playlistId));
    setContextMenu({ ...contextMenu, visible: false });
    if (selectedPlaylist && selectedPlaylist.id === playlistId) {
      setSelectedPlaylist(null);
    }
  };

  const closeContextMenu = () => {
    setContextMenu({ ...contextMenu, visible: false });
  };

  return (
    <ThemeProvider theme={rose}> 
      <Window className="playlistwindow">
        <WindowHeader className="window-header">
          <span>MIXTAPES</span>
          <Button onClick={closeModal}>
                <span className="close-icon" />
          </Button>
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
                <Button onClick={openModal}>Add Playlist</Button>
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
                      onContextMenu={(e) => handleRightClick(e, playlist.id)}
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

      {isModalOpen && (
        <div className="modal">
          <Window className="modal-window">
            <WindowHeader className="window-header">
              <span>Add New Playlist</span>
              <Button onClick={closeModal}>
                <span className="close-icon" />
              </Button>
            </WindowHeader>
            <WindowContent>
              <div className="input-container">
                <TextInput
                  value={newPlaylistName}
                  placeholder="Playlist Name"
                  onChange={handleNewPlaylistNameChange}
                />
              </div>
              <div className="modal-buttons">
                <Button onClick={addNewPlaylist}>Add</Button>
                <Button onClick={closeModal}>Cancel</Button>
              </div>
            </WindowContent>
          </Window>
        </div>
      )}

      {contextMenu.visible && (
        <div
          className="context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={closeContextMenu}
        >
          <Button onClick={() => deletePlaylist(contextMenu.playlistId)}>Delete Playlist</Button>
        </div>
      )}
    </ThemeProvider>
  );
}

export default MusicGallery;
