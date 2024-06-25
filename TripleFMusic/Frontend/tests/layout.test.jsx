import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router, Outlet } from "react-router-dom";
import axios from 'axios';
import Header from "../src/pages/Header/Header.jsx";
import Layout from "../src/layout.jsx";

// Mocking useNavigate from react-router-dom
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  Outlet: jest.fn(() => <div>Mocked Outlet</div>) // Mocking Outlet component with a mock content
}));

const mockLogout = jest.fn();
jest.mock("../src/authContext.jsx", () => ({
  useAuth: () => ({
    logout: mockLogout,
    user: { name: "Test User" },
    isAuthenticated: true,
    login: jest.fn(),
    loading: false,
  }),
}));

jest.mock('axios');

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

  const outletElement = screen.getByText("Mocked Outlet");
  expect(outletElement).toBeInTheDocument();
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

test("opens and closes settings modal", () => {
  render(
    <Router>
      <Layout />
    </Router>
  );

  // Open the menu
  const buttonElement = screen.getByRole("button", { name: /TripleF Music/i });
  fireEvent.click(buttonElement);

  // Open the settings modal
  const settingsButton = screen.getByText(/Settings/i);
  fireEvent.click(settingsButton);

  // Check if the settings modal is open
  const settingsModal = screen.getByText(/Settings/i);
  expect(settingsModal).toBeInTheDocument();

  // Find and click the close button inside the modal
  const closeModalButton = screen.getByRole("button", { name: "" });
  fireEvent.click(closeModalButton);

  // Check if the settings modal is closed
  expect(screen.queryByText(/Settings/i)).not.toBeInTheDocument();
});

test("changes password successfully", async () => {
  render(
    <Router>
      <Layout />
    </Router>
  );

  // Open the menu and settings modal
  const buttonElement = screen.getByRole("button", { name: /TripleF Music/i });
  fireEvent.click(buttonElement);
  const settingsMenuItem = screen.getByText(/Settings/i);
  fireEvent.click(settingsMenuItem);

  // Change password fields
  const oldPasswordInput = screen.getByPlaceholderText("Type old password here...");
  const newPasswordInput = screen.getByPlaceholderText("Type new password here...");
  const confirmPasswordInput = screen.getByPlaceholderText("Confirm new password here...");
  fireEvent.change(oldPasswordInput, { target: { value: 'oldPassword123' } });
  fireEvent.change(newPasswordInput, { target: { value: 'newPassword123' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'newPassword123' } });

  // Mock axios post response
  axios.post.mockResolvedValueOnce({});

  // Click change password button
  const changePasswordButton = screen.getByRole("button", { name: /Change Password/i });
  fireEvent.click(changePasswordButton);

  // Check for success message
  await waitFor(() => {
    const successMessage = screen.getByText(/Password changed successfully! Please wait a moment.../i);
    expect(successMessage).toBeInTheDocument();
  });
});

test("deletes profile successfully", async () => {
  render(
    <Router>
      <Layout />
    </Router>
  );

  // Open the menu and settings modal
  const buttonElement = screen.getByRole("button", { name: /TripleF Music/i });
  fireEvent.click(buttonElement);
  const settingsMenuItem = screen.getByText(/Settings/i);
  fireEvent.click(settingsMenuItem);

  // Switch to Delete Profile tab
  const deleteProfileTab = screen.getByText(/Delete Profile/i);
  fireEvent.click(deleteProfileTab);

  // Confirm delete
  const confirmCheckbox = screen.getByLabelText(/Click if you are sure/i);
  fireEvent.click(confirmCheckbox);

  // Mock axios delete response
  axios.delete.mockResolvedValueOnce({ data: { message: 'Profile deleted successfully' } });

  // Click delete profile button
  const deleteProfileButton = screen.getByRole("button", { name: /Delete Profile/i });
  fireEvent.click(deleteProfileButton);

  // Check for success message
  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith('Profile deleted successfully');
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
  });
});

test("toggles password visibility", () => {
  render(
    <Router>
      <Layout />
    </Router>
  );

  // Open the menu and settings modal
  const buttonElement = screen.getByRole("button", { name: /TripleF Music/i });
  fireEvent.click(buttonElement);
  const settingsMenuItem = screen.getByText(/Settings/i);
  fireEvent.click(settingsMenuItem);

  // Change password fields
  const newPasswordInput = screen.getByPlaceholderText("Type new password here...");
  fireEvent.change(newPasswordInput, { target: { value: 'newPassword123' } });

  // Toggle password visibility
  const toggleVisibilityButton = screen.getByLabelText(/toggle password visibility/i);
  fireEvent.click(toggleVisibilityButton);

  // Check if the password input type has changed to text
  expect(newPasswordInput.type).toBe('text');

  // Toggle password visibility back
  fireEvent.click(toggleVisibilityButton);

  // Check if the password input type has changed back to password
  expect(newPasswordInput.type).toBe('password');
});

