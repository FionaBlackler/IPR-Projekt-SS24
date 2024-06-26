import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Home from '../../../src/pages/MainArea/Home';

describe('Home Component', () => {
  test('renders Home component with all icons', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Check for the presence of all icons
    expect(screen.getByAltText('About')).toBeInTheDocument();
    expect(screen.getByAltText('home')).toBeInTheDocument();
    expect(screen.getByAltText('Music Gallery')).toBeInTheDocument();
    expect(screen.getByAltText('addsong')).toBeInTheDocument();
    expect(screen.getByAltText('internetexplorer')).toBeInTheDocument();
  });

  test('navigates to about page on click', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/welcome/about" element={<div>About Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByAltText('About'));
    await waitFor(() => expect(container.innerHTML).toMatch('About Page'));
  });
/*
  test('navigates to other pages on click', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/welcome/home" element={<div>Home Page</div>} />
          <Route path="/welcome/musicgallery" element={<div>Music Gallery Page</div>} />
          <Route path="/welcome/addsong" element={<div>Add Song Page</div>} />
          <Route path="/welcome/internet" element={<div>Internet Explorer Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Function to click link by its text content
    const clickLinkByText = (text) => {
      const link = screen.getByText(text);
      fireEvent.click(link);
    };

    // Click on Home
    clickLinkByText('Home');
    await waitFor(() => expect(container.innerHTML).toMatch('Home Page'));

    // Click on Music Gallery
    clickLinkByText('Music Gallery');
    await waitFor(() => expect(container.innerHTML).toMatch('Music Gallery Page'));

    // Click on Upload new song
    clickLinkByText('Upload new song');
    await waitFor(() => expect(container.innerHTML).toMatch('Add Song Page'));

    // Click on Internet Explorer
    clickLinkByText('Internet Explorer');
    await waitFor(() => expect(container.innerHTML).toMatch('Internet Explorer Page'));
  });
  */
});
