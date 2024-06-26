import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MusicGallery from '../../../src/pages/MainArea/MusicGallery';

describe('MusicGallery', () => {
  test('renders MusicGallery component', async () => {
    render(
      <Router>
        <MusicGallery />
      </Router>
    );

    expect(screen.getByText(/MIXTAPES/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search Mixtape.../i)).toBeInTheDocument();
  });

  test('fetches and displays playlists', async () => {
    render(
      <Router>
        <MusicGallery />
      </Router>
    );

    // Assuming playlists data is available in your backend
    await waitFor(() => {
      expect(screen.getByText('Rock Classics')).toBeInTheDocument();
      expect(screen.getByText('Pop Hits')).toBeInTheDocument();
    });
  });

  test('opens and closes modal for adding new playlist', async () => {
    render(
      <Router>
        <MusicGallery />
      </Router>
    );

    fireEvent.click(screen.getByText(/Add Mixtape/i));
    expect(screen.getByText(/Add New Mixtape/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Cancel/i));
    await waitFor(() => {
      expect(screen.queryByText(/Add New Mixtape/i)).not.toBeInTheDocument();
    });
  });

  test('handles search input change', async () => {
    render(
      <Router>
        <MusicGallery />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Search Mixtape.../i), {
      target: { value: 'Rock' },
    });

    await waitFor(() => {
      expect(screen.getByText('Rock Classics')).toBeInTheDocument();
      expect(screen.queryByText('Pop Hits')).not.toBeInTheDocument();
    });
  });
});
