import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Modal, Button } from 'react-bootstrap';
import { deleteRecipeAPI, getASingleRecipeAPI, getAllRecipesAdminAPI } from '../Services/allAPI';
import { SERVER_URL } from '../Services/serverURL';
import { addReciperesponseContext } from '../Context API/ContentShare';
import { useNavigate } from 'react-router-dom';
import { tokenAuthenticationContext } from '../Context API/TokenAuthent';
import Chart from '../Components/Chart';
import ReactPaginate from 'react-paginate';

function Admindashboard() {

  const [deleteResponse, setDeleteRecipeResponse] = useState(false)
  const { addReciperesponse, setAddRecipeResponse } = useContext(addReciperesponseContext)
  const { isAuthorised, setIsAuthorised } = useContext(tokenAuthenticationContext)


  const [value, setValue] = useState(new Date()); // Initialize with the current system date
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [allrecipes, setAllRecipes] = useState([])
  const [recipedata, setRecipeData] = useState({
    title: "", description: "", ingredients: [], cookingTime: "", reciepeImage: "", category: "", username: "", timestamp: ""
  });

  const navigate = useNavigate()

   // Pagination states
   const [currentPage, setCurrentPage] = useState(1);
   const recipesPerPage = 4;

  const onChange = (date) => {
    setValue(date instanceof Date ? date : date[0]);
  };

  const handleImg = async (id) => {
    setShow(true);
    const token = sessionStorage.getItem("adminToken")
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await getASingleRecipeAPI(id, reqHeader);
        if (result.status === 200) {
          setRecipeData(result.data);
        } else {
          alert(result.response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }

  }

  const getAllRecipes = async () => {
    const token = sessionStorage.getItem("adminToken")
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }

      const result = await getAllRecipesAdminAPI(reqHeader)
      console.log("Result of Api call of all recipes:", result);
      if (result.status == 200) {
        setAllRecipes(result.data)
      } else {
        console.log(result);
      }
    }
  }

  const handleDeleteRecipe = async (rid) => {
    const token = sessionStorage.getItem("adminToken")

    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }

      try {
        const result = await deleteRecipeAPI(rid, reqHeader)
        if (result.status == 200) {
          console.log("deletion sucessfull");
          setDeleteRecipeResponse(true)
        } else {
          toast.warning(result.response.data)
        }

      } catch (err) {
        console.log(err);
      }
    }
  }


  useEffect(() => {
    getAllRecipes()
  }, [deleteResponse, addReciperesponse])

  const handleLogout = () => {
    sessionStorage.clear()
    setIsAuthorised(false)
    navigate('/')
  }

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allrecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  return (
    <>

     <div className='container'>
        <div className='w-100 rounded d-flex align-items-center justify-content-between flex-wrap' style={{ backgroundImage: 'url(https://www.wallpaperflare.com/static/513/175/755/low-poly-minimalism-triangle-digital-art-wallpaper.jpg)', height: '150px' }}>
          <h2>Flavour Fusion</h2>
          <h2>Welcome to Admin Panel!!!</h2>
          <button onClick={handleLogout} className="btn fw-bold text-info">Logout <i className="ms-1 fa-solid fa-right-from-bracket"></i></button>
        </div>
        <div style={{ height: '100vh' }} className='ms-5 mt-5 w-100 row d-flex justify-content-center'>
  
          {/* Column for Recipe List */}
          <div className="col-lg-7">
            <h4 style={{ color: 'burlywood', fontStyle: 'italic' }}>All Recipes List</h4>
            { currentRecipes.map((recipe, index) => (
              <div key={index} style={{ height: '150px' }} className="border rounded mt-3 mb-3 w-75 d-flex align-items-center bg-light justify-content-evenly">
                <button className='btn' onClick={() => handleImg(recipe?._id)}>
                  <img src={`${SERVER_URL}/uploads/${recipe.reciepeImage}`} height={'99x'} width={'100px'} className="img-fluid rounded-circle" alt="..." />
                </button>
                <h5>{recipe?.title.slice(0, 13)}...</h5>
                <button onClick={() => handleDeleteRecipe(recipe?._id)} className='btn'><i className='fa-solid fa-trash text-danger'></i></button>
              </div>
            )) }
            
            <ReactPaginate
              pageCount={Math.ceil(allrecipes.length / recipesPerPage)}
              pageRangeDisplayed={4}
              marginPagesDisplayed={2}
              onPageChange={handlePageChange}
              containerClassName="pagination"
              activeClassName="active"
              previousLabel="Previous"
              nextLabel="Next"
              breakLabel="..."
              breakClassName="break-me"
            />
         
          
          </div>
  
          {/* Column for Calendar and Chart */}
          <div className="col-lg-5 mt-3">
            {/* Calendar */}
            <div className='p-3 rounded'>
              <Calendar onChange={onChange} value={value} />
            </div>
  
            {/* Chart */}
            <div style={{ height: '400px', backgroundColor: 'white' }} className='me-5 mt-5 rounded'>
              <Chart />
            </div>
          </div>
  
        </div>
     </div>


      {/* modal  for seeing each recipe*/}
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{recipedata?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>posted by: {recipedata.username} on {recipedata.timestamp}</p>
          <h2>{recipedata.title}</h2>
          <h6 className='text-warning'>Procedure:</h6>
          <p style={{ textAlign: 'justify' }}>{recipedata.description}</p>
          <h6 className='text-warning'>Ingredients :</h6>
          <ol>
            {recipedata.ingredients && recipedata.ingredients[0] && recipedata.ingredients[0].split(',').map((ingredient, index) => (
              <li key={index}>{ingredient.trim()}</li>
            ))}
          </ol>
          <h6 className='text-warning'>Category : <span className='text-dark'>{recipedata.category}</span></h6>
          <h5><i className="fa-regular fa-clock fa-shake fa-lg mt-3 text-warning me-1"></i>: {recipedata.cookingTime}</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Admindashboard
