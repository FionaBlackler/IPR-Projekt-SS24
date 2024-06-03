//Diese Datei wird genutzt um die Basic-Struktur der Webiste aufzubauen
/* Die Struktur besteht aus Header und Footer, die immer gleich sind, und
    den Mittelbereich (Outlet), der sich von Seite zu Seite unterscheidet
*/

import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./pages/Header/Header";
import Footer from "./pages/Footer/Footer";
import "./layout.css";

const layoutBackgroundStyle = {
  background: 'url("/images/wallpaper4.jpg") no-repeat center center fixed',
  backgroundSize: "cover",
  height: "91.9vh",
};

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
