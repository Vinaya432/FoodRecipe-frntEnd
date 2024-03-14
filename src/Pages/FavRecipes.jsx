import React, { useEffect, useState } from 'react'
import { deleteFavRecipeAPI, getFavRecipeAPI } from '../Services/allAPI'
import { SERVER_URL } from '../Services/serverURL'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import {  ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function FavRecipes() {

  const [favRecipe,setFavRecipe]=useState([])

  const getFavRecipe= async ()=>{
    console.log("inside get favzre");
    const token=sessionStorage.getItem("token")

    if(token){
       const reqHeader={
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
       }
        const result = await getFavRecipeAPI(reqHeader)
        if(result.status==200){
            console.log("Fav list:",result);
            setFavRecipe(result.data)
        }else{
            console.log(result);
        }
    }
  }
  console.log(favRecipe);

  const handledelete= async(rid)=>{
    const token=sessionStorage.getItem("token")

    if(token){
     const reqHeader={
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
     }

     try{
      const result= await deleteFavRecipeAPI(rid,reqHeader)
      if(result.status==200){
        toast.success("deletion sucessfull");
        getFavRecipe()
      }else{
        toast.warning(result.response.data)
      }
     }catch(err){
      console.log(err);
     }
    }
  }

  useEffect(()=>{
    getFavRecipe()
  },[])
  return (
    <>
    <Header/>
     <div className='container' style={{marginTop:'100px',marginBottom:'80px'}}>
      <h2 className='mt-5 mb-5'>My Favourites....</h2>
       {favRecipe?.length>0?favRecipe.map((recipe,ukey)=>(
          
          <div key={ukey} style={{height:'80px'}} className="w-50 border border-info d-flex align-items-center rounded mb-4">
          <img className='rounded-circle me-4 ms-3 ' style={{height:'55px',width:'55px'}} src={`${SERVER_URL}/uploads/${recipe.reciepeImage}`} alt="" />
          <h4>{recipe.title}</h4>
          <button onClick={()=>handledelete(recipe._id)} className='btn ms-auto'><i className='fa-solid fa-trash text-danger'></i></button>
      </div>
       )) :
         <div className='d-flex flex-column align-items-center justify-content-center w-100'>
           <img className='rounded-circle' height={'300px'} width={'300px'} src="https://www.mindsprint.org/etc.clientlibs/mindsprint/clientlibs/clientlib-site/resources/images/search%20empty_state.gif" alt="" />
            {/* <h4>No Favourites yet..!</h4> */}
         </div>
       }
     </div>
     <Footer/>
     <ToastContainer theme="colored" autoClose={3000} />
    </>
  )
}

export default FavRecipes