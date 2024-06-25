import React from "react";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { AuthProvider, useAuth } from "../src/authContext";
import { routes } from "../src/main.jsx"; // Ensure the correct import path

jest.mock("../src/layout.jsx", () => ({ children }) => (
  <div>Mocked Layout{children}</div>
));
jest.mock("../src/pages/MainArea/Home.jsx", () => () => <div>Mocked Home</div>);
jest.mock("../src/pages/MainArea/MusicGallery.jsx", () => () => (
  <div>Mocked Music Gallery</div>
));
jest.mock("../src/pages/MainArea/Song.jsx", () => () => <div>Mocked Song</div>);
jest.mock("../src/pages/MainArea/Login.jsx", () => () => (
  <div>Mocked Login</div>
));
jest.mock("../src/pages/MainArea/AddSong.jsx", () => () => (
  <div>Mocked Add Song</div>
));
jest.mock("../src/pages/MainArea/About.jsx", () => () => (
  <div>Mocked About</div>
));
jest.mock("../src/pages/MainArea/Welcome.jsx", () => () => (
  <div>Mocked Welcome</div>
));
jest.mock("../src/pages/MainArea/Register.jsx", () => () => (
  <div>Mocked Register</div>
));
jest.mock("../src/pages/MainArea/Internet.jsx", () => () => (
  <div>Mocked Internet</div>
));
jest.mock("../src/pages/MainArea/SnakeGame.jsx", () => () => (
  <div>Mocked Snake Game</div>
));
jest.mock("../src/pages/MainArea/ResetPassword.jsx", () => () => (
  <div>Mocked Reset Password</div>
));

jest.mock("../src/authContext", () => {
  const actualAuthContext = jest.requireActual("../src/authContext");
  return {
    ...actualAuthContext,
    useAuth: jest.fn(),
  };
});

describe("Main Router", () => {
  beforeAll(() => {
    // Create a mock root element in the document body
    const root = document.createElement("div");
    root.setAttribute("id", "root");
    document.body.appendChild(root);
  });

  beforeEach(() => {
    const { useAuth } = require("../src/authContext");
    useAuth.mockReturnValue({ isAuthenticated: true, loading: false });
  });

  test("renders welcome page by default", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    );

    expect(screen.getByText("Mocked Welcome")).toBeInTheDocument();
  });

  test("renders login page on /login", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login"],
    });

    render(
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    );

    expect(screen.getByText("Mocked Login")).toBeInTheDocument();
  });

  test("renders register page on /register", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/register"],
    });

    render(
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    );

    expect(screen.getByText("Mocked Register")).toBeInTheDocument();
  });

  test("renders home page on /welcome/home", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/welcome/home"],
    });

    render(
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    );

    console.log("Rendered HTML:", document.body.innerHTML);
    console.log("useAuth state:", useAuth.mock.results[0].value);

    expect(screen.getByText("Mocked Home")).toBeInTheDocument();
  });

  test("renders fallback route", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/some/undefined/path"],
    });

    render(
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    );

    expect(screen.getByText("Mocked Welcome")).toBeInTheDocument();
  });

  // Additional tests for other routes
  test("renders music gallery page on /welcome/musicgallery", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/welcome/musicgallery"],
    });

    render(
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    );

    expect(screen.getByText("Mocked Music Gallery")).toBeInTheDocument();
  });

  test("renders song page on /welcome/song", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/welcome/song"],
    });

    render(
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    );

    expect(screen.getByText("Mocked Song")).toBeInTheDocument();
  });

  test("renders add song page on /welcome/addsong", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/welcome/addsong"],
    });

    render(
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    );

    expect(screen.getByText("Mocked Add Song")).toBeInTheDocument();
  });

  test("renders about page on /welcome/about", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/welcome/about"],
    });

    render(
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    );

    expect(screen.getByText("Mocked About")).toBeInTheDocument();
  });

  test("renders internet page on /welcome/internet", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/welcome/internet"],
    });

    render(
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    );

    expect(screen.getByText("Mocked Internet")).toBeInTheDocument();
  });

  test("renders snake game page on /welcome/snake", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/welcome/snake"],
    });

    render(
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    );

    expect(screen.getByText("Mocked Snake Game")).toBeInTheDocument();
  });

  test("renders reset password page on /reset_password", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/reset_password"],
    });

    render(
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    );

    expect(screen.getByText("Mocked Reset Password")).toBeInTheDocument();
  });
});
