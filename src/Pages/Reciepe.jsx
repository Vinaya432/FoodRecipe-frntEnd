
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { getASingleRecipeAPI } from '../Services/allAPI';
import { Link, useParams } from 'react-router-dom';
import ShareRecipe from '../Components/ShareRecipe';
import { SERVER_URL } from '../Services/serverURL';


function Reciepe() {
  const [recipedata, setRecipeData] = useState({
    title: "", description: "", ingredients: [], cookingTime: "", reciepeImage: "", category: "", username: "", timestamp: ""
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const viewRecipe = async () => {
    const token = sessionStorage.getItem("token")
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
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    viewRecipe();
  }, []);

 


  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="row mt-5 ms-5 shadow">
          <div className="col-md-4">
            <Card>
              <Card.Img className='img-fluid' src={`${SERVER_URL}/uploads/${recipedata.reciepeImage}`} alt="Card image" style={{height:'600px'}} />
              <Card.ImgOverlay style={{ justifyContent:'space-between', display: 'flex' }}>
                <Link to='/home'><i className="fa-solid fa-arrow-left fa-xl fw-bolder text-light"></i></Link>
                <div>
                {/* <RecipePDFDocument /> */}
                  <ShareRecipe recipedata={recipedata} />
                </div>
              </Card.ImgOverlay>
            </Card>
            
          </div>
          <div className="col-md-6 mt-3">
            <p>posted by: {recipedata.username} on {recipedata.timestamp}</p>
            <h2>{recipedata.title}</h2>
            <h6 className='text-warning'>Procedure:</h6>
            <p style={{textAlign:'justify'}}>{recipedata.description}</p>
            <h6 className='text-warning'>Ingredients :</h6>
            <ol>
            {recipedata.ingredients && recipedata.ingredients[0] && recipedata.ingredients[0].split(',').map((ingredient, index) => (
             <li key={index}>{ingredient.trim()}</li>
              ))}
            </ol>
            <h6 className='text-warning'>Category : <span className='text-dark'>{recipedata.category}</span></h6>
            <h5><i className="fa-regular fa-clock fa-shake fa-lg mt-3 text-warning me-1"></i>: {recipedata.cookingTime}</h5>
          </div>
        </div>
      )}
      {/* Pass recipedata to RecipePDFDocument component */}
     
    </>
  );
}

export default Reciepe;
