import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Loader from "./Loader";
import ComputerCanvas from "../../models/computer";
import logo from "../Images/TripleF3_2.png";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import original from "react95/dist/themes/original"; //Thema der UI-Elemente
import { AppBar, Toolbar, Button, Handle } from "react95";
import vaporTeal from "react95/dist/themes/vaporTeal";
import "./Welcome.css";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <>
      <div className="header">
        <ThemeProvider theme={original}>
          <AppBar>
            <Toolbar style={{ justifyContent: "space-between" }}>
              <Button
                onClick={() => {
                  navigate("login");
                }}
                style={{ fontWeight: "bold", marginLeft: "2rem" }}
              >
                <img
                  src={logo}
                  alt="TripleF Music"
                  style={{ height: "20px", marginRight: 4 }}
                />
                Login
              </Button>

              <p style={{ marginRight: "2rem" }}>
                {new Date().getFullYear()} TripleF Music. All rights reserved.
              </p>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </div>
      <a onClick={() => {}}>
        <section className="home-container">
          <ComputerCanvas />
        </section>
      </a>
    </>
  );
}

export default Welcome;

/* 
   
*/
