import React, { useState } from 'react';
import PlaylistContent from './MainArea/PlaylistContent';  // Adjust path as necessary

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
    <div>
      <h1>Music Gallery</h1>
      <div>
        <h2>Playlists</h2>
        {playlists.map(playlist => (
          <button key={playlist.id} onClick={() => selectPlaylist(playlist)}>
            {playlist.name}
          </button>
        ))}
      </div>
      <PlaylistContent playlist={selectedPlaylist} />
    </div>
  );
}

export default MusicGallery;
