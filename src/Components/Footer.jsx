import React from 'react'
import AddRecipe from './AddRecipe';
import { Link } from 'react-router-dom';
import Profile from './Profile';

function Footer() {

  return (
    <>
      
      <div  className='container d-flex flex-wrap justify-content-center justify-content-lg-evenly w-75'>
        <div className='nav-item d-flex flex-column align-items-center justify-content-center mb-3'>
            <Link to={'/home'}>
               <button className='btn rounded-circle' style={{ width: '50px', height: '50px' }}><i className="fa-solid fa-house text-dark"></i></button>
  
            </Link>          
            <p className="text-center">Home</p>
        </div>
        <div className='nav-item d-flex flex-column align-items-center justify-content-center mb-3'>
          <Link to='/userrecipe'>
            <button className='btn rounded-circle' style={{ width: '50px', height: '50px' }}><i className="fa-solid fa-utensils text-dark"></i></button>
          </Link>
          <p className="text-center">My Recipes</p>
        </div>
        <div className='nav-item d-flex flex-column align-items-center justify-content-center'>
          <AddRecipe />
        </div>
        
        <div className='nav-item d-flex flex-column align-items-center justify-content-center mb-3'>
        <Link to='/favrecipe'>
            <button className='btn rounded-circle' style={{ width: '50px', height: '50px' }}><i className="fa-solid fa-heart text-dark"></i></button>
          </Link>
          <p className="text-center">My Favourites</p>
        </div>
        <div className='nav-item d-flex flex-column align-items-center justify-content-center mb-3'>
          <Profile />
          <p>Profile</p>
        </div>
      </div>



    </>
  )
}

export default Footer