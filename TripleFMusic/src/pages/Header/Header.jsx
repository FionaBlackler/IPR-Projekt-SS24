import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'
import logo from "./TripleF3.png"

function Header() {
  return (
    
      <nav>
        <div className='headerBody'>
          <NavLink to='/'>
            <img src={logo} className="logo" alt="TripleF Music" />
          </NavLink>
        </div>
      </nav>
    
  )
}

export default Header