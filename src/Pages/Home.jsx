import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import RecipeCard from '../Components/RecipeCard'
import {Row, Col} from 'react-bootstrap'

function Home() {
  return (
    <>
        <Header/>
        <div className='ms-3 mt-2 mb-5 d-flex'>
          <img className='rounded-circle border' style={{width:'25px',height:'25px'}} src="" alt="userimg/user name ist letter" />
          <h6>Welcome <span className='text-warning'>UserName</span>,</h6>
        </div>
        <div className='container '>    
            <div className='d-flex justify-content-center'><input type="text" className="form-control rounded-pill w-50 " placeholder="Search a Recipe here..."  /></div>
        
            <h5 className='mt-5'>All Recipes</h5>

            <Row className='container mt-5'>
                <Col className='mb-5' sm={12} md={6} lg={4} xl={3}>
                    <RecipeCard/>
                </Col>
            </Row>
        </div>
        <Footer/>
    </>
  )
}

export default Home