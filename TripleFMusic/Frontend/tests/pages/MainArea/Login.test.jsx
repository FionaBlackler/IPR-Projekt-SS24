import React from 'react';
import { render, screen, fireEvent, within, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ComputerCanvas from '../../../src/models/computer';
import Login from '../../../src/pages/MainArea/Login';
import axios from '../../__mocks__/axios'; // Use the mock axios module
import { AuthProvider, useAuth } from '../../../src/authContext';
import Loader from '../../../src/pages/MainArea/Loader';

// Mocking useNavigate from react-router-dom
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

// Mocking react-three-fiber and drei
jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children }) => <div>{children}</div>,
}));

jest.mock('@react-three/drei', () => ({
  Html: ({ children }) => <div>{children}</div>,
  OrbitControls: () => null,
  Preload: () => null,
  useGLTF: () => ({
    scene: {
      position: {
        set: jest.fn(),
      },
      scale: {
        set: jest.fn(),
      },
      rotation: {
        set: jest.fn(),
      },
    },
  }),
}));

const TestComponent = () => {
  const { login, logout, user } = useAuth();

  return (
    <div>
      <button onClick={() => login('fake-token', true, { username: 'testuser' })}>Login</button>
      <button onClick={logout}>Logout</button>
      {user && <span>{user.username}</span>}
    </div>
  );
};

beforeEach(() => {
  mockedUsedNavigate.mockReset();
  axios.reset(); // Use the reset method from the mock axios module
});

test('forgot password modal shows and hides correctly', () => {
  render(
    <Router>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </Router>
  );

  // Open the 'Forgot Password' modal
  fireEvent.click(screen.getByText(/Forgot password\?/i));
  expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();

  // Find the 'Forgot Password' modal in the DOM
  const modal = screen.getByText(/Forgot Password/).closest('div');

  // Find the close button in the modal and click it
  const closeButton = within(modal).getByTestId('forgot-password-close-button');
  fireEvent.click(closeButton);
  expect(screen.queryByPlaceholderText(/Enter your email/i)).not.toBeInTheDocument();
});

test('forgot password button triggers API call on success', async () => {
  axios.post.mockResolvedValueOnce({ data: { userExists: true } });

  render(
    <Router>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </Router>
  );

  fireEvent.click(screen.getByText(/Forgot password?/i));
  fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), { target: { value: 'testemail@example.com' } });

  await act(async () => {
    fireEvent.click(screen.getByText(/Send Inquiry/i));
  });

  expect(screen.getByText(/Inquiry sent. Please check your email for further instructions./i)).toBeInTheDocument();
});

test('login button triggers API call and navigation on success', async () => {
  axios.post.mockResolvedValueOnce({
    data: {
      token: 'fake-token',
      user: { username: 'testuser' },
    },
  });

  render(
    <Router>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </Router>
  );

  // Fill in the login details
  fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'testuser' } });
  fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'testpassword' } });

  // Find the specific login button in the login form and click it
  const loginButton = screen.getAllByText(/Login/i).find(button =>
    button.closest('.login-container')
  );

  await act(async () => {
    fireEvent.click(loginButton);
  });

  // Check if the navigation to the home page occurred
  expect(mockedUsedNavigate).toHaveBeenCalledWith('/welcome/home');
});

test('login sets user and token', async () => {
  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );

  await act(async () => {
    fireEvent.click(screen.getByText(/Login/i));
  });

  expect(screen.getByText(/testuser/i)).toBeInTheDocument();
  expect(localStorage.getItem('token')).toBe('fake-token');
});

test('logout clears user and token', async () => {
  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );

  await act(async () => {
    fireEvent.click(screen.getByText(/Login/i));
  });

  await act(async () => {
    fireEvent.click(screen.getByText(/Logout/i));
  });

  expect(screen.queryByText(/testuser/i)).not.toBeInTheDocument();
  expect(localStorage.getItem('token')).toBeNull();
});

test('renders ComputerCanvas component', () => {
  const { container } = render(<ComputerCanvas />);
  expect(container).toBeInTheDocument();
});

test('renders Loader component', () => {
  const { container } = render(<Loader />);
  expect(container).toBeInTheDocument();
  expect(container.querySelector('.loader-container')).toBeInTheDocument();
});

test('shows alert if username or password is missing', () => {
  window.alert = jest.fn();

  render(
    <Router>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </Router>
  );

  const loginButton = screen.getAllByText(/Login/i).find(button =>
    button.closest('.login-container')
  );

  fireEvent.click(loginButton);
  expect(window.alert).toHaveBeenCalledWith('Please enter both username and password.');
});

test('shows alert if login fails', async () => {
  window.alert = jest.fn();
  axios.post.mockRejectedValueOnce({ response: { status: 401 } });

  render(
    <Router>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </Router>
  );

  fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'testuser' } });
  fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'testpassword' } });

  const loginButton = screen.getAllByText(/Login/i).find(button =>
    button.closest('.login-container')
  );

  await act(async () => {
    fireEvent.click(loginButton);
  });

  expect(window.alert).toHaveBeenCalledWith('Login failed. Please check your credentials and try again.');
});

