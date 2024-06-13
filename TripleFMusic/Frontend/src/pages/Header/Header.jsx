import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../Images/TripleF3_2.png";

import { ThemeProvider } from "styled-components";
import original from "react95/dist/themes/original"; // Thema der UI-Elemente
import {
  AppBar,
  Button,
  MenuList,
  MenuListItem,
  Separator,
  Toolbar
} from "react95";

function Header() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [open, setOpen] = useState(false);

  return (
    <div className="main-header">
      <ThemeProvider theme={original}>
        <AppBar className="appbar" style={{ position: "relative" }}>
          <Toolbar style={{ justifyContent: "space-between" }}>
            <Button
              onClick={() => setOpen(!open)}
              active={open}
              style={{ fontWeight: 'bold' }}
            >
              <img
                src={logo}
                alt='TripleF Music'
                style={{ height: '20px', marginRight: 4 }}
              />
              TripleF Music
            </Button>
            {open && (
              <MenuList
                style={{
                  position: 'absolute',
                  marginBottom: "0.1rem",
                  padding: "1rem",
                  left: '0',
                  bottom: '100%' // Öffnet das Menü nach oben
                }}
                onClick={() => setOpen(false)}
              >
               
                  <span role='img' aria-label='👨‍💻'>
                    👨‍💻
                  </span>
                  Welcome Funda!
                
                <Separator />
                <MenuListItem onClick={() => {
                  navigate("/");
                }}>
                  <span role='img' aria-label='🔙'>
                    🔙
                  </span>
                  Logout
                </MenuListItem>
              </MenuList>
            )}
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
