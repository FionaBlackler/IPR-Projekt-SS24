import React from "react";
import {
  render,
  renderHook,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import AddSong from "../../../src/pages/MainArea/AddSong";

// Mock Axios
jest.mock("axios");

// Mock window.alert
global.alert = jest.fn();

describe("AddSong Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders AddSong component without crashing", () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <AddSong />
      </Router>
    );

    expect(getByPlaceholderText("Add song title")).toBeInTheDocument();
    expect(getByPlaceholderText("Add artist name")).toBeInTheDocument();
    expect(getByText("Upload mp3 file")).toBeInTheDocument();
    expect(getByText("Upload song cover")).toBeInTheDocument();
  });

  test("handles mp3 file upload", () => {
    const { getByText, container } = render(
      <Router>
        <AddSong />
      </Router>
    );

    const file = new File(["sample"], "sample.mp3", { type: "audio/mp3" });
    const input = container.querySelector('input[type="file"][accept=".mp3"]');

    fireEvent.change(input, { target: { files: [file] } });
    expect(input.files[0]).toEqual(file);
    expect(input.files.length).toBe(1);
  });

  test("handles jpg file upload", () => {
    const { getByText, container } = render(
      <Router>
        <AddSong />
      </Router>
    );

    const file = new File(["sample"], "sample.jpg", { type: "image/jpeg" });
    const input = container.querySelector('input[type="file"][accept=".jpg"]');

    fireEvent.change(input, { target: { files: [file] } });
    expect(input.files[0]).toEqual(file);
    expect(input.files.length).toBe(1);
  });

  test("submits the form successfully", async () => {
    const { getByText, getByPlaceholderText } = render(
      <Router>
        <AddSong />
      </Router>
    );

    axios.post.mockResolvedValue({ data: "Upload successful" });
    fetch.mockResponseOnce(JSON.stringify([])); // Mock the fetch response

    fireEvent.change(getByPlaceholderText("Add song title"), {
      target: { value: "Sample Song" },
    });
    fireEvent.change(getByPlaceholderText("Add artist name"), {
      target: { value: "Sample Artist" },
    });

    const saveButton = getByText("Save");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:8080/api/songs",
        expect.any(FormData),
        expect.objectContaining({
          headers: { "Content-Type": "multipart/form-data" },
        })
      );
    });

    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  test("handles form submission failure", async () => {
    const { getByText, getByPlaceholderText } = render(
      <Router>
        <AddSong />
      </Router>
    );

    axios.post.mockRejectedValue(new Error("Upload failed"));
    fetch.mockResponseOnce(JSON.stringify([])); // Mock the fetch response

    fireEvent.change(getByPlaceholderText("Add song title"), {
      target: { value: "Sample Song" },
    });
    fireEvent.change(getByPlaceholderText("Add artist name"), {
      target: { value: "Sample Artist" },
    });

    const saveButton = getByText("Save");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:8080/api/songs",
        expect.any(FormData),
        expect.objectContaining({
          headers: { "Content-Type": "multipart/form-data" },
        })
      );
    });

    expect(alert).toHaveBeenCalledWith("Upload failed");
  });

  test("toggles playlist selection", () => {
    const { getAllByLabelText } = render(
      <Router>
        <AddSong />
      </Router>
    );

    const playlistCheckbox = getAllByLabelText("All")[0];

    fireEvent.click(playlistCheckbox);
    expect(playlistCheckbox.checked).toBe(true);

    fireEvent.click(playlistCheckbox);
    expect(playlistCheckbox.checked).toBe(false);
  });

  test("toggles genre selection", () => {
    const { getAllByLabelText } = render(
      <Router>
        <AddSong />
      </Router>
    );

    const genreCheckbox = getAllByLabelText("All")[1];

    fireEvent.click(genreCheckbox);
    expect(genreCheckbox.checked).toBe(true);

    fireEvent.click(genreCheckbox);
    expect(genreCheckbox.checked).toBe(false);
  });

  test("displays confirmation message after successful submission", async () => {
    const { getByText, getByPlaceholderText } = render(
      <Router>
        <AddSong />
      </Router>
    );

    axios.post.mockResolvedValue({ data: "Upload successful" });
    fetch.mockResponseOnce(JSON.stringify([])); // Mock the fetch response

    fireEvent.change(getByPlaceholderText("Add song title"), {
      target: { value: "Sample Song" },
    });
    fireEvent.change(getByPlaceholderText("Add artist name"), {
      target: { value: "Sample Artist" },
    });

    const saveButton = getByText("Save");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    expect(
      screen.getByText((content, element) => {
        return (
          element.tagName.toLowerCase() === "p" &&
          content.includes("Song saved successfully!")
        );
      })
    ).toBeInTheDocument();
  });

  test("navigates to music gallery after successful submission", async () => {
    jest.spyOn(global, "setTimeout");

    const { getByText, getByPlaceholderText } = render(
      <Router>
        <AddSong />
      </Router>
    );

    axios.post.mockResolvedValue({ data: "Upload successful" });
    fetch.mockResponseOnce(JSON.stringify([])); // Mock the fetch response

    fireEvent.change(getByPlaceholderText("Add song title"), {
      target: { value: "Sample Song" },
    });
    fireEvent.change(getByPlaceholderText("Add artist name"), {
      target: { value: "Sample Artist" },
    });

    const saveButton = getByText("Save");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 2000);
    });

    global.setTimeout.mockRestore();
  });

  test("confirmation window closes after timeout", async () => {
    jest.useFakeTimers();
    const { getByText, getByPlaceholderText } = render(
      <Router>
        <AddSong />
      </Router>
    );

    axios.post.mockResolvedValue({ data: "Upload successful" });
    fetch.mockResponseOnce(JSON.stringify([])); // Mock the fetch response

    fireEvent.change(getByPlaceholderText("Add song title"), {
      target: { value: "Sample Song" },
    });
    fireEvent.change(getByPlaceholderText("Add artist name"), {
      target: { value: "Sample Artist" },
    });

    const saveButton = getByText("Save");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(
        screen.queryByText("Song saved successfully!")
      ).not.toBeInTheDocument();
    });

    jest.useRealTimers();
  });

  test("handles song title input change", () => {
    const { getByPlaceholderText } = render(
      <Router>
        <AddSong />
      </Router>
    );

    const songTitleInput = getByPlaceholderText("Add song title");
    fireEvent.change(songTitleInput, { target: { value: "New Song Title" } });
    expect(songTitleInput.value).toBe("New Song Title");
  });

  test("handles artist input change", () => {
    const { getByPlaceholderText } = render(
      <Router>
        <AddSong />
      </Router>
    );

    const artistInput = getByPlaceholderText("Add artist name");
    fireEvent.change(artistInput, { target: { value: "New Artist Name" } });
    expect(artistInput.value).toBe("New Artist Name");
  });

  test("handles individual playlist selection", async () => {
    const mockPlaylists = [
      { id: 1, name: "Playlist 1" },
      { id: 2, name: "Playlist 2" },
    ];
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockPlaylists),
    });

    const { findByLabelText } = render(
      <Router>
        <AddSong />
      </Router>
    );

    const playlistCheckbox = await findByLabelText("Playlist 1");

    fireEvent.click(playlistCheckbox);
    expect(playlistCheckbox.checked).toBe(true);

    fireEvent.click(playlistCheckbox);
    expect(playlistCheckbox.checked).toBe(false);
  });

  test("handles individual genre selection", () => {
    const { getByLabelText } = render(
      <Router>
        <AddSong />
      </Router>
    );

    const genreCheckbox = getByLabelText("Rock");

    fireEvent.click(genreCheckbox);
    expect(genreCheckbox.checked).toBe(true);

    fireEvent.click(genreCheckbox);
    expect(genreCheckbox.checked).toBe(false);
  });

  test("displays error message on fetch playlists failure", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Failed to fetch"));

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <Router>
        <AddSong />
      </Router>
    );

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error fetching playlists:",
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });
});
