// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./layout.jsx";
import Home from "./pages/MainArea/Home.jsx";
import MusicGallery from "./pages/MainArea/MusicGallery.jsx";
import Song from "./pages/MainArea/Song.jsx";
import Login from "./pages/MainArea/Login.jsx";
import AddSong from "./pages/MainArea/AddSong.jsx";
import About from "./pages/MainArea/About.jsx";
import Welcome from "./pages/MainArea/Welcome.jsx";
import Register from "./pages/MainArea/Register.jsx";
import Internet from "./pages/MainArea/Internet.jsx";
import SnakeGame from "./pages/MainArea/SnakeGame.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<Welcome />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="welcome" element={<Layout />}>
        <Route path="home" element={<Home />} />
        <Route path="musicgallery" element={<MusicGallery />} />
        <Route path="song" element={<Song />} />
        <Route path="addsong" element={<AddSong />} />
        <Route path="about" element={<About />} />
        <Route path="internet" element={<Internet />} />
        <Route path="snake" element={<SnakeGame />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
