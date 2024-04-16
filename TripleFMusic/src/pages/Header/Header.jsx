import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header>
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
    </header>
  )
}

export default Header