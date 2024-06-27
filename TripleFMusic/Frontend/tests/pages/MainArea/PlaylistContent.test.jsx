import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlaylistContent from '../../../src/pages/MainArea/PlaylistContent';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';

const mockSongs = [
  { id: 1, songTitle: 'Song 1', artist: 'Artist 1', selectedGenres: ['Genre1'] },
  { id: 2, songTitle: 'Song 2', artist: 'Artist 2', selectedGenres: ['Genre2'] },
];

const setup = (overrides = {}) => {
  const defaultProps = {
    playlist: { id: 1 },
    onSongClick: jest.fn(),
    songs: mockSongs,
    deleteSong: jest.fn().mockResolvedValue(),
    deleteSongs: jest.fn().mockResolvedValue(),
    fetchSongs: jest.fn().mockResolvedValue(),
  };

  return render(
    <ThemeProvider theme={original}>
      <PlaylistContent {...defaultProps} {...overrides} />
    </ThemeProvider>
  );
};

describe('PlaylistContent', () => {
  test('renders songs correctly', () => {
    setup();

    mockSongs.forEach(song => {
      expect(screen.getByText(song.songTitle)).toBeInTheDocument();
      expect(screen.getByText(song.artist)).toBeInTheDocument();
      expect(screen.getByText(song.selectedGenres.join(', '))).toBeInTheDocument();
    });
  });

  test('selects and deselects songs on click', () => {
    setup();

    const songRow = screen.getByText('Song 1').closest('tr');
    fireEvent.click(songRow, { ctrlKey: true });
    expect(songRow).toHaveClass('selected');

    fireEvent.click(songRow, { ctrlKey: true });
    expect(songRow).not.toHaveClass('selected');
  });

  test('opens and closes context menu on right click', () => {
    setup();

    const songRow = screen.getByText('Song 1').closest('tr');
    fireEvent.contextMenu(songRow);
    expect(screen.getByText('Delete')).toBeInTheDocument();

    fireEvent.mouseDown(document);
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  test('deletes a single song', async () => {
    const deleteSongMock = jest.fn().mockResolvedValue();
    setup({ deleteSong: deleteSongMock });

    const songRow = screen.getByText('Song 1').closest('tr');
    fireEvent.contextMenu(songRow);
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    await waitFor(() => expect(deleteSongMock).toHaveBeenCalledWith(1, 1));
  });

  test('deletes multiple songs', async () => {
    const deleteSongsMock = jest.fn().mockResolvedValue();
    setup({ deleteSongs: deleteSongsMock });

    const firstSongRow = screen.getByText('Song 1').closest('tr');
    const secondSongRow = screen.getByText('Song 2').closest('tr');

    // Select multiple songs
    fireEvent.click(firstSongRow, { ctrlKey: true });
    fireEvent.click(secondSongRow, { ctrlKey: true });

    fireEvent.contextMenu(firstSongRow);
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    await waitFor(() => expect(deleteSongsMock).toHaveBeenCalledWith(1, [1, 2]));
  });

  test('opens and closes modal', () => {
    setup();

    const songRow = screen.getByText('Song 1').closest('tr');
    fireEvent.click(songRow);
    const modalButtons = screen.getAllByText('...');
    fireEvent.click(modalButtons[0]);

    expect(screen.getByText('Song Details')).toBeInTheDocument();
    const closeButton = screen.getByText((content, element) => element.className === 'song-details-close-icon');
    fireEvent.click(closeButton);

    expect(screen.queryByText('Song Details')).not.toBeInTheDocument();
  });

  

  test('renders modal with song details and handles input changes', () => {
    setup();

    const songRow = screen.getByText('Song 1').closest('tr');
    fireEvent.click(songRow);
    const modalButtons = screen.getAllByText('...');
    fireEvent.click(modalButtons[0]);

    expect(screen.getByText('Song Details')).toBeInTheDocument();
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    const songTitleInput = screen.getByDisplayValue('Song 1');
    fireEvent.change(songTitleInput, { target: { value: 'New Song Title' } });
    expect(songTitleInput.value).toBe('New Song Title');

    const artistInput = screen.getByDisplayValue('Artist 1');
    fireEvent.change(artistInput, { target: { value: 'New Artist' } });
    expect(artistInput.value).toBe('New Artist');

    const notesInput = screen.getByDisplayValue('');
    fireEvent.change(notesInput, { target: { value: 'New Notes' } });
    expect(notesInput.value).toBe('New Notes');
  });
});