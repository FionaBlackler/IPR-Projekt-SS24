import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "../src/pages/Header/Header.jsx";
import Layout from "../src/layout.jsx";

// Mocking useNavigate from react-router-dom
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("../src/authContext.jsx", () => ({
  useAuth: () => ({
    logout: jest.fn(),
    user: { name: "Test User" },
    isAuthenticated: true,
    login: jest.fn(),
    loading: false,
  }),
}));

test("renders Layout component", () => {
  render(
    <Router>
      <Layout />
    </Router>
  );

  const buttonElement = screen.getByRole("button", { name: /TripleF Music/i });
  expect(buttonElement).toBeInTheDocument();

  fireEvent.click(buttonElement);
  expect(mockedUsedNavigate).not.toHaveBeenCalled();

  const menuItem = screen.getByText(/Logout/i);
  expect(menuItem).toBeInTheDocument();

  fireEvent.click(menuItem);
  expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
});

test("renders Header component", () => {
  render(
    <Router>
      <Header />
    </Router>
  );

  const logoElement = screen.getByAltText("TripleF Music");
  expect(logoElement).toBeInTheDocument();
});

test("renders Outlet component", () => {
  render(
    <Router>
      <Outlet />
    </Router>
  );
});

test("navigates to correct route on menu item click", () => {
  render(
    <Router>
      <Layout />
    </Router>
  );

  const buttonElement = screen.getByRole("button", { name: /TripleF Music/i });
  fireEvent.click(buttonElement);

  const menuItem = screen.getByText(/Logout/i);
  fireEvent.click(menuItem);
  expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
});
