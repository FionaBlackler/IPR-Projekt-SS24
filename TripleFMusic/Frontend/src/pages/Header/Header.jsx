// src/pages/Header/Header.jsx

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
import { useAuth } from "../../authContext"; 

function Header() {
  const navigate = useNavigate(); // Initialize useNavigate
  const { logout } = useAuth(); // Destructure logout from useAuth

  console.log("useNavigate:", navigate);

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate("/"); // Redirect to the homepage
  };

  return (
    <div className="main-header">
      <ThemeProvider theme={original}>
        <AppBar className="appbar" position="relative">
          <Toolbar style={{ justifyContent: "space-between", position: "relative" }}>
            <Button
              onClick={() => setOpen(!open)}
              active={open ? "true" : undefined} // Changed here
              style={{ fontWeight: 'bold', marginLeft: "2rem" }}
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
                  bottom: '60%', // Menu opens upwards
                  width: '185px',
                  transform: 'translateY(-10px)' // Vertically shift the menu
                }}
                onClick={() => setOpen(false)}
              >
                <span role='img' aria-label='👨‍💻' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  👨‍💻  Welcome Funda!
                </span>
                <Separator />
                <MenuListItem onClick={handleLogout}>
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