test("handles logout correctly", () => {
  render(
    <Router>
      <Layout />
    </Router>
  );

  // Open the menu
  const buttonElement = screen.getByRole("button", { name: /TripleF Music/i });
  fireEvent.click(buttonElement);

  // Click logout
  const logoutButton = screen.getByText(/Logout/i);
  fireEvent.click(logoutButton);

  // Check if logout was called and navigation occurred
  expect(mockLogout).toHaveBeenCalled(); // Use the mockLogout function here
  expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
});

test("handles tab change correctly", () => {
  render(
    <Router>
      <Layout />
    </Router>
  );

  // Open the menu and settings modal
  const buttonElement = screen.getByRole("button", { name: /TripleF Music/i });
  fireEvent.click(buttonElement);
  const settingsMenuItem = screen.getByText(/Settings/i);
  fireEvent.click(settingsMenuItem);

  // Switch to Edit Profile tab
  const editProfileTab = screen.getByText(/Edit Profile/i);
  fireEvent.click(editProfileTab);

  // Verify Edit Profile tab is active
  expect(editProfileTab.getAttribute("aria-selected")).toBe("true");

  // Switch to Delete Profile tab
  const deleteProfileTab = screen.getByText(/Delete Profile/i);
  fireEvent.click(deleteProfileTab);

  // Verify Delete Profile tab is active
  expect(deleteProfileTab.getAttribute("aria-selected")).toBe("true");
});

test("handles password input changes correctly", () => {
  render(
    <Router>
      <Layout />
    </Router>
  );

  // Open the menu and settings modal
  const buttonElement = screen.getByRole("button", { name: /TripleF Music/i });
  fireEvent.click(buttonElement);
  const settingsMenuItem = screen.getByText(/Settings/i);
  fireEvent.click(settingsMenuItem);

  // Change password input fields
  const oldPasswordInput = screen.getByPlaceholderText("Type old password here...");
  const newPasswordInput = screen.getByPlaceholderText("Type new password here...");
  const confirmPasswordInput = screen.getByPlaceholderText("Confirm new password here...");
  fireEvent.change(oldPasswordInput, { target: { value: 'oldPassword123' } });
  expect(oldPasswordInput.value).toBe('oldPassword123');
  fireEvent.change(newPasswordInput, { target: { value: 'newPassword123' } });
  expect(newPasswordInput.value).toBe('newPassword123');
  fireEvent.change(confirmPasswordInput, { target: { value: 'newPassword123' } });
  expect(confirmPasswordInput.value).toBe('newPassword123');
});

test("verifies password match before submission", async () => {
  render(
    <Router>
      <Layout />
    </Router>
  );

  // Open the menu and settings modal
  const buttonElement = screen.getByRole("button", { name: /TripleF Music/i });
  fireEvent.click(buttonElement);
  const settingsMenuItem = screen.getByText(/Settings/i);
  fireEvent.click(settingsMenuItem);

  // Change password input fields
  const oldPasswordInput = screen.getByPlaceholderText("Type old password here...");
  const newPasswordInput = screen.getByPlaceholderText("Type new password here...");
  const confirmPasswordInput = screen.getByPlaceholderText("Confirm new password here...");
  fireEvent.change(oldPasswordInput, { target: { value: 'oldPassword123' } });
  fireEvent.change(newPasswordInput, { target: { value: 'newPassword123' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'differentPassword123' } });

  // Click change password button
  const changePasswordButton = screen.getByRole("button", { name: /Change Password/i });
  fireEvent.click(changePasswordButton);

  // Check for alert about mismatched passwords
  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith('New passwords do not match');
  });
});

test("closes settings modal on outside click", async () => {
  render(
    <Router>
      <Layout />
    </Router>
  );

  // Open the menu and settings modal
  const buttonElement = screen.getByRole("button", { name: /TripleF Music/i });
  fireEvent.click(buttonElement);
  const settingsMenuItem = screen.getByText(/Settings/i);
  fireEvent.click(settingsMenuItem);

  // Check if the settings modal is open
  const settingsModal = screen.getByText(/Settings/i);
  expect(settingsModal).toBeInTheDocument();

  // Click outside the modal
  fireEvent.mouseDown(document.body);

  // Check if the settings modal is closed
  await waitFor(() => {
    expect(screen.queryByText(/Settings/i)).not.toBeInTheDocument();
  });
});