test('handles forgot password submission', async () => {
  axios.post.mockResolvedValueOnce({ data: { userExists: true } });

  render(
    <Router>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </Router>
  );

  fireEvent.click(screen.getByText(/Forgot password\?/i));
  fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), { target: { value: 'testemail@example.com' } });

  await act(async () => {
    fireEvent.click(screen.getByText(/Send Inquiry/i));
  });

  expect(screen.getByText(/Inquiry sent. Please check your email for further instructions./i)).toBeInTheDocument();
});

test('handles forgot password modal open and close', () => {
  render(
    <Router>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </Router>
  );

  fireEvent.click(screen.getByText(/Forgot password\?/i));
  expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('forgot-password-close-button'));
  expect(screen.queryByPlaceholderText(/Enter your email/i)).not.toBeInTheDocument();
});

test('toggles password visibility', () => {
  render(
    <Router>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </Router>
  );

  const toggleButton = screen.getByRole('img', { name: /toggle password visibility/i });

  fireEvent.click(toggleButton);
  expect(screen.getByPlaceholderText(/Password/i)).toHaveAttribute('type', 'text');

  fireEvent.click(toggleButton);
  expect(screen.getByPlaceholderText(/Password/i)).toHaveAttribute('type', 'password');
});

test('shows loading state during login', async () => {
  axios.post.mockImplementationOnce(() => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          data: {
            token: 'fake-token',
            user: { username: 'testuser' },
          },
        });
      }, 100); // Simulate delay
    });
  });

  render(
    <Router>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </Router>
  );

  fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'testuser' } });
  fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'testpassword' } });

  const loginButton = screen.getAllByText(/Login/i).find(button =>
    button.closest('.login-container')
  );

  await act(async () => {
    fireEvent.click(loginButton);
  });

  // Check if the loading state is displayed
  expect(screen.getByRole('button', { name: /Loading.../i })).toBeInTheDocument();

  // Wait for the request to complete
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
  });
});

test('shows success message and hides modal on successful password reset', async () => {
  axios.post.mockResolvedValueOnce({ data: { userExists: true } });

  render(
    <Router>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </Router>
  );

  fireEvent.click(screen.getByText(/Forgot password\?/i));
  fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), { target: { value: 'testemail@example.com' } });

  await act(async () => {
    fireEvent.click(screen.getByText(/Send Inquiry/i));
  });

  expect(screen.queryByPlaceholderText(/Enter your email/i)).not.toBeInTheDocument();
  expect(screen.getByText(/Inquiry sent. Please check your email for further instructions./i)).toBeInTheDocument();
});

test('navigates to login page after successful password reset', async () => {
  axios.post.mockResolvedValueOnce({ data: { userExists: true } });

  render(
    <Router>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </Router>
  );

  fireEvent.click(screen.getByText(/Forgot password\?/i));
  fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), { target: { value: 'testemail@example.com' } });

  await act(async () => {
    fireEvent.click(screen.getByText(/Send Inquiry/i));
  });

  await new Promise(resolve => setTimeout(resolve, 3000));

  expect(mockedUsedNavigate).toHaveBeenCalledWith('/login');
});

test('handles no user found during forgot password', async () => {
  axios.post.mockResolvedValueOnce({ data: { userExists: false } });

  render(
    <Router>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </Router>
  );

  fireEvent.click(screen.getByText(/Forgot password\?/i));
  fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), { target: { value: 'testemail@example.com' } });

  await act(async () => {
    fireEvent.click(screen.getByText(/Send Inquiry/i));
  });

  expect(window.alert).toHaveBeenCalledWith('No user found with the provided email.');
});

test('handles error during forgot password', async () => {
  axios.post.mockRejectedValueOnce(new Error('Request failed'));

  render(
    <Router>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </Router>
  );

  fireEvent.click(screen.getByText(/Forgot password\?/i));
  fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), { target: { value: 'testemail@example.com' } });

  await act(async () => {
    fireEvent.click(screen.getByText(/Send Inquiry/i));
  });

  expect(window.alert).toHaveBeenCalledWith('Error requesting password reset');
});

test('sets success message and closes modal after password reset', async () => {
  axios.post.mockResolvedValueOnce({ data: { userExists: true } });

  render(
    <Router>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </Router>
  );

  fireEvent.click(screen.getByText(/Forgot password\?/i));
  fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), { target: { value: 'testemail@example.com' } });

  await act(async () => {
    fireEvent.click(screen.getByText(/Send Inquiry/i));
  });

  expect(screen.getByText(/Inquiry sent. Please check your email for further instructions./i)).toBeInTheDocument();
  expect(screen.queryByPlaceholderText(/Enter your email/i)).not.toBeInTheDocument();
});

// Test to handle the case when username or password is missing
test('handleLogin sets loading state when username or password is missing', () => {
  render(
    <Router>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </Router>
  );

  const loginButton = screen.getAllByText(/Login/i).find(button => 
    button.closest('.login-container')
  );

  fireEvent.click(loginButton);
  expect(window.alert).toHaveBeenCalledWith('Please enter both username and password.');
  expect(screen.queryByRole('button', { name: /Loading.../i })).not.toBeInTheDocument();
});
