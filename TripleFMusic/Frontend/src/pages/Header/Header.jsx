import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../Images/TripleF3_2.png";

import { ThemeProvider } from "styled-components";
import rose from "react95/dist/themes/original"; // Thema der UI-Elemente
import {
  AppBar,
  Toolbar,
  Button,
  Handle,
  MenuList,
  Separator,
  MenuListItem,
} from "react95";

function Header() {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="main-header">
      <ThemeProvider theme={rose}>
        <AppBar className="appbar" position="relative">
          <Toolbar style={{ justifyContent: "space-between" }}>
            <Button
              onClick={() => {
                navigate("home");
              }}
              style={{ fontWeight: "bold", marginLeft: "2rem" }}
            >
              <img
                src={logo}
                alt="TripleF Music"
                style={{ height: "20px", marginRight: 4 }}
              />
              TripleF Music
            </Button>
            <Button
              onClick={() => {
                navigate("/");
              }}
            >
              Logout
            </Button>

            <p style={{ marginRight: "2rem" }}>
              {new Date().getFullYear()} TripleF Music. All rights reserved.
            </p>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}

export default Header;
