import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Register from '../../../src/pages/MainArea/Register';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { AuthProvider, useAuth } from '../../../src/authContext';

const mockAxios = new MockAdapter(axios);

beforeEach(() => {
  mockAxios.reset();
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  jest.useFakeTimers();
});

afterEach(() => {
  jest.restoreAllMocks();
  jest.useRealTimers();
});

const TestComponent = () => {
  const { isAuthenticated, login, logout, user, loading } = useAuth();
  
  return (
    <div>
      <div>isAuthenticated: {isAuthenticated.toString()}</div>
      <div>user: {user ? user.name : 'null'}</div>
      <div>loading: {loading.toString()}</div>
      <button onClick={() => login('testToken', true, { name: 'John Doe' })}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

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

test('handles generic registration error', async () => {
  mockAxios.onPost('http://localhost:8080/api/register').reply(500, {
    message: 'Something went wrong'
  });

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

  const termsCheckbox = screen.getByRole('checkbox');
  fireEvent.click(termsCheckbox);

  const registerButton = screen.getByText(/Register account/i);

  await act(async () => {
    fireEvent.click(registerButton);
  });

  expect(window.alert).toHaveBeenCalledWith('Something went wrong');
});

test('checks initial loading state and authentication status', () => {
  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );

  // Check initial loading state
  expect(screen.getByText(/loading: false/i)).toBeInTheDocument();
});

test('loads user from localStorage', async () => {
  localStorage.setItem('token', 'testToken');
  localStorage.setItem('user', JSON.stringify({ name: 'John Doe' }));

  await act(async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
  });

  expect(screen.getByText(/isAuthenticated: true/i)).toBeInTheDocument();
  expect(screen.getByText(/user: John Doe/i)).toBeInTheDocument();
  expect(screen.getByText(/loading: false/i)).toBeInTheDocument();
});

test('loads user from sessionStorage', async () => {
  sessionStorage.setItem('token', 'testToken');
  sessionStorage.setItem('user', JSON.stringify({ name: 'John Doe' }));

  await act(async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
  });

  expect(screen.getByText(/isAuthenticated: true/i)).toBeInTheDocument();
  expect(screen.getByText(/user: John Doe/i)).toBeInTheDocument();
  expect(screen.getByText(/loading: false/i)).toBeInTheDocument();
});

test('login sets token and user in localStorage', async () => {
  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );

  await act(async () => {
    fireEvent.click(screen.getByText('Login'));
  });

  expect(localStorage.getItem('token')).toBe('testToken');
  expect(localStorage.getItem('user')).toBe(JSON.stringify({ name: 'John Doe' }));
  expect(screen.getByText(/isAuthenticated: true/i)).toBeInTheDocument();
  expect(screen.getByText(/user: John Doe/i)).toBeInTheDocument();
});

test('logout clears token and user from storage', async () => {
  localStorage.setItem('token', 'testToken');
  localStorage.setItem('user', JSON.stringify({ name: 'John Doe' }));

  await act(async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
  });

  await act(async () => {
    fireEvent.click(screen.getByText('Logout'));
  });

  expect(localStorage.getItem('token')).toBeNull();
  expect(localStorage.getItem('user')).toBeNull();
  expect(screen.getByText(/isAuthenticated: false/i)).toBeInTheDocument();
  expect(screen.getByText(/user: null/i)).toBeInTheDocument();
});

test('handles case when no token or user is in storage', async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');

  await act(async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
  });

  expect(screen.getByText(/isAuthenticated: false/i)).toBeInTheDocument();
  expect(screen.getByText(/user: null/i)).toBeInTheDocument();
  expect(screen.getByText(/loading: false/i)).toBeInTheDocument();
});
test('displays error when username is already taken', async () => {
  mockAxios.onPost('http://localhost:8080/api/register').reply(400, {
    message: 'Username already taken'
  });

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

  const termsCheckbox = screen.getByRole('checkbox');
  fireEvent.click(termsCheckbox);

  const registerButton = screen.getByText(/Register account/i);

  await act(async () => {
    fireEvent.click(registerButton);
  });

  expect(window.alert).toHaveBeenCalledWith('Username is already taken');
});

test('displays error when email is already taken', async () => {
  mockAxios.onPost('http://localhost:8080/api/register').reply(400, {
    message: 'Email already taken'
  });

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

  const termsCheckbox = screen.getByRole('checkbox');
  fireEvent.click(termsCheckbox);

  const registerButton = screen.getByText(/Register account/i);

  await act(async () => {
    fireEvent.click(registerButton);
  });

  expect(window.alert).toHaveBeenCalledWith('Email is already taken');
});

test('toggles password visibility', () => {
  render(
    <Router>
      <AuthProvider>
        <Register />
      </AuthProvider>
    </Router>
  );

  const passwordInput = screen.getByPlaceholderText(/Password/i);
  const toggleButton = screen.getByLabelText('toggle password visibility');

  expect(passwordInput).toHaveAttribute('type', 'password');

  fireEvent.click(toggleButton);

  expect(passwordInput).toHaveAttribute('type', 'text');

  fireEvent.click(toggleButton);

  expect(passwordInput).toHaveAttribute('type', 'password');
});

test('opens and closes terms and conditions modal', () => {
  render(
    <Router>
      <AuthProvider>
        <Register />
      </AuthProvider>
    </Router>
  );

  const termsLink = screen.getByText(/terms and conditions/i);
  fireEvent.click(termsLink);

  // Suchen Sie alle Elemente mit dem Text "Terms and Conditions"
  const modalHeaders = screen.getAllByText(/Terms and Conditions/i);
  
  // Finden Sie das spezifische Element innerhalb des Modals
  const modalHeader = modalHeaders.find(header => 
    header.closest('.terms-modal-window')
  );

  expect(modalHeader).toBeInTheDocument();

  const closeButton = screen.getByText(/Close/i);
  fireEvent.click(closeButton);

  // Überprüfen, dass das Modal geschlossen wurde
  expect(screen.queryByText(/Welcome to TripleF Music!/i)).not.toBeInTheDocument();
});

test('handles field reset correctly', () => {
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

  const clearButton = screen.getByText(/Clear/i);
  fireEvent.click(clearButton);

  expect(screen.getByPlaceholderText(/Firstname/i)).toHaveValue('');
  expect(screen.getByPlaceholderText(/Lastname/i)).toHaveValue('');
  expect(screen.getByPlaceholderText(/Username/i)).toHaveValue('');
  expect(screen.getByPlaceholderText(/E-Mail/i)).toHaveValue('');
  expect(screen.getByPlaceholderText(/Password/i)).toHaveValue('');
  expect(screen.getByRole('checkbox')).not.toBeChecked();
});

test('shows error message when any field is missing', async () => {
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

  const registerButton = screen.getByText(/Register account/i);

  await act(async () => {
    fireEvent.click(registerButton);
  });

  expect(window.alert).toHaveBeenCalledWith('All fields are required');
});

test('shows error message when terms and conditions are not accepted', async () => {
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

  await act(async () => {
    fireEvent.click(registerButton);
  });

  expect(window.alert).toHaveBeenCalledWith('You must accept the terms and conditions');
});


test('navigates to login page after successful registration', async () => {
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

  const termsCheckbox = screen.getByRole('checkbox');
  fireEvent.click(termsCheckbox);

  const registerButton = screen.getByText(/Register account/i);

  await act(async () => {
    fireEvent.click(registerButton);
  });

  expect(screen.getByText(/Registration successful!/i)).toBeInTheDocument();

  // Use fake timers to advance time
  act(() => {
    jest.advanceTimersByTime(3000);
  });

  // Check if the component has navigated to the login page
  expect(screen.queryByText(/Registration successfully!/i)).not.toBeInTheDocument();
});
