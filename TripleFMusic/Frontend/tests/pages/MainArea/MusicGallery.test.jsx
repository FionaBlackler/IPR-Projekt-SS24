import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PlaylistContent from '../../../src/pages/MainArea/PlaylistContent';

const sampleSongs = [
  { id: 1, songTitle: 'Song 1', artist: 'Artist 1', selectedGenres: ['Genre 1'], notes: 'Note 1' },
  { id: 2, songTitle: 'Song 2', artist: 'Artist 2', selectedGenres: ['Genre 2'], notes: 'Note 2' },
];

describe('PlaylistContent', () => {
  const mockDeleteSong = jest.fn();
  const mockDeleteSongs = jest.fn();
  const mockFetchSongs = jest.fn();
  const mockOnSongClick = jest.fn();

  const renderComponent = () =>
    render(
      <PlaylistContent
        playlist={{ id: 1, name: 'Sample Playlist' }}
        songs={sampleSongs}
        deleteSong={mockDeleteSong}
        deleteSongs={mockDeleteSongs}
        fetchSongs={mockFetchSongs}
        onSongClick={mockOnSongClick}
      />
    );

  test('selects a song on click', () => {
    renderComponent();
    const song1 = screen.getByText('Song 1');
    fireEvent.click(song1);
    expect(mockOnSongClick).toHaveBeenCalledWith(sampleSongs[0]);
  });

  test('handles outside click to close context menu', () => {
    renderComponent();
    const song1 = screen.getByText('Song 1');
    fireEvent.contextMenu(song1);
    expect(screen.getByText('Delete')).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  test('closes context menu', () => {
    renderComponent();
    const song1 = screen.getByText('Song 1');
    fireEvent.contextMenu(song1);
    expect(screen.getByText('Delete')).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  test('handles right-click on a song to open context menu', () => {
    renderComponent();
    const song1 = screen.getByText('Song 1');
    fireEvent.contextMenu(song1);
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  test('handles delete song action from context menu', async () => {
    renderComponent();
    const song1 = screen.getByText('Song 1');
    fireEvent.contextMenu(song1);
    expect(screen.getByText('Delete')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Delete'));
    await waitFor(() => {
      expect(mockDeleteSong).toHaveBeenCalledWith(1, 1);
    });
  });


  test('renders PlaylistContent component with songs', () => {
    renderComponent();
    expect(screen.getByText('Song 1')).toBeInTheDocument();
    expect(screen.getByText('Song 2')).toBeInTheDocument();
  });

  test('renders "No songs available" when no songs are present', () => {
    render(
      <PlaylistContent
        playlist={{ id: 1, name: 'Sample Playlist' }}
        songs={[]}
        deleteSong={mockDeleteSong}
        deleteSongs={mockDeleteSongs}
        fetchSongs={mockFetchSongs}
        onSongClick={mockOnSongClick}
      />
    );
    expect(screen.getByText('No songs available')).toBeInTheDocument();
  });

  test('handles multiple song selection with ctrl/cmd click', () => {
    renderComponent();
    const song1 = screen.getByText('Song 1');
    const song2 = screen.getByText('Song 2');
    fireEvent.click(song1, { ctrlKey: true });
    fireEvent.click(song2, { ctrlKey: true });
    expect(song1.parentNode).toHaveClass('selected');
    expect(song2.parentNode).toHaveClass('selected');
  });


});
