import React from 'react';

function PlaylistContent({ playlist }) {
  return (
    <div>
      {playlist ? (
        <div>
          <h3 className="music-gallery-header3">{playlist.name}</h3>
          <ul className="selected-playlist" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {playlist.songs.map((song, index) => (
              <li key={index}>{song}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Please select a mixtape to view songs.</p>
      )}
    </div>
  );
}

export default PlaylistContent;
