import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <div className='headerBody'>
      <nav>
        <div>
         <div>Default Navbar (nur für die Entwicklung!)</div> 
          <NavLink to='/'>Logo hier</NavLink>
          <NavLink to='musicgallery'>Music Gallery</NavLink>
          <NavLink to='addsong'>Add Song</NavLink>
          <NavLink to='song'>Song</NavLink>
          <NavLink to='login'>Login</NavLink>
          <NavLink to='about'>About</NavLink>
        </div>
      </nav>
    </div>
  )
}

export default Header