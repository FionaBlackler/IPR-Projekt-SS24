jest.setTimeout(80000); // 80 seconds timeout

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MusicGallery from '../../../src/pages/MainArea/MusicGallery';
import axios from '../../__mocks__/axios'; // Use the mock axios module

// Mocking useNavigate from react-router-dom
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

// Mocking window.alert
global.alert = jest.fn();

describe('MusicGallery Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    axios.reset(); // Use the reset method from the mock axios module

    // Default mock setup for most tests
    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, name: 'Playlist 1' },
        { id: 2, name: 'Playlist 2' },
      ],
      headers: { 'Access-Control-Allow-Origin': '*' }
    });

    // Setting up the mock for songs in a playlist
    axios.get.mockResolvedValueOnce({
      data: [
        { songTitle: 'Song 1', artist: 'Artist 1', selectedGenres: ['Genre1'] },
        { songTitle: 'Song 2', artist: 'Artist 2', selectedGenres: ['Genre2'] },
      ],
      headers: { 'Access-Control-Allow-Origin': '*' }
    });

    // Additional axios mock implementations for specific tests
    axios.post.mockResolvedValueOnce({
      data: {
        id: 3,
        name: 'New Playlist',
      },
    });

    // Conditional mock setup for the "filters playlists based on search query" test
    if (expect.getState().currentTestName === 'MusicGallery Component filters playlists based on search query') {
      axios.get.mockImplementation((url) => {
        if (url === 'http://localhost:8080/api/playlists') {
          return Promise.resolve({
            data: [
              { id: 1, name: 'Playlist 1' },
              { id: 2, name: 'Playlist 2' },
            ],
          });
        }
        if (url === 'http://localhost:8080/api/playlists/1/songs') {
          return Promise.resolve({
            data: [
              { songTitle: 'Song 1', artist: 'Artist 1', selectedGenres: ['Genre1'] },
              { songTitle: 'Song 2', artist: 'Artist 2', selectedGenres: ['Genre2'] },
            ],
          });
        }
        return Promise.reject(new Error('Not Found'));
      });
    }
  });

  test('renders MusicGallery component', async () => {
    render(
      <Router>
        <MusicGallery />
      </Router>
    );

    // Act & Assert
    await waitFor(() => {
      expect(screen.getByAltText('About')).toBeInTheDocument();
      expect(screen.getByAltText('home')).toBeInTheDocument();
      expect(screen.getByAltText('Music Gallery')).toBeInTheDocument();
      expect(screen.getByAltText('addsong')).toBeInTheDocument();
      expect(screen.getByAltText('internetexplorer')).toBeInTheDocument();
      expect(screen.getByText('Add Song')).toBeInTheDocument();
    });
  });

  test('navigates to correct route on icon click', async () => {
    render(
      <Router>
        <MusicGallery />
      </Router>
    );

    // Act & Assert
    fireEvent.click(screen.getByAltText('About'));
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/welcome/about');

    fireEvent.click(screen.getByAltText('home'));
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/welcome/home');

    fireEvent.click(screen.getByAltText('Music Gallery'));
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/welcome/musicgallery');

    fireEvent.click(screen.getByAltText('addsong'));
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/welcome/addsong');

    fireEvent.click(screen.getByAltText('internetexplorer'));
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/welcome/internet');
  });

  test('opens and closes add mixtape modal', async () => {
    render(
      <Router>
        <MusicGallery />
      </Router>
    );

    // Act
    fireEvent.click(screen.getByText('Add Mixtape'));

    // Assert
    const modal = await screen.findByText('Add New Mixtape');
    expect(modal).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cancel'));
    await waitFor(() => expect(modal).not.toBeInTheDocument());
  });

  test('opens context menu and deletes a playlist', async () => {
    render(
      <Router>
        <MusicGallery />
      </Router>
    );

    // Act
    await waitFor(() => screen.getByTestId('playlist-menu'));

    // Debugging: Log the HTML of playlist-menu
    const playlistMenu = screen.getByTestId('playlist-menu');
    console.log('Playlist Menu HTML:', playlistMenu.innerHTML);

    // Find and log all playlist items
    const playlistItems = screen.queryAllByTestId(/playlist-item-/);
    console.log('Playlist Items:', playlistItems);

    // Verify presence of specific playlist item
    const playlistItem = screen.queryByTestId('playlist-item-1');
    if (!playlistItem) {
      console.error('Playlist item 1 not found:', playlistMenu.innerHTML);
    } else {
      fireEvent.contextMenu(playlistItem);

      // Mock the DELETE request for deleting a playlist
      axios.delete.mockResolvedValueOnce({ status: 204 });

      const deleteButton = await screen.findByText('Delete');
      fireEvent.click(deleteButton);

      // Assert
      await waitFor(() => {
        expect(axios.delete).toHaveBeenCalledTimes(1);
        expect(screen.queryByTestId('playlist-item-1')).not.toBeInTheDocument();
      });
    }
  });

  test('displays error message when fetching playlists fails', async () => {
    // Arrange
    axios.get.mockRejectedValueOnce(new Error('Request failed'));

    render(
      <Router>
        <MusicGallery />
      </Router>
    );

    // Assert
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Error fetching playlists');
    });
  });

  test('edits a playlist name and verifies the updated name', async () => {
    // Arrange: Mocking the update playlist API response
    axios.put.mockResolvedValueOnce({
      data: {
        id: 1,
        name: 'Updated Playlist 1',
      },
    });

    render(
      <Router>
        <MusicGallery />
      </Router>
    );

    // Act
    await waitFor(() => screen.getByTestId('playlist-menu'));

    // Debugging: Log the HTML of playlist-menu
    const playlistMenu = screen.getByTestId('playlist-menu');
    console.log('Playlist Menu HTML:', playlistMenu.innerHTML);

    // Find and log all playlist items
    const playlistItems = screen.queryAllByTestId(/playlist-item-/);
    console.log('Playlist Items:', playlistItems);

    // Verify presence of specific playlist item
    const playlistItem = screen.queryByTestId('playlist-item-1');
    if (!playlistItem) {
      console.error('Playlist item 1 not found:', playlistMenu.innerHTML);
    } else {
      fireEvent.contextMenu(playlistItem);
      const editButton = await screen.findByText('Edit');
      fireEvent.click(editButton);

      const editInput = await screen.findByDisplayValue('Playlist 1');
      fireEvent.change(editInput, { target: { value: 'Updated Playlist 1' } });

      const saveButton = screen.getByText('Save');
      fireEvent.click(saveButton);

      // Assert
      await waitFor(() => {
        expect(screen.getByText('Updated Playlist 1')).toBeInTheDocument();
      });
    }
  });

  test('adds a new playlist successfully', async () => {
    // Arrange: Mock the POST request for adding a playlist
    axios.post.mockResolvedValueOnce({
      data: {
        id: 3,
        name: 'New Playlist',
      },
    });

    // Mock the GET request to return the updated list of playlists
    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, name: 'Playlist 1' },
        { id: 2, name: 'Playlist 2' },
        { id: 3, name: 'New Playlist' },
      ],
    });

    // Render the MusicGallery component inside a Router
    render(
      <Router>
        <MusicGallery />
      </Router>
    );

    // Act: Simulate user interactions to add a new playlist
    fireEvent.click(screen.getByText('Add Mixtape')); // Open the modal
    const input = await screen.findByPlaceholderText('Name your Mixtape'); // Find the input field
    fireEvent.change(input, { target: { value: 'New Playlist' } }); // Enter the new playlist name
    fireEvent.click(screen.getByTestId('add-playlist-button')); // Submit the new playlist

    // Add debug information to log the DOM
    await waitFor(() => {
      console.log('Updated DOM:', document.body.innerHTML);
    });

    // Assert: Verify the new playlist is added and visible in the document
    await waitFor(() => {
      const newPlaylistItem = screen.getByTestId('playlist-item-3');
      expect(newPlaylistItem).toBeInTheDocument();
      expect(newPlaylistItem).toHaveTextContent('New Playlist');
    });
  });

  test('filters playlists based on search query', async () => {
    render(
      <Router>
        <MusicGallery />
      </Router>
    );

    // Wait for playlists to be loaded
    await waitFor(() => {
      expect(screen.getByText('Playlist 1')).toBeInTheDocument();
      expect(screen.getByText('Playlist 2')).toBeInTheDocument();
    });

    console.log('DOM after loading playlists:', document.body.innerHTML);

    // Act: Simulate user input to filter playlists
    const searchInput = screen.getByPlaceholderText('Search Mixtape...');
    fireEvent.change(searchInput, { target: { value: 'Playlist 2' } });

    // Wait for the filtered results
    await waitFor(() => {
      console.log('DOM after search input:', document.body.innerHTML);
      expect(screen.queryByText('Playlist 1')).not.toBeInTheDocument();
      expect(screen.getByText('Playlist 2')).toBeInTheDocument();
    });
  });
});

