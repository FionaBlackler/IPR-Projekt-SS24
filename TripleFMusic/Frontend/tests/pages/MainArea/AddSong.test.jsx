import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
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
    const { getByLabelText } = render(
      <Router>
        <AddSong />
      </Router>
    );

    const playlistCheckbox = getByLabelText("All");

    fireEvent.click(playlistCheckbox);
    expect(playlistCheckbox.checked).toBe(true);

    fireEvent.click(playlistCheckbox);
    expect(playlistCheckbox.checked).toBe(false);
  });

  /*

  test("toggles genre selection", () => {
    const { getByLabelText } = render(
      <Router>
        <AddSong />
      </Router>
    );

    const genreCheckbox = getByLabelText("All");

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

    expect(screen.getByText("Song saved successfully!")).toBeInTheDocument();
  });

  test("navigates to music gallery after successful submission", async () => {
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

    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 3000);
  }); */
});
