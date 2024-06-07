import React, { Suspense } from "react";
import {
  Hourglass,
  Button,
  Window,
  WindowContent,
  WindowHeader,
} from "react95";
import "./Home.css";
import { ThemeProvider } from "styled-components";
import rose from "react95/dist/themes/rose"; //Thema der UI-Elemente
import aboutIcon from "../Images/icons/recycle2.png";
import galleryIcon from "../Images/icons/gallery4.png";
import addSongIcon from "../Images/icons/addsong2.png";
import { useNavigate } from "react-router-dom";
import homeIcon from "../Images/icons/computer3.png";
import internetexplorerIcon from "../Images/icons/internetexplorer.png";

function Internet() {
  const navigate = useNavigate(); // Initialize useNavigate

  return <div className="internet-body">Snake</div>;
}

export default Internet;
