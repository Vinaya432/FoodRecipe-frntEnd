import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import RecipeCard from '../Components/RecipeCard'
import {Row, Col} from 'react-bootstrap'
import { getAllRecipesAPI, getcategoryRecipesAPI } from '../Services/allAPI'
import { addReciperesponseContext, deleteRecipeResponseContext } from '../Context API/ContentShare'

function Home() {

  const [username,setUserName] = useState("")
  const [searchKey,setSearchKey]= useState("")
  const [allrecipes,setAllRecipes]=useState([])

  const {addReciperesponse,setAddRecipeResponse}= useContext(addReciperesponseContext)
  const {deleteRecipeResponse,setDeleteRecipeResponse}=useContext(deleteRecipeResponseContext)

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setUserName(sessionStorage.getItem("username"))
    }else{
      setUserName("")
    }
   

  },[])

  useEffect(()=>{
    getAllRecipes()
    setAddRecipeResponse(false)
  },[searchKey,addReciperesponse,deleteRecipeResponse])

  const getAllRecipes=async ()=>{
    const token=sessionStorage.getItem("token")
    if(token){
      const reqHeader={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      const result = await getAllRecipesAPI(searchKey,reqHeader)
      console.log("Result of Api call of all recipes:",result);
      if(result.status==200){
        setAllRecipes(result.data)
      }else{
        console.log(result);
      }
    }
  }

  const handleCategoryClick =async (category) => {
  
    const token=sessionStorage.getItem("token")
    if(token){
      const reqHeader={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      const res= await getcategoryRecipesAPI(category,reqHeader)
      console.log("category response: ",res);
      if(res.status==200){
        setAllRecipes(res.data)
      }else{
        console.log(res);
      }
    }
   

  };

  console.log("home all recipes: ",allrecipes);
  
  return (
    <>
       <Header/>
       <div className='home' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)),url('https://64.media.tumblr.com/c1d6b05e6e55ad6c3e9e8c999ee78f91/951c088b06b8f19a-c7/s540x810/eeade44e4cc45baa5fd0ddfe1481edac4ecaa02a.gif')`, backgroundPosition: 'center', minHeight: '100vh',backgroundSize:'cover'  }}>
          <div className='ms-3  mb-5 d-flex align-items-center' style={{marginTop:'100px'}}>
            <div className='rounded-circle border border-warning me-2 d-flex align-items-center justify-content-center' style={{height:'45px',width:'45px'}}><h3 className='m-2'>{username.charAt(0)}</h3></div>
            <h5>Welcome <span className='text-warning'>{username}</span>,</h5>
          </div>
          <div className='container '>    
              <div className='d-flex justify-content-center'><input type="text" className="form-control rounded-pill w-50 " placeholder="Search a Recipe here..."  onChange={e=>setSearchKey(e.target.value)} /></div>
              
            
                <div className="d-flex mt-5 justify-content-between align-align-items-center flex-wrap">
           
                    <div>
                      <button  className="btn rounded-circle" onClick={() => handleCategoryClick(null)}>
                        <img className='rounded-circle'  src="https://i.pinimg.com/564x/6a/83/22/6a832289633bb548c8519ae34585be9c.jpg" alt="" style={{height:'100px',width:'100px'}} />
                      </button>
                      <p className='text-center'>All</p>
                    </div>              
                  <div>
                    <button  className="btn " onClick={() => handleCategoryClick('Snacks')}>
                    <img className='rounded-circle' src="https://i.pinimg.com/564x/6a/4e/70/6a4e700eb2649a83ec8e239121f19c52.jpg" alt="" style={{height:'100px',width:'100px'}} />
                    </button>
                    <p className='text-center'>Snacks</p>
                  </div>
                  <div>
                    <button  className="btn " onClick={() => handleCategoryClick('Drinks')}>
                    <img className='rounded-circle' src="https://i.pinimg.com/564x/f1/0c/07/f10c075d51631fcefc94a3e9fb9d8df8.jpg" alt="" style={{height:'100px',width:'100px'}} />
                    </button>
                    <p className='text-center'>Drinks</p>
                  </div>
                  <div>
                    <button  className="btn " onClick={() => handleCategoryClick('Lunch')}>
                    <img className='rounded-circle' src="https://i.pinimg.com/564x/d3/ae/36/d3ae369375b0270493ed6fcbeb6df0e0.jpg" alt="" style={{height:'100px',width:'100px'}} />
                    </button>
                    <p className='text-center'>Lunch</p>
                  </div>
                  <div>
                    <button  className="btn " onClick={() => handleCategoryClick('Dessert')}>
                    <img className='rounded-circle' src="https://i.pinimg.com/564x/a4/8c/5d/a48c5d3e0be52b5eba7e4b37ae06f400.jpg" alt="" style={{height:'100px',width:'100px'}} />
                    </button>
                    <p className='text-center'>Dessert</p>
                  </div>
                  
            
                </div>
            
              <h5 className='mt-5'>All Recipes</h5>
  
              <Row className='container mt-5'>
                  {allrecipes?.length>0? allrecipes.map((recipes,index)=>(
                    <Col key={index} className='mb-5' sm={12} md={6} lg={4} xl={3}>
                        <RecipeCard recipes={recipes}/>
                    </Col>
                  )):
                  <div className='text-warning fs-1'>No Recipes are Available</div>
  
                }
              </Row>
          </div>
       </div>
        <Footer/>
    </>
  )
}

export default Home