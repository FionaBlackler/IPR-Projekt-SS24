import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Header.css";
import logo from "../Images/TripleF3_2.png";
import { ThemeProvider } from "styled-components";
import original from "react95/dist/themes/original";
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
  Checkbox,
  GroupBox,
  TextInput,
  Tabs,
  Tab,
  TabBody,
} from "react95";
import { useAuth } from "../../authContext";
import Draggable from "react-draggable";



function Header() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  
  const [sure, setSure] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [state, setState] = useState({
    activeTab: 0,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [success, setSuccess] = useState(false);

  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { activeTab, oldPassword, newPassword, confirmPassword } = state;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleMenuClick = () => {
    setOpen(!open);
  };

  const handleWelcomeClick = (event) => {
    event.stopPropagation();
  };
  const handleChange = (value) => {
    setState({
      activeTab: value,
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setSure(false);
    setMessage('');
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleChangePassword = async () => {
    const { oldPassword, newPassword, confirmPassword } = state;
  
    if (newPassword !== confirmPassword) {
      window.alert('New passwords do not match');
      return;
    }
  
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/api/change_password', {
        oldPassword,
        newPassword,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      //window.alert(response.data.message);
      setState({ ...state, oldPassword: '', newPassword: '', confirmPassword: '' });
      setSuccess(true);       // Show the success message
        setTimeout(() => {
          setSuccess(false);    // Hide the success message
        }, 3000); // 3 seconds delay
    } catch (error) {
      console.error('Error changing password:', error);
      window.alert('Error changing password');
    }
  };

  const handleDeleteProfile = async () => {
    if (!sure) {
      window.alert('Please confirm that you want to delete your profile');
      return;
    }
  
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await axios.delete('http://localhost:8080/api/delete_profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      window.alert(response.data.message);
      logout();
      navigate("/");
    } catch (error) {
      console.error('Error deleting profile:', error);
      window.alert('Error deleting profile');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setState({
      activeTab: 0,
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setSure(false);
    setMessage('');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [headerRef, menuRef]);

  
  return (
    <div className="main-header" ref={headerRef}>
      <ThemeProvider theme={original}>
        <AppBar className="appbar" position="relative">
          <Toolbar style={{ justifyContent: "space-between", position: "relative" }}>
            <Button
              onClick={handleMenuClick}
              active={open ? "true" : undefined}
              style={{ fontWeight: "bold", marginLeft: "2rem" }}
            >
              <img src={logo} alt="TripleF Music" style={{ height: "20px", marginRight: 4 }} />
              TripleF Music
            </Button>

            {open && (
              <MenuList
                ref={menuRef}
                style={{
                  position: "absolute",
                  left: "0",
                  bottom: "60%",
                  width: "185px",
                  transform: "translateY(-10px)",
                  padding: "8px",
                  zIndex: "10",
                }}
                onClick={() => setOpen(false)}
              >
                <div
                  onClick={handleWelcomeClick}
                  style={{ textAlign: "center", marginBottom: "9px", cursor: "default" }}
                >
                  <span role="img" aria-label="🤗" style={{ fontSize: "24px" }}>
                    🤗
                  </span>
                  <br />
                  Welcome {user?.firstname || 'Guest'} {}!
                </div>

                <Separator style={{ margin: "4px 0" }} />

                <MenuListItem onClick={openModal} style={{ display: "flex", alignItems: "center" }}>
                  <span role="img" aria-label="⚙️" style={{ marginRight: "8px", fontSize: "20px" }}>
                    ⚙️
                  </span>
                  Settings
                </MenuListItem>

                <Separator style={{ margin: "4px 0" }} />

                <MenuListItem onClick={handleLogout} style={{ display: "flex", alignItems: "center" }}>
                  <span role="img" aria-label="👋" style={{ marginRight: "8px", fontSize: "20px" }}>
                    👋
                  </span>
                  Logout
                </MenuListItem>
              </MenuList>
            )}

            <p style={{ marginRight: "2rem" }}>{new Date().getFullYear()} TripleF Music. All rights reserved.</p>
          </Toolbar>
        </AppBar>

        {isModalOpen && (
          <div className="setting-modal" style={{ height: 200 }}>
            <Draggable handle=".setting-window-header">
              <Window style={{ height: 500, width: 700, marginTop: 50 }}>
                <WindowHeader className="setting-window-header">
                  <span>Settings</span>
                  <Button onClick={closeModal}>
                    <span className="setting-close-icon" />
                  </Button>
                </WindowHeader>
                <WindowContent>
                  <div className="setting-wrapper" style={{ height: 415 }}>
                    <Tabs value={activeTab} onChange={handleChange}>
                      <Tab value={0}>Edit Profile</Tab>
                      <Tab value={1}>Delete Profile</Tab>
                      <Tab value={2}>Help/Support</Tab>
                    </Tabs>
                    <TabBody style={{ height: 'calc(100% - 50px)', overflow: 'auto', padding: '10px' }}>
                      {activeTab === 0 && (
                        <div>
                          <GroupBox label="Password Manager:">
                            <div style={{ marginBottom: "10px" }}>
                              <span style={{ display: "block", marginBottom: "5px" }}>Old Password:</span>
                              <TextInput
                                type={showPassword ? "text" : "password"}
                                name="oldPassword"
                                value={oldPassword}
                                placeholder="Type old password here..."
                                onChange={handlePasswordChange}
                                fullWidth
                                style={{ marginBottom: "10px" }}
                              />
                              <span style={{ display: "block", marginBottom: "5px" }}>New Password:</span>
                              <TextInput
                                type={showPassword ? "text" : "password"}
                                name="newPassword"
                                value={newPassword}
                                placeholder="Type new password here..."
                                onChange={handlePasswordChange}
                                fullWidth
                                style={{ marginBottom: "10px" }}
                              />
                              <span style={{ display: "block", marginBottom: "5px" }}>Confirm New Password:</span>
                              <TextInput
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={confirmPassword}
                                placeholder="Confirm new password here..."
                                onChange={handlePasswordChange}
                                fullWidth
                                style={{ marginBottom: "10px" }}
                              />
                              <span 
                                role="img" 
                                aria-label="toggle password visibility" 
                                style={{ fontSize: "24px", marginLeft: 580, cursor: "pointer" }}
                                onClick={toggleShowPassword}
                              >
                                {showPassword ? "🙈" : "👁️"}
                              </span>
                              <Button onClick={handleChangePassword} style={{ width: "100%", marginTop: "10px" }}>Change Password</Button>
                              {message && <p>{message}</p>}
                            </div>
                          </GroupBox>
                        </div>
                      )}
                      {activeTab === 1 && (
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                          <GroupBox label="Delete Profile:" style={{ flexGrow: 1 }}>
                            <div style={{ marginBottom: "10px" }}>
                              <p>
                                Oh no, what a tragedy! How will we ever discover new music without your impeccable taste
                                leading the way? Your playlists were the pinnacle of musical genius, and now we'll have
                                to fumble around in the dark without your guidance. Farewell, dear music maestro. The
                                app just won't be the same without you. Good luck finding tunes elsewhere—if that's even
                                possible!
                              </p>
                            </div>
                          </GroupBox>
                          <div style={{ marginTop: 'auto' }}>
                            <Checkbox
                              label="Click if you are sure"
                              checked={sure}
                              onChange={() => setSure(!sure)}
                            />
                            <Button onClick={handleDeleteProfile} style={{ width: "100%", marginTop: "10px" }} disabled={!sure}>
                              Delete Profile
                            </Button>
                            {message && <p>{message}</p>}
                          </div>
                        </div>
                      )}
                      {activeTab === 2 && (
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                          <GroupBox label="Contact support:" style={{ flexGrow: 1 }}>
                            <div style={{ marginBottom: "10px" }}>
                              <p>
                                Oh, you need help? What a surprise! We're absolutely shocked that our perfectly flawless
                                app might have confused you. But don't worry, our support team is here to save the day.
                                Feel free to reach out—if you dare. We promise to respond with all the enthusiasm of a
                                Monday morning.
                              </p>
                            </div>
                          </GroupBox>
                          <div style={{ marginTop: 'auto' }}>
                            <a href="mailto:info.triplefmusic@gmail.com">
                              <Button style={{ width: "100%", marginTop: "10px" }}>
                                info.triplefmusic@gmail.com
                              </Button>
                            </a>
                          </div>
                        </div>
                      )}
                    </TabBody>

                    {success && (
                      <div className="change-background">
                        <div className="change-div">
                          <Window className="change-window">
                            <WindowContent>
                              <p className="change-text">
                                Password changed successfully! Please wait a moment...
                              </p>
                            </WindowContent>
                          </Window>
                        </div>
                      </div>
                    )}
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
