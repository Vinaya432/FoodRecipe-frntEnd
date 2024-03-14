import React from 'react'
import { Link } from 'react-router-dom'

function Splash() {
    
  return (
    <div className='mt-5 d-flex align-items-center justify-content-center flex-column'>
        <img className='img-fluid rounded-circle' style={{height:'400px',width:'400px'}}  src="https://i.pinimg.com/originals/a4/f3/88/a4f3885f4d2aacd3425bbd0ae65dcf8c.gif" alt="splash img" />
        <h1 className='splashHead fw-bold'>FlavorFusion</h1>
        <p >Spice up your life, one recipe at a time.</p>
        <Link to={'/login'}><button className='btn btn-warning rounded-pill'>Get Started</button></Link>
    </div>
  )
}

export default Splash



// https://i.pinimg.com/564x/84/87/fa/8487fa8ca7bd96fe69882c32441bdcb7.jpg