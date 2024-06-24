import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import MusicGallery from "../../../src/pages/MainArea/MusicGallery";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Mocking useNavigate from react-router-dom
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

// Setting up axios mock adapter
const mock = new MockAdapter(axios);
mock.onGet("http://localhost:8080/api/playlists").reply(200, [
  { id: 1, name: "Playlist 1" },
  { id: 2, name: "Playlist 2" },
]);
mock.onPost("http://localhost:8080/api/playlists").reply(200, {
  id: 3,
  name: "New Playlist",
});
mock.onDelete("http://localhost:8080/api/playlists/1").reply(200);
mock.onGet("http://localhost:8080/api/playlists/1/songs").reply(200, [
  { songTitle: "Song 1", artist: "Artist 1", selectedGenres: ["Genre1"] },
  { songTitle: "Song 2", artist: "Artist 2", selectedGenres: ["Genre2"] },
]);

describe("MusicGallery Component", () => {
  test("renders MusicGallery component", async () => {
    await act(async () => {
      render(
        <Router>
          <MusicGallery />
        </Router>
      );
    });

    // Check if certain elements are present
    const aboutIcon = screen.getByAltText("About");
    const homeIcon = screen.getByAltText("home");
    const musicGalleryIcon = screen.getByAltText("Music Gallery");
    const addSongIcon = screen.getByAltText("addsong");
    const internetexplorerIcon = screen.getByAltText("internetexplorer");
    const addButton = screen.getByText("Add Song");

    expect(aboutIcon).toBeInTheDocument();
    expect(homeIcon).toBeInTheDocument();
    expect(musicGalleryIcon).toBeInTheDocument();
    expect(addSongIcon).toBeInTheDocument();
    expect(internetexplorerIcon).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test("navigates to correct route on icon click", async () => {
    await act(async () => {
      render(
        <Router>
          <MusicGallery />
        </Router>
      );
    });

    // Simulate icon clicks to test navigation
    fireEvent.click(screen.getByAltText("About"));
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/welcome/about");

    fireEvent.click(screen.getByAltText("home"));
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/welcome/home");

    fireEvent.click(screen.getByAltText("Music Gallery"));
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/welcome/musicgallery");

    fireEvent.click(screen.getByAltText("addsong"));
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/welcome/addsong");

    fireEvent.click(screen.getByAltText("internetexplorer"));
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/welcome/internet");
  });

  test("opens and closes add mixtape modal", async () => {
    await act(async () => {
      render(
        <Router>
          <MusicGallery />
        </Router>
      );
    });

    // Open the modal
    await act(async () => {
      fireEvent.click(screen.getByText("Add Mixtape"));
    });
    const modal = screen.getByText("Add New Mixtape");
    expect(modal).toBeInTheDocument();

    // Close the modal
    await act(async () => {
      fireEvent.click(screen.getByText("Cancel"));
    });
    expect(modal).not.toBeInTheDocument();
  });

  test("adds new playlist", async () => {
    await act(async () => {
      render(
        <Router>
          <MusicGallery />
        </Router>
      );
    });

    // Open the modal
    await act(async () => {
      fireEvent.click(screen.getByText("Add Mixtape"));
    });
    const modal = screen.getByText("Add New Mixtape");
    expect(modal).toBeInTheDocument();

    // Enter playlist name
    const input = screen.getByPlaceholderText("Playlist Name");
    await act(async () => {
      fireEvent.change(input, { target: { value: "New Playlist" } });
    });

    // Add the new playlist
    await act(async () => {
      fireEvent.click(screen.getByText("Add"));
    });

    // Check if the new playlist is added to the list
    const newPlaylist = await screen.findByText("New Playlist");
    expect(newPlaylist).toBeInTheDocument();
  });

  test("opens context menu and deletes a playlist", async () => {
    await act(async () => {
      render(
        <Router>
          <MusicGallery />
        </Router>
      );
    });

    // Open context menu
    const playlistItem = await screen.findByTestId("playlist-link-1");
    await act(async () => {
      fireEvent.contextMenu(playlistItem);
    });

    const contextMenuButton = await screen.findByText("Delete");
    expect(contextMenuButton).toBeInTheDocument();

    // Delete playlist
    await act(async () => {
      fireEvent.click(contextMenuButton);
    });

    // Verify playlist is deleted
    await act(async () => {
      expect(screen.queryByTestId("playlist-item-1")).not.toBeInTheDocument();
    });
  });

  test("selects a playlist and displays its songs", async () => {
    await act(async () => {
      render(
        <Router>
          <MusicGallery />
        </Router>
      );
    });

    // Select a playlist
    const playlistItem = await screen.findByTestId("playlist-link-1");
    await act(async () => {
      fireEvent.click(playlistItem);
    });

    // Check if the playlist's songs are displayed
    const song1 = await screen.findByText("Song 1");
    const song2 = await screen.findByText("Song 2");
    expect(song1).toBeInTheDocument();
    expect(song2).toBeInTheDocument();
  });

  // New test case to check if error message is displayed when fetching playlists fails
  test("displays error message when fetching playlists fails", async () => {
    mock.onGet("http://localhost:8080/api/playlists").reply(500);

    // Mock window.alert
    window.alert = jest.fn();

    await act(async () => {
      render(
        <Router>
          <MusicGallery />
        </Router>
      );
    });

    expect(window.alert).toHaveBeenCalledWith("Error fetching playlists");
  });
});
