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
    expect(screen.getByAltText('MusicGallery')).toBeInTheDocument();
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

  test('navigates to home page on click', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/welcome/home" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByAltText('home'));
    await waitFor(() => expect(container.innerHTML).toMatch('Home Page'));
  });

  test('navigates to music gallery page on click', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/welcome/musicgallery" element={<div>Music Gallery Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByAltText('MusicGallery'));
    await waitFor(() => expect(container.innerHTML).toMatch('Music Gallery Page'));
  });

  test('navigates to add song page on click', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/welcome/addsong" element={<div>Add Song Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByAltText('addsong'));
    await waitFor(() => expect(container.innerHTML).toMatch('Add Song Page'));
  });

  test('navigates to internet explorer page on click', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/welcome/internet" element={<div>Internet Explorer Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByAltText('internetexplorer'));
    await waitFor(() => expect(container.innerHTML).toMatch('Internet Explorer Page'));
  });
});
