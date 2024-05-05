//Diese Datei wird genutzt um die Basic-Struktur der Webiste aufzubauen
/* Die Struktur besteht aus Header und Footer, die immer gleich sind, und
    den Mittelbereich (Outlet), der sich von Seite zu Seite unterscheidet
*/

import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from './pages/Header/Header'
import Footer from './pages/Footer/Footer'
import './index.css'

function Layout() {
  return (
    <div className='mainBody'>
    <Header/>
    <Outlet/>
    <Footer/>    
    </div>
  )
}

export default Layout