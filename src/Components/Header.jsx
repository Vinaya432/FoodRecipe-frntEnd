import React, { useContext } from 'react'
import {Navbar,Container} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { tokenAuthenticationContext } from '../Context API/TokenAuthent'

function Header() {
  const {isAuthorised,setIsAuthorised}=useContext(tokenAuthenticationContext)

  const navigate=useNavigate()
  const handleLogout=()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("role")
    sessionStorage.clear()
    setIsAuthorised(false)
    navigate('/login')
  }
  return (
    <div>
        <Navbar fixed="top">
        <Container >
          <Navbar.Brand  className='d-flex align-items-center' >
            <h1 className='fw-bold animate-charcter'>Flavor Fusion</h1>
          </Navbar.Brand>
          <div>
            <button onClick={handleLogout} style={{fontSize:'20px'}} className='btn fw-bolder'><i className="fa-solid fa-gears fa-beat-fade me-2"></i>Logout</button>
          </div>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header