import React, { useState, useRef, useEffect } from "react";
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
  Window,
  WindowHeader,
  WindowContent,
  ScrollView,
  Anchor,
  GroupBox,
  NumberInput,
  Tab,
  TabBody,
  Tabs,

} from "react95"; // sicherstellen, dass alle benötigten Komponenten importiert sind
import { useAuth } from "../../authContext";
import Draggable from "react-draggable";

function Header() {
  const navigate = useNavigate(); // Initialize useNavigate
  const { logout } = useAuth(); // Destructure logout from useAuth

  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const headerRef = useRef(null); // Ref für den gesamten Header-Bereich erstellen
  const menuRef = useRef(null); // Ref für das Menü erstellen

  useEffect(() => {
    // Funktion zum Überprüfen des Klicks außerhalb des Menüs und des Headers
    const handleClickOutside = (event) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target) &&
        !menuRef.current.contains(event.target)
      ) {
        // Klick war außerhalb des Menüs und des Headers
        setOpen(false); // Menü schließen
      }
    };

    // Event-Listener hinzufügen
    document.addEventListener("mousedown", handleClickOutside);

    // Clean-up: Event-Listener entfernen
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [headerRef, menuRef]);

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate("/"); // Redirect to the homepage
  };

  const handleMenuClick = () => {
    setOpen(!open);
  };

  const handleWelcomeClick = (event) => {
    event.stopPropagation(); // Klick auf "Welcome User" stoppen, um das Menü nicht zu schließen
  };



  return (
    <div className="main-header" ref={headerRef}>
      <ThemeProvider theme={original}>
        <AppBar className="appbar" position="relative">
          <Toolbar style={{ justifyContent: "space-between", position: "relative" }}>
            <Button
              onClick={handleMenuClick}
              active={open ? "true" : undefined}
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
                ref={menuRef} // Ref dem Menü zuweisen
                style={{
                  position: 'absolute',
                  left: '0',
                  bottom: '60%', // Menu opens upwards
                  width: '185px',
                  transform: 'translateY(-10px)', // Vertically shift the menu
                  padding: '8px', // Innenabstand hinzugefügt
                  zIndex: '10', // Z-Index für die Stapelreihenfolge hinzugefügt
                }}
                onClick={() => setOpen(false)}
              >
                <div
                  onClick={handleWelcomeClick} // Klick auf "Welcome User" abfangen
                  style={{ textAlign: 'center', marginBottom: '9px', cursor: 'default' }} // Cursor auf default setzen, um anzuzeigen, dass nicht klickbar ist
                >
                  <span role='img' aria-label='🤗' style={{ fontSize: '24px' }}>
                    🤗
                  </span>
                  <br />
                  Welcome User!
                </div>
                
                <Separator style={{ margin: '4px 0' }} /> {/* Abstand zum Separator hinzugefügt */}
                
                <MenuListItem onClick={openModal} style={{ display: 'flex', alignItems: 'center' }}>
                  <span role='img' aria-label='⚙️'  style={{ marginRight: '8px', fontSize: '20px' }}>
                    ⚙️
                  </span>
                  Settings
                </MenuListItem>
                
                <Separator style={{ margin: '4px 0' }} /> {/* Abstand zum Separator hinzugefügt */}
                
                <MenuListItem onClick={handleLogout} style={{ display: 'flex', alignItems: 'center' }}>
                  <span role='img' aria-label='👋' style={{ marginRight: '8px', fontSize: '20px' }}>
                    👋
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

        {isModalOpen && (
          <div className="setting-modal">
            <Draggable handle=".setting-window-header">
              <Window style={{ height:600, width: 700, marginTop: 50 }}>
                <WindowHeader className="setting-window-header">
                  <span>Settings</span>
                  <Button onClick={closeModal}>
                    <span className="setting-close-icon" />
                  </Button>
                </WindowHeader>
                <WindowContent>
                  <div className="setting-wrapper">
                  
          
                  </div>
                  
                  <Separator />
                </WindowContent>
              </Window>
            </Draggable>
          </div>
        )}
      </ThemeProvider>
    </div>
  );
}


export default Header;
