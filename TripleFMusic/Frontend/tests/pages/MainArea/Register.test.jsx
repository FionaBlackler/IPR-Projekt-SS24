import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Register from '../../../src/pages/MainArea/Register';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { AuthProvider } from '../../../src/authContext';

const mockAxios = new MockAdapter(axios);

beforeEach(() => {
  mockAxios.reset();
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders Register component', () => {
  render(
    <Router>
      <AuthProvider>
        <Register />
      </AuthProvider>
    </Router>
  );

  expect(screen.getByPlaceholderText(/Firstname/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Lastname/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/E-Mail/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  expect(screen.getByText(/Register account/i)).toBeInTheDocument();
  expect(screen.getByText(/Clear/i)).toBeInTheDocument();
});

test('shows alert if any field is missing', () => {
  render(
    <Router>
      <AuthProvider>
        <Register />
      </AuthProvider>
    </Router>
  );

  const registerButton = screen.getByText(/Register account/i);
  fireEvent.click(registerButton);

  expect(window.alert).toHaveBeenCalledWith('All fields are required');
});

test('shows alert if terms and conditions are not accepted', () => {
  render(
    <Router>
      <AuthProvider>
        <Register />
      </AuthProvider>
    </Router>
  );

  fireEvent.change(screen.getByPlaceholderText(/Firstname/i), { target: { value: 'John' } });
  fireEvent.change(screen.getByPlaceholderText(/Lastname/i), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'johndoe' } });
  fireEvent.change(screen.getByPlaceholderText(/E-Mail/i), { target: { value: 'johndoe@example.com' } });
  fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password' } });

  const registerButton = screen.getByText(/Register account/i);
  fireEvent.click(registerButton);

  expect(window.alert).toHaveBeenCalledWith('You must accept the terms and conditions');
});

test('handles successful registration', async () => {
    mockAxios.onPost('http://localhost:8080/api/register').reply(201);
  
    render(
      <Router>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </Router>
    );
  
    fireEvent.change(screen.getByPlaceholderText(/Firstname/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Lastname/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByPlaceholderText(/E-Mail/i), { target: { value: 'johndoe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password' } });
  
    // Direkt auf die Checkbox zugreifen
    const termsCheckbox = screen.getByRole('checkbox', { name: "" });
    fireEvent.click(termsCheckbox);
  
    const registerButton = screen.getByText(/Register account/i);
  
    await act(async () => {
      fireEvent.click(registerButton);
    });
  
    expect(screen.getByText(/Registration successful!/i)).toBeInTheDocument();
  });


