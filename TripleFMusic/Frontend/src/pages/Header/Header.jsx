import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "./TripleF3_2.png";

import { createGlobalStyle, ThemeProvider } from "styled-components";

import rose from "react95/dist/themes/rose"; //Thema der UI-Elemente
import { AppBar, Toolbar, Button } from "react95";
import vaporTeal from "react95/dist/themes/vaporTeal";

function Header() {
  return (
    <div className="header">
      <ThemeProvider theme={rose}>
        <AppBar position="fixed">
          <Toolbar style={{ justifyContent: "space-between" }}>
            <Button onClick={() => {}} style={{ fontWeight: "bold" }}>
              <img
                src={logo}
                alt="TripleF Music"
                style={{ height: "20px", marginRight: 4 }}
              />
              TripleF Music
            </Button>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}

export default Header;

/* 
   <nav>
        <div className='headerBody'>
          <NavLink to='/'>
            <img src={logo} className="logo" alt="TripleF Music" />
          </NavLink>
        </div>
      </nav>



*/
