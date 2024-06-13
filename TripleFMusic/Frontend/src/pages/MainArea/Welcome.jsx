import React, { useState } from "react";
import ComputerCanvas from "../../models/computer";
import logo from "../Images/TripleF3_2.png";
import { ThemeProvider } from "styled-components";
import original from "react95/dist/themes/original"; // Theme der UI-Elemente
import { AppBar, Toolbar, Button } from "react95";
import "./Welcome.css"; // Importiere deine CSS-Datei für das Styling
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [progress, setProgress] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);

  const handleLoginClick = () => {
    setShowProgressBar(true);

    // Simuliere einen Fortschritt (ersetze durch deine eigene Logik)
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 10; // Beispiel: Erhöhe den Fortschritt um 10%
        } else {
          clearInterval(progressInterval);
          navigate("/login"); // Navigiere zur Login-Seite nach Abschluss
          return 100;
        }
      });
    }, 500); // Beispiel: Aktualisiere alle 0,5 Sekunden

    // Hier kannst du deine Login-Logik implementieren
    // Beispiel: API-Aufrufe, Authentifizierung usw.
  };

  return (
    <>
      <div className="header">
        <ThemeProvider theme={original}>
          <AppBar>
            <Toolbar style={{ justifyContent: "space-between" }}>
              <Button
                onClick={handleLoginClick}
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
      {showProgressBar && (
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </>
  );
}

export default Welcome;
