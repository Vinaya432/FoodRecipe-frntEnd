import React, { useContext, useState } from 'react'
import {Card} from 'react-bootstrap'
import { SERVER_URL } from '../Services/serverURL'
import { useNavigate } from 'react-router-dom'
import EditRecipe from './EditRecipe'
import { addToFavAPI, deleteRecipeAPI } from '../Services/allAPI'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteRecipeResponseContext } from '../Context API/ContentShare'


function RecipeCard({UserRecipe,recipes}) {
  const navigate=useNavigate()
   // State to manage favorite status
   const [isFavorite, setIsFavorite] = useState(false);
   const [favRecipe,setFavRecipe]=useState([])
  
  const {deleteRecipeResponse,setDeleteRecipeResponse}=useContext(deleteRecipeResponseContext)

  const handleImg=()=>{
    console.log(recipes);
    const {_id}=recipes
    navigate(`/recipe/${_id}`)
  }

  const handleDeleteRecipe= async(rid)=>{
    const token=sessionStorage.getItem("token")

    if(token){
     const reqHeader={
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
     }

     try{
      const result= await deleteRecipeAPI(rid,reqHeader)
      if(result.status==200){
        console.log("deletion sucessfull");
        setDeleteRecipeResponse(true)
      }else{
        toast.warning(result.response.data)
      }

     }catch(err){
      console.log(err);
     }
    }
  }

  const handleFavourite= async(favrecipe)=>{
    const token=sessionStorage.getItem("token")

    if(token){
       const reqHeader={
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
       }
      try {

      const result = await addToFavAPI(favrecipe,reqHeader)
      if(result.status==200){
        setIsFavorite(!isFavorite);
        console.log("Fav list:",result);
        setFavRecipe(result.data)
      }else{
        toast.info(result.response.data)
        console.log(result);
      }
      
      } catch (err) {
        console.log("fav eoorr:",err);
      }
    }

    
  }
  return (
    <>
    
        {recipes&& <Card  className='recipe-card rounded mb-4' style={{height:'400px'}}>
            <Card.Img className='recipe-card-img' onClick={handleImg} variant="top" src={`${SERVER_URL}/uploads/${recipes.reciepeImage}`} alt='recipe image' />
              <Card.Body className='d-flex justify-content-between'>
                <Card.Title>{recipes?.title.slice(0,13)}...</Card.Title>
                  {UserRecipe?
                  <div className='d-flex'>
                    <EditRecipe recipes={recipes}/>
                    <button onClick={()=>handleDeleteRecipe(recipes?._id)} className='btn'><i className="fa-solid fa-trash text-danger"></i></button>
                  </div>
                  : <button onClick={()=>handleFavourite(recipes)} className='btn'>
                      <i className={isFavorite ? "fa-solid fa-heart text-danger" : "fa-regular fa-heart "}></i>
                    </button>}
              </Card.Body>
          </Card>}
         
          <ToastContainer theme="colored" autoClose={3000} />
    </>
  )
}

export default RecipeCard