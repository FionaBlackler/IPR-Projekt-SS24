import React, { useState } from 'react'; 
import PlaylistContent from './PlaylistContent'; 
import './MusicGallery.css';

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
    <div className="music-gallery">
      <div className="playlist-menu">        
        <div sytle={{ flexGrow:1 }}>
          <h1 className="music-gallery-header">MIXTAPES</h1> 
          {playlists.map(playlist => (
          <div key={playlist.id}>
            <a className="playlist-link" href="#" onClick={(e) => { e.preventDefault(); selectPlaylist(playlist); }}>
              {playlist.name}
            </a>
          </div>
          ))}
        </div>
        
      </div>
      <div className="playlist-content">
        <div style={{ flexGrow: 1 }}>
          {selectedPlaylist ? <PlaylistContent playlist={selectedPlaylist} /> : <p>Please select a playlist.</p>}
        </div>
      </div>
    </div>
  );
}

export default MusicGallery;