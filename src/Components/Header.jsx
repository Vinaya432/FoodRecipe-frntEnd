import React from 'react'
import {Navbar,Container} from 'react-bootstrap'
import Logo from '../assets/Images/Applogo.png'

function Header() {
  return (
    <div>
        <Navbar>
        <Container>
          <Navbar.Brand href="#home" className='d-flex'>
            <img alt="logo" src={Logo}  width="50" height="50" />
            FlavorFusion
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header