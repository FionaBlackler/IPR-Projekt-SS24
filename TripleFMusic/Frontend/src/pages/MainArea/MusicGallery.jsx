import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlaylistContent from './PlaylistContent.jsx';
import { ThemeProvider } from 'styled-components';
import Draggable from 'react-draggable';
import { Window, WindowHeader, WindowContent, Button, Separator, Frame, TextInput } from 'react95';
import rose from 'react95/dist/themes/rose';
import './MusicGallery.css';

function MusicGallery() {
  const navigate = useNavigate();

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
  const [currentSong, setCurrentSong] = useState(null);

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

  const handleClose = () => {
    navigate('/welcome/home');
  };

  const handleAddSong = () => {
    navigate('/welcome/addsong');
  };

  return (
    <ThemeProvider theme={rose}>
      <Draggable handle=".music-gallery-window-header">
        <div className="draggable-window">
          <Window className="music-gallery-window">
            <WindowHeader className="music-gallery-window-header">
              <span>MIXTAPES</span>
              <Button onClick={handleClose}>
                <span className="music-gallery-close-icon" />
              </Button>
            </WindowHeader>
            <WindowContent>
              <div className="music-gallery">
                <Frame
                  variant='field'
                  style={{
                    width: '20%',
                    height: '432px',
                    backgroundColor: '#ffffff',
                    borderLeft: '3px solid #333333',
                    borderTop: '3px solid #333333',
                    boxShadow: 'none',
                    borderRadius: '0',
                    marginBottom: '10px'
                  }}
                >
                  <div className="playlist-menu-button-panel">
                    <Button onClick={handleAddSong} className="playlist-menu-button">Add Song</Button>
                    <Button onClick={openModal}>Add MIXTAPE</Button>
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
                        <Button>►</Button>
                      </div>
                      <PlaylistContent playlist={selectedPlaylist} onSongClick={setCurrentSong} />
                    </div>
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
              <div className="player-controls">
                <div className="player-left">
                  <img src="album-cover-url" alt="Album Cover" className="player-album-cover" />
                  <div className="player-song-info">
                    <div className="player-song-title">{currentSong ? currentSong.title : 'Song Title'}</div>
                    <div className="player-song-artist">{currentSong ? currentSong.artist : 'Artist Name'}</div>
                  </div>
                </div>
                <div className="player-middle">
                  <Button>&lt;&lt;</Button>
                  <Button>►</Button>
                  <Button>&gt;&gt;</Button>
                  <Button>↻</Button>
                </div>
                <div className="player-right">
                </div>
              </div>
            </WindowContent>
          </Window>
        </div>
      </Draggable>

      {isModalOpen && (
        <>
          <div className="modal-background" />
          <Draggable handle=".add-playlist-window-header">
            <div className="add-playlist-modal">
              <Window className="add-playlist-modal-window">
                <WindowHeader className="add-playlist-window-header">
                  <span>Add New MIXTAPE</span>
                  <Button onClick={closeModal}>
                    <span className="music-gallery-close-icon" />
                  </Button>
                </WindowHeader>
                <WindowContent>
                  <div className="add-playlist-input-container">
                    <TextInput
                      value={newPlaylistName}
                      placeholder="Playlist Name"
                      onChange={handleNewPlaylistNameChange}
                    />
                  </div>
                  <div className="add-playlist-modal-buttons">
                    <Button onClick={addNewPlaylist}>Add</Button>
                    <Button onClick={closeModal}>Cancel</Button>
                  </div>
                </WindowContent>
              </Window>
            </div>
          </Draggable>
        </>
      )}

      {contextMenu.visible && (
        <div
          className="add-playlist-context-menu"
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
