import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../../../src/pages/MainArea/Login";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { AuthProvider } from "../../../src/authContext";

// Mocking useNavigate from react-router-dom
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

// Mocking react-three-fiber and drei
jest.mock("@react-three/fiber", () => ({
  Canvas: ({ children }) => <div>{children}</div>,
}));

jest.mock("@react-three/drei", () => ({
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

const mockAxios = new MockAdapter(axios);

beforeEach(() => {
  mockedUsedNavigate.mockReset();
  mockAxios.reset();
});
/*
test('renders Login component', () => {
  render(
    <Router>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </Router>
  );
  
  expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
  expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
});

test('login button triggers API call and navigation on success', async () => {
  mockAxios.onPost('http://localhost:8080/api/login').reply(200, {
    token: 'fake-token',
    user: { username: 'testuser' }
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
  
  await act(async () => {
    fireEvent.click(screen.getByText(/Login/i));
  });

  expect(mockedUsedNavigate).toHaveBeenCalledWith('/welcome/home');
});

test('login button shows error message on failure', async () => {
  mockAxios.onPost('http://localhost:8080/api/login').reply(401);

  render(
    <Router>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </Router>
  );

  fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'testuser' } });
  fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'testpassword' } });
  
  await act(async () => {
    fireEvent.click(screen.getByText(/Login/i));
  });

  expect(mockedUsedNavigate).not.toHaveBeenCalled();
  expect(screen.getByText(/Login failed. Please check your credentials and try again./i)).toBeInTheDocument();
});
*/

test("forgot password modal shows and hides correctly", () => {
  render(
    <Router>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </Router>
  );

  // Öffnen Sie das 'Forgot Password'-Modal
  fireEvent.click(screen.getByText(/Forgot password\?/i));
  expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();

  // Suchen Sie das Schließen-Button im Modal und klicken Sie darauf
  const closeButton = screen.getByRole("button", { name: /×/i });
  fireEvent.click(closeButton);
  expect(
    screen.queryByPlaceholderText(/Enter your email/i)
  ).not.toBeInTheDocument();
});

test("forgot password button triggers API call on success", async () => {
  mockAxios
    .onPost("http://localhost:8080/api/forgot_password")
    .reply(200, { userExists: true });

  render(
    <Router>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </Router>
  );

  fireEvent.click(screen.getByText(/Forgot password?/i));
  fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
    target: { value: "testemail@example.com" },
  });

  await act(async () => {
    fireEvent.click(screen.getByText(/Send Inquiry/i));
  });

  expect(
    screen.getByText(
      /Inquiry sent. Please check your email for further instructions./i
    )
  ).toBeInTheDocument();
});
