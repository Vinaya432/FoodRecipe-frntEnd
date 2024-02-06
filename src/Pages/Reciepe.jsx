import React from 'react'

function Reciepe() {
  return (
    <>
        <div className="row container mt-5 ms-5 shadow">
            <div className="col-md-4">
                <img className='img-fluid' src="https://www.stylecraze.com/wp-content/uploads/2015/05/10-Quick-And-Easy-Raw-Food-Breakfast-Ideas-1.jpg" alt="reciepe Img" />
            </div>
            <div className="col-md-4 mt-3">
              <p>date and email of the user posted it</p>
              <h2>Recipe Title</h2>
              <h5>Description </h5>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non obcaecati architecto, adipisci sapiente incidunt autem aperiam! Fugiat voluptatum exercitationem asperiores eaque corporis a nobis aliquid ipsum vel? Consequatur, saepe sint.</p>
              <h5>Ingredients</h5>
              <ol>
                <li>Apple</li>
                <li>Milk</li>
                <li>Oats</li>
              </ol>
              <h5>Cooking Time : 2 hr</h5>
            </div>
        </div>
    </>
  )
}

export default Reciepe