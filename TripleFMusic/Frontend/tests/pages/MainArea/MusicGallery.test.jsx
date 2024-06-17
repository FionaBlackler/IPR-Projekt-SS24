import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MusicGallery from '../../../src/pages/MainArea/MusicGallery';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Mocking useNavigate from react-router-dom
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

// Setting up axios mock adapter
const mock = new MockAdapter(axios);
mock.onGet('http://localhost:8080/api/playlists').reply(200, []);

describe('MusicGallery Component', () => {
  test('renders MusicGallery component', () => {
    render(
      <Router>
        <MusicGallery />
      </Router>
    );

    // Check if certain elements are present
    const aboutIcon = screen.getByAltText('About');
    const homeIcon = screen.getByAltText('home');
    const musicGalleryIcon = screen.getByAltText('Music Gallery');
    const addSongIcon = screen.getByAltText('addsong');
    const internetexplorerIcon = screen.getByAltText('internetexplorer');
    const addButton = screen.getByText('Add Song');

    expect(aboutIcon).toBeInTheDocument();
    expect(homeIcon).toBeInTheDocument();
    expect(musicGalleryIcon).toBeInTheDocument();
    expect(addSongIcon).toBeInTheDocument();
    expect(internetexplorerIcon).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test('navigates to correct route on icon click', () => {
    render(
      <Router>
        <MusicGallery />
      </Router>
    );

    // Simulate icon clicks to test navigation
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

  test('opens and closes add mixtape modal', () => {
    render(
      <Router>
        <MusicGallery />
      </Router>
    );

    // Open the modal
    fireEvent.click(screen.getByText('Add Mixtape'));
    const modal = screen.getByText('Add New Mixtape');
    expect(modal).toBeInTheDocument();

    // Close the modal
    fireEvent.click(screen.getByText('Cancel'));
    expect(modal).not.toBeInTheDocument();
  });

  // Add more tests for other functionalities if needed
});
