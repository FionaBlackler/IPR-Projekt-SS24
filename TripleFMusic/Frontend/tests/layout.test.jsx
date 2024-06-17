import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../src/pages/Header/Header.jsx';
import Layout from '../src/layout.jsx';

// Mocking useNavigate from react-router-dom
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test('renders Layout component', () => {
  render(
    <Router>
      <Layout />
    </Router>
  );

  const buttonElement = screen.getByRole('button', { name: /TripleF Music/i }); // Ensure correct role
  expect(buttonElement).toBeInTheDocument();

  // Simulate button click to test if the menu toggles
  fireEvent.click(buttonElement);
  expect(mockedUsedNavigate).not.toHaveBeenCalled();

  // Check for menu items after button click
  const menuItem = screen.getByText(/Logout/i);
  expect(menuItem).toBeInTheDocument();

  // Simulate menu item click to test navigation
  fireEvent.click(menuItem);
  expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
});

test('renders Header component', () => {
  render(
    <Router>
      <Header />
    </Router>
  );

  const logoElement = screen.getByAltText('TripleF Music Logo'); // Ensure correct alt text
  expect(logoElement).toBeInTheDocument();

  const loginButton = screen.getByRole('button', { name: /Login/i });
  expect(loginButton).toBeInTheDocument();

  const signupButton = screen.getByRole('button', { name: /Sign Up/i });
  expect(signupButton).toBeInTheDocument();
});

test('renders Outlet component', () => {
  render(
    <Router>
      <Outlet />
    </Router>
  );

  // Add assertions specific to the Outlet component
});

test('navigates to correct route on menu item click', () => {
  render(
    <Router>
      <Layout />
    </Router>
  );

  const buttonElement = screen.getByRole('button', { name: /TripleF Music/i });

  // Simulate button click to open the menu
  fireEvent.click(buttonElement);

  const menuItem = screen.getByText(/Logout/i);

  // Simulate menu item click to test navigation
  fireEvent.click(menuItem);
  expect(mockedUsedNavigate).toHaveBeenCalledWith('/');

  // Add more assertions for other menu items and their respective routes
});