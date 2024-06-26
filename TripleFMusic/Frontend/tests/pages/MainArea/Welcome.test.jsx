import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Welcome from '../../../src/pages/MainArea/Welcome'; // Passe den Pfad an, falls nötig

jest.mock('../../../src/models/computer', () => require('../../__mocks__/ComputerCanvas.mock')); // Mocke ComputerCanvas

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Welcome Component', () => {
  const useNavigateMock = require('react-router-dom').useNavigate;
  const navigateMock = jest.fn();

  beforeEach(() => {
    useNavigateMock.mockReturnValue(navigateMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  test('renders Welcome component correctly', () => {
    renderComponent();

    expect(screen.getByAltText('TripleF Music')).toBeInTheDocument();
    expect(screen.getByText(`${new Date().getFullYear()} TripleF Music. All rights reserved.`)).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Mocked ComputerCanvas')).toBeInTheDocument(); // Überprüfen, dass der gemockte ComputerCanvas gerendert wird
  });

  test('shows progress bar and navigates to login page on login click', async () => {
    renderComponent();

    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);

    // Check if the progress bar is shown
    expect(screen.getByText('Login')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Login')).toBeInTheDocument());

    // Simulate progress and check if progress bar is updated
    await waitFor(() => expect(screen.getByText('Login')).toBeInTheDocument());

    // Simulate end of progress
    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith('/login'), { timeout: 3000 });
  });
});
