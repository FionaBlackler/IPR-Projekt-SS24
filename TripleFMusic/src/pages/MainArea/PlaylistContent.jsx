import React from 'react';

function PlaylistContent({ playlist }) {
  return (
    <div>
      {playlist ? (
        <div>
          <h3 className="playlist-content-header">{playlist.name}</h3>
          <table className="playlist-table">
            <tbody>
              {playlist.songs.map((song, index) => (
                <tr key={index}>
                  <td>{song.title}</td>
                  <td>{song.artist}</td>
                  <td>{song.genre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Please select a mixtape to view songs.</p>
      )}
    </div>
  );
}

export default PlaylistContent;
