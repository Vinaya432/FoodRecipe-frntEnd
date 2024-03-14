import React, { useContext, useEffect, useState } from 'react'
import RecipeCard from '../Components/RecipeCard'
import { getUserRecipeAPI } from '../Services/allAPI'
import { Col, Row } from 'react-bootstrap'
import { deleteRecipeResponseContext, editRecipeResponseContext } from '../Context API/ContentShare'
import { Link } from 'react-router-dom'
import Header from '../Components/Header'


function UserRecipe() {
  const [userRecipe,setUserRecipe]=useState([])

  const {deleteRecipeResponse,setDeleteRecipeResponse}=useContext(deleteRecipeResponseContext)
  const {editRecipeResponse,setEditRecipeResponse}=useContext(editRecipeResponseContext)

  const getUserRecipe =async ()=>{
    const token=sessionStorage.getItem("token")
    if(token){
      const reqHeader={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      const result= await getUserRecipeAPI(reqHeader)
      if(result.status==200){
        setUserRecipe(result.data)
      }else{
        console.log(result);
      }
      
    }
  }

  console.log(userRecipe);
  useEffect(()=>{
    getUserRecipe(),
    setDeleteRecipeResponse(false)
  },[deleteRecipeResponse,editRecipeResponse])
  return (
    <>
        <Header/>
        <div className='container-fluid' style={{marginTop:'100px'}}>
          <div className='d-flex align-items-center'>
            <Link to='/home'><i className="fa-solid fa-arrow-left fa-2x ms-2 fa-beat text-dark me-5"></i></Link>
            <h2 className='ms-5'>My Recipes</h2>
          </div>
          <Row className='container mt-5'>
            {userRecipe?.length>0?userRecipe.map((recipes,ind)=>(
              <Col key={ind}  sm={12} md={6} lg={4} xl={3}>
              <RecipeCard recipes={recipes} UserRecipe/>
            </Col>
            )):
            <div className='d-flex flex-column justify-content-center align-items-center w-100'>
              <img className='rounded-circle' width={'300px'} height={'300px'} src="https://www.simplinamdharis.com/assets/animation_nofound-b0584b837b2c320b19b87eaa0ee18fb427a627ee601bc5472eeb13463fde3c32.gif" alt="" />
              <h4 className='mt-2'>No recipes added Yet!!!</h4>
            </div>
          }
          </Row>
        </div>
        
    </>
  )
}

export default UserRecipe