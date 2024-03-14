import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { SERVER_URL } from '../Services/serverURL';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editRecipeAPI } from '../Services/allAPI';
import { editRecipeResponseContext } from '../Context API/ContentShare';




function EditRecipe({ recipes }) {

  const {editRecipeResponse,setEditRecipeResponse}=useContext(editRecipeResponseContext)

  console.log("when edit icon click:", recipes);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [preview, setPreview] = useState("") 


  const [recipeData, setrecipeData] = useState({
    id: recipes._id, title: recipes.title, description: recipes.description, ingredients: recipes.ingredients[0].split(','), cookingTime: recipes.cookingTime, category: recipes.category, timestamp: recipes.timestamp,
    reciepeImage: ""
  })

  useEffect(() => {
    if (recipeData.
      reciepeImage) {
      setPreview(URL.createObjectURL(recipeData.
        reciepeImage))
    } else {
      setPreview("")
    }
  }, [recipeData.
    reciepeImage])

  const handleCancel = () => {
    setrecipeData(
      {
        id: recipes._id, title: recipes.title, description: recipes.description, ingredients: recipes.ingredients, cookingTime: recipes.cookingTime, category: recipes.category, timestamp: recipes.timestamp, username: recipes.username,
        reciepeImage: ""
      }
    )
    setPreview("")
  }

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...recipeData.ingredients];
    updatedIngredients[index] = value;
    setrecipeData({ ...recipeData, ingredients: updatedIngredients });
  };

  const handleAddIngredient = () => {
    const updatedIngredients = [...recipeData.ingredients, ""];
    setrecipeData({ ...recipeData, ingredients: updatedIngredients });
  };

  const handleRemoveIngredient = (indexToRemove) => {
    const updatedIngredients = recipeData.ingredients.filter((_, index) => index !== indexToRemove);
    setrecipeData({ ...recipeData, ingredients: updatedIngredients });
  };

  let today = new Date();
  let modifiedDate = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    weekday: 'short'
  }).format(today)

  const handleUpdate = async () => {
    const { id, title, description, ingredients, category, timestamp, reciepeImage, cookingTime, username } = recipeData
    let uname=sessionStorage.getItem("username")
    

    if (!title || !description || !cookingTime || !category || ingredients.some(ingredient => ingredient.trim() === "")) {
      toast.warning("Please fill the form Completely!!!")
    } else {
      //api call-reqBody
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("description", description)
      reqBody.append("ingredients", ingredients)
      reqBody.append("cookingTime", cookingTime)
      reqBody.append("timestamp", modifiedDate)
      reqBody.append("category", category)
      reqBody.append("username", uname)
      preview ? reqBody.append("reciepeImage", reciepeImage) : reqBody.append("reciepeImage", recipes.reciepeImage)

      //req-header
      const token = sessionStorage.getItem("token")
      if (token) {

        const reqHeader = {
          "Content-Type": preview ? "multipart/form-data" : "application/json",
          "Authorization": `Bearer ${token}`
        }

        //api call
        try {

          const result = await editRecipeAPI(id, reqBody, reqHeader)
          console.log(result);
          if(result.status==200){
            handleClose()
            setEditRecipeResponse(result.data)

          }else{
            toast.warning(result.response.data)
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  return (
    <>
      {/* Modal */}
      <button className='btn' onClick={handleShow}><i className="fa-solid fa-pen-to-square "></i></button>
      <Modal className='w-100' show={show} onHide={handleClose} backdrop="static" keyboard={false} >
        <Modal.Header closeButton>
          <Modal.Title>Update Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row w-100">
            <div className="col-lg-6">
              <label>
                <input type="file" style={{ display: 'none' }} onChange={e => setrecipeData({ ...recipeData, reciepeImage: e.target.files[0] })} />

                <img className='img-fluid' src={preview ? preview : `${SERVER_URL}/uploads/${recipes.reciepeImage}`} alt="recipe img" />
              </label>
            </div>

            <div className="col-lg-6">
              <div className='mb-3'><input type="text" className='form-control' placeholder='Recipe Name' value={recipeData.title} onChange={e => setrecipeData({ ...recipeData, title: e.target.value })} /></div>

              <div className='mb-3'>
                <input type="textarea" className='form-control' placeholder="Description of reciepe" value={recipeData.description} onChange={e => setrecipeData({ ...recipeData, description: e.target.value })} /></div>

              {recipeData.ingredients.map((ingredient, index) => (
                <div className='mb-3 d-flex flex-column' key={index}>
                  <div className='d-flex mb-3'>
                    <input
                      type="text"
                      className='form-control'
                      placeholder={`Ingredient ${index + 1}`}
                      value={ingredient}
                      onChange={(e) => handleIngredientChange(index, e.target.value)}
                    />
                    <button className='btn btn-danger' onClick={() => handleRemoveIngredient(index)}>
                      <i className="fa-solid fa-xmark text-white"></i>
                    </button>
                  </div>
                </div>
              ))}


              <div className='mb-3 d-flex'>
                <button onClick={handleAddIngredient} className='btn btn-info'>Add Ingredient</button>
              </div>

              <div className='mb-3'>
                <input type="text" className='form-control' placeholder='Cooking Time ' value={recipeData.cookingTime} onChange={e => setrecipeData({ ...recipeData, cookingTime: e.target.value })} />
              </div>

              <div>
                <select className='form-select' value={recipeData.category} onChange={e => setrecipeData({ ...recipeData, category: e.target.value })}>
                  <option value="">Select a category</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Lunch">Lunch</option>
                  <option value="BreakFast">BreakFast</option>
                  <option value="Other">Other</option>

                </select>
              </div>
            </div>

          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer theme='colored' autoClose={1000} />

    </>
  )
}

export default EditRecipe