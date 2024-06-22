import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
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
import { AuthProvider } from "./authContext";
import PrivateRoute from "./PrivateRoute";

const ProtectedLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Welcome />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route element={<PrivateRoute />}>
        <Route path="welcome" element={<ProtectedLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="musicgallery" element={<MusicGallery />} />
          <Route path="song" element={<Song />} />
          <Route path="addsong" element={<AddSong />} />
          <Route path="about" element={<About />} />
          <Route path="internet" element={<Internet />} />
          <Route path="snake" element={<SnakeGame />} />
        </Route>
      </Route>
      {/* Fallback Route for undefined paths */}
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
