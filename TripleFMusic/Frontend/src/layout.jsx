/**
 * This file is used to build the basic structure of the website.
 * The structure consists of a header and footer, which remain the same on every page,
 * and the middle section (Outlet), which varies from page to page.
 */

import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./pages/Header/Header";
//import Footer from "./pages/Footer/Footer";
import "./layout.css";

const layoutBackgroundStyle = {
  background: 'url("/images/wallpaper4.jpg") no-repeat center center fixed',
  backgroundSize: "cover",
  height: "91.9vh",
};

/**
 * Renders the layout of the website.
 * @returns {JSX.Element} The layout component.
 */
function Layout() {
  return (
    <div style={layoutBackgroundStyle}>
      <div className="main-body">
        <div className="outlet" style={layoutBackgroundStyle}>
          <Outlet />
        </div>
        <Header />
        {/*<Footer /> */}
      </div>
    </div>
  );
}

export default Layout;
