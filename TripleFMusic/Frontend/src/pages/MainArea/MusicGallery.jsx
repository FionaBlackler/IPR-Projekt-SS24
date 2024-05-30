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
        { title: 'Thnks fr th Mmrs', artist: 'Fall Out Boy', genre: 'Girl Pop Punk' },
        // More songs...
      ]
    },
    // More playlists...
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
          <div className="modal-content">
            <h2>Add New Playlist</h2>
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
          </div>
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
