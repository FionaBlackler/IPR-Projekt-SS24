import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../../../src/pages/Header/Header';
import { AuthProvider, useAuth } from '../../../src/authContext';
import axios from 'axios';

jest.mock('axios');

jest.mock('../../../src/authContext', () => ({
  useAuth: jest.fn(), // Mock useAuth
  AuthProvider: ({ children }) => <div>{children}</div>, // Mock AuthProvider
}));

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuth.mockReturnValue({
      logout: jest.fn(),
      user: { firstname: 'TestUser' },
    });
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  test('renders Header component', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AuthProvider>
    );

    // Spezifische Abfrage für den Button
    expect(screen.getByRole('button', { name: /TripleF Music/i })).toBeInTheDocument();
  });

  test('opens and closes the menu', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AuthProvider>
    );

    const menuButton = screen.getByRole('button', { name: /TripleF Music/i });

    // Menü öffnen
    fireEvent.click(menuButton);
    expect(screen.getByText(/Welcome TestUser/i)).toBeInTheDocument();

    // Menü schließen
    fireEvent.click(menuButton);
    expect(screen.queryByText(/Welcome TestUser/i)).not.toBeInTheDocument();
  });

  test('opens and closes the settings modal', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AuthProvider>
    );

    const menuButton = screen.getByRole('button', { name: /TripleF Music/i });

    // Menü öffnen
    fireEvent.click(menuButton);
    const settingsOption = screen.getByText(/Settings/i);
    
    // Einstellungsmodal öffnen
    fireEvent.click(settingsOption);
    expect(screen.getByText(/Settings/i)).toBeInTheDocument();

    // Einstellungsmodal schließen
    const closeButton = screen.getByRole('button', { name: '' });
    fireEvent.click(closeButton);
    expect(screen.queryByText(/Settings/i)).not.toBeInTheDocument();
  });

  test('logs out the user', () => {
    const mockLogout = jest.fn();
    useAuth.mockReturnValue({
      logout: mockLogout,
      user: { firstname: 'TestUser' },
    });

    render(
      <AuthProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AuthProvider>
    );

    const menuButton = screen.getByRole('button', { name: /TripleF Music/i });

    // Menü öffnen
    fireEvent.click(menuButton);
    const logoutOption = screen.getByText(/Logout/i);
    
    // Benutzer abmelden
    fireEvent.click(logoutOption);
    expect(mockLogout).toHaveBeenCalled();
  });

  test('displays the user name correctly', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AuthProvider>
    );

    const menuButton = screen.getByRole('button', { name: /TripleF Music/i });

    // Menü öffnen
    fireEvent.click(menuButton);
    
    // Überprüfen, ob der Benutzername korrekt angezeigt wird
    expect(screen.getByText(/Welcome TestUser/i)).toBeInTheDocument();
  });

  test('toggles password visibility', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AuthProvider>
    );

    const menuButton = screen.getByRole('button', { name: /TripleF Music/i });

    // Menü öffnen
    fireEvent.click(menuButton);
    const settingsOption = screen.getByText(/Settings/i);
    fireEvent.click(settingsOption);

    // Passwort-Sichtbarkeit umschalten
    const toggleButton = screen.getByRole('img', { name: /toggle password visibility/i });
    fireEvent.click(toggleButton);

    // Stellen Sie sicher, dass die Eingabe vom Typ "text" ist, nachdem Sie auf das Umschalt-Symbol geklickt haben
    const newPasswordInput = screen.getByPlaceholderText('Type new password here...');
    expect(newPasswordInput).toHaveAttribute('type', 'text');
  });

  test('changes password successfully', async () => {
    axios.post.mockResolvedValueOnce({ data: { message: 'Password changed successfully!' } });
    render(
      <AuthProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AuthProvider>
    );

    const menuButton = screen.getByRole('button', { name: /TripleF Music/i });

    // Menü öffnen
    fireEvent.click(menuButton);
    const settingsOption = screen.getByText(/Settings/i);
    fireEvent.click(settingsOption);

    // Passwortfelder ausfüllen
    fireEvent.change(screen.getByPlaceholderText(/Type old password here.../i), { target: { value: 'oldPass' } });
    fireEvent.change(screen.getByPlaceholderText(/Type new password here.../i), { target: { value: 'newPass' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm new password here.../i), { target: { value: 'newPass' } });

    // Passwort ändern
    const changePasswordButton = screen.getByRole('button', { name: /Change Password/i });
    fireEvent.click(changePasswordButton);

    await waitFor(() => expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8080/api/change_password',
      { oldPassword: 'oldPass', newPassword: 'newPass' },
      expect.any(Object)
    ));

    expect(screen.getByText(/Password changed successfully!/i)).toBeInTheDocument();
  });

  test('fails to change password when new passwords do not match', async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AuthProvider>
    );

    const menuButton = screen.getByRole('button', { name: /TripleF Music/i });

    // Menü öffnen
    fireEvent.click(menuButton);
    const settingsOption = screen.getByText(/Settings/i);
    fireEvent.click(settingsOption);

    // Passwortfelder ausfüllen
    fireEvent.change(screen.getByPlaceholderText(/Type old password here.../i), { target: { value: 'oldPass' } });
    fireEvent.change(screen.getByPlaceholderText(/Type new password here.../i), { target: { value: 'newPass' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm new password here.../i), { target: { value: 'differentNewPass' } });

    // Passwort ändern
    const changePasswordButton = screen.getByRole('button', { name: /Change Password/i });
    fireEvent.click(changePasswordButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('New passwords do not match');
    });
  });

  test('deletes profile successfully', async () => {
    axios.delete.mockResolvedValueOnce({ data: { message: 'Profile deleted successfully!' } });
    const mockLogout = jest.fn();
    useAuth.mockReturnValue({
      logout: mockLogout,
      user: { firstname: 'TestUser' },
    });
  
    render(
      <AuthProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AuthProvider>
    );
  
    const menuButton = screen.getByRole('button', { name: /TripleF Music/i });
  
    // Menü öffnen
    fireEvent.click(menuButton);
    const settingsOption = screen.getByText(/Settings/i);
    fireEvent.click(settingsOption);
  
    // Profil löschen Tab auswählen
    const deleteProfileTab = screen.getByRole('tab', { name: /Delete Profile/i });
    fireEvent.click(deleteProfileTab);
  
    // Sicher-Checkbox aktivieren und Profil löschen
    const sureCheckbox = screen.getByRole('checkbox', { name: /Click if you are sure/i });
    fireEvent.click(sureCheckbox);
  
    const deleteProfileButton = screen.getByRole('button', { name: /Delete Profile/i });
    fireEvent.click(deleteProfileButton);
  
    await waitFor(() => expect(axios.delete).toHaveBeenCalledWith(
      'http://localhost:8080/api/delete_profile',
      expect.any(Object)
    ));
  
    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
    });
  
    // Debugging-Ausgabe des aktuellen DOM-Inhalts
    console.log(document.body.innerHTML);
  
    // Erfolgsmeldung suchen
    const successMessage = await screen.findByText((content, element) => {
      return content.includes('Profile deleted successfully!');
    });
    expect(successMessage).toBeInTheDocument();
  });
  
  
  
});
