import React from 'react'
import {Card} from 'react-bootstrap'

function RecipeCard({userRecipe}) {
  return (
    <>
    
         <Card style={{ width: '16rem'}} className='rounded '>
            <Card.Img variant="top" src="https://img.veenaworld.com/wp-content/uploads/2022/10/Famous-Foods-of-Mysore-%E2%80%93-Dishes-You-Should-Try-on-Your-Next-Vacation.jpg" />
              <Card.Body className='d-flex justify-content-between'>
                <Card.Title>Card Title</Card.Title>
                <button className='btn'>{userRecipe?<i class="fa-regular fa-pen-to-square"></i>:<i class="fa-regular fa-heart"></i>}</button>
              </Card.Body>
            </Card>
      
    </>
  )
}

export default RecipeCard