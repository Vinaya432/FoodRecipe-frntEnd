import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import imgicon from '../assets/Images/uploadicon.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addRecipeAPI } from '../Services/allAPI';
import { addReciperesponseContext } from '../Context API/ContentShare';




function AddRecipe() {
  const {addReciperesponse,setAddRecipeResponse}= useContext(addReciperesponseContext)
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState("") //to store img url
  const [fileStatus, setFileStatus] = useState(false)

  const [ingredientInput, setIngredientInput] = useState('');//for ingredients



  const [recipe, setRecipe] = useState({
    title: "", description: "", ingredients: [], cookingTime: "", reciepeImage: "", category: ""
  })

  let today = new Date();
  let timestamp = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    weekday: 'short'
  }).format(today)


  console.log(recipe);

  const handleClose = () => {
    setShow(false)
    setRecipe({
      title: "", description: "", ingredients: [], cookingTime: "", reciepeImage: "", category: ""
    })
    setPreview("")
  }
  const handleShow = () => setShow(true);

  useEffect(() => {
    console.log("recipe Image:", recipe.reciepeImage);
    console.log(recipe.reciepeImage.type);

    if (recipe.reciepeImage.type === "image/png" || recipe.reciepeImage.type === "image/jpeg" || recipe.reciepeImage.type === "image/jpg" || recipe.reciepeImage.type === "image/svg") {
      console.log("generate image url");
      setPreview(URL.createObjectURL(recipe.reciepeImage))
      setFileStatus(false)
    } else {
      console.log("Incorrect image Extension");
      setFileStatus(true)
      setPreview("")
      setRecipe({ ...recipe, reciepeImage: "" })
    }
  }, [recipe.reciepeImage])

  const handleAddIngredient = () => {
    if (ingredientInput.trim() !== '') {
      setRecipe(prevRecipe => ({
        ...prevRecipe,
        ingredients: [...prevRecipe.ingredients, ingredientInput.trim()]
      }));
      setIngredientInput('');
    }
  };
  
  const handleDeleteIngredient = (index) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients.splice(index, 1);
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      ingredients: newIngredients
    }));
  };
  
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      ingredients: newIngredients
    }));
  };

  // console.log(recipe);

  const handleAddRecipe = async () => {
    const token = sessionStorage.getItem("token")
    const username = sessionStorage.getItem("username")

    const { title, description, cookingTime, ingredients, reciepeImage, category } = recipe
    const isEmptyIngredient = ingredients.length === 0 || ingredients.some(ingredient => ingredient.trim() === '');

    if (!title || !description || !cookingTime || isEmptyIngredient || !reciepeImage || !category) {
      toast.warning("Please Fill the form Completly")
    } else {
      //api call -reqBody
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("description", description)
      reqBody.append("ingredients", ingredients)
      reqBody.append("cookingTime", cookingTime)
      reqBody.append("reciepeImage", reciepeImage)
      reqBody.append("timestamp", timestamp)
      reqBody.append("username", username)
      reqBody.append("category", category)

      //reqheader
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }

        //api call
        try {
          console.log("inside add recipe Api");
          const result = await addRecipeAPI(reqBody, reqHeader)
          console.log("api res", result);
          if (result.status == 200) {
            console.log(result.data);
            setAddRecipeResponse(true)
            handleClose()
          } else {
            toast.warning(result.response.data)
          }
        } catch (err) {
          console.log(err);
        }
      }

    }

  }
  return (
    <>
      {/* Modal */}
      <Button className='btn rounded-circle btn-warning' onClick={handleShow} style={{ width: '50px', height: '50px' }}><i className="fa-solid fa-plus"></i></Button>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create A Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>
            <input type="file" style={{ display: 'none' }} onChange={e => setRecipe({ ...recipe, reciepeImage: e.target.files[0] })} />
            <img className='img-fluid' src={preview ? preview : imgicon} alt="upload img" />
          </label>
          {/* image extension */}
          {fileStatus &&
            <div className="text-danger mt-1 fw-bold">
              <p>* Please upload the  image with the following Extensions (png,jpg,jpeg) only *</p>
            </div>
          }
          <div className='mb-3'>
            <input type="text" className='form-control' placeholder='Recipe Name' value={recipe.title} onChange={e => setRecipe({ ...recipe, title: e.target.value })} />
          </div>
          <div className='mb-3'>
            <textarea type="textarea" className='form-control' placeholder="Description of reciepe" value={recipe.description} onChange={e => setRecipe({ ...recipe, description: e.target.value })} />
          </div>

          {recipe.ingredients.map((ingredient, index) => (
            <div className='mb-3 d-flex' key={index}>
              <input
                type="text"
                className='form-control'
                placeholder={`Ingredient ${index + 1}`}
                value={ingredient}
                onChange={e => handleIngredientChange(index, e.target.value)}
              />
              <Button variant="danger" onClick={() => handleDeleteIngredient(index)}>
                <i className="fa-solid fa-xmark text-white"></i>
              </Button>
            </div>
          ))}
          <div className='mb-3 d-flex'>
            <input
              type="text"
              className='form-control'
              placeholder={`Ingredient ${recipe.ingredients.length + 1}`}
              value={ingredientInput}
              onChange={e => setIngredientInput(e.target.value)}
            />
            <Button variant="info" onClick={handleAddIngredient}>Add Ingredient</Button>
          </div>

          <div className='mb-3'>
            <input type="text" className='form-control' placeholder='Cooking Time ' value={recipe.cookingTime} onChange={e => setRecipe({ ...recipe, cookingTime: e.target.value })} /></div>
          <div>
            <select className='form-select' value={recipe.category} onChange={e => setRecipe({ ...recipe, category: e.target.value })}>
              <option value="">Select a category</option>
              <option value="Drinks">Drinks</option>
              <option value="Snacks">Snacks</option>
              <option value="Lunch">Lunch</option>
              <option value="Dessert">Dessert</option>
              <option value="Other">Other</option>

            </select>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddRecipe}>ADD</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer theme="colored" autoClose={3000} />
    </>
  )
}

export default AddRecipe