import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../Images/TripleF3_2.png";

import { ThemeProvider } from "styled-components";
import original from "react95/dist/themes/original"; // Thema der UI-Elemente
import {
  AppBar,
  Toolbar,
  Button,
  MenuList,
  Separator,
  MenuListItem,
} from "react95";

function Header() {
  const navigate = useNavigate(); // Initialize useNavigate

  const [open, setOpen] = useState(false);

  return (
    <div className="main-header">
      <ThemeProvider theme={original}>
        <AppBar className="appbar" position="relative">
          <Toolbar style={{ justifyContent: "space-between", position: "relative" }}>
            <Button
              onClick={() => setOpen(!open)}
              active={open}
              style={{ fontWeight: 'bold', marginLeft: "2rem"}}
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
                  left: '0',
                  bottom: '60%', // Menü öffnet sich nach oben
                  width: '185px', // Ändern Sie die Breite des Menüs
                  
                  transform: 'translateY(-10px)' // Verschieben Sie das Menü vertikal
                }}
                onClick={() => setOpen(false)}
              >
                
                <span role='img' aria-label='👨‍💻' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  👨‍💻  welcome Funda! 
                </span>
                 
                
                <Separator />
                <MenuListItem onClick={() => navigate("/")}>
                  <span role='img' aria-label='🔙' style={{ justifyContent: 'center' }}>
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
