import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <div className='body-copyrights'>
      <p>
        {new Date().getFullYear()} TripleF Music. All rights reserved.
      </p>
    </div>
  )
}

export default Footer