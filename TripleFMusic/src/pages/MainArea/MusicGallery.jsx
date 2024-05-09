import React, { useState } from 'react'; 
import PlaylistContent from './PlaylistContent'; 
import './MusicGallery.css';

function MusicGallery() {
  const [playlists, setPlaylists] = useState([
    { id: 1, name: 'Rock Favorites', songs: ['Song 1', 'Song 2', 'Song 3'] },
    { id: 2, name: 'Chill Vibes', songs: ['Song 4', 'Song 5'] },
    { id: 3, name: 'Classical Moods', songs: ['Song 6', 'Song 7', 'Song 8', 'Song 9'] }
  ]);

  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const selectPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  return (
    <div className="music-gallery">
      <div className="playlist-menu">
        <h1 className="music-gallery-header1">MIXTAPES</h1>
        <div>
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
        {selectedPlaylist ? <PlaylistContent playlist={selectedPlaylist} /> : <p>Please select a playlist.</p>}
      </div>
    </div>
  );
}

export default MusicGallery;
