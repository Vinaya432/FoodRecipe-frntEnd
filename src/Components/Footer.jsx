import React from 'react'
import { useState } from 'react';
import {Modal,Button,FloatingLabel,Form,OverlayTrigger } from 'react-bootstrap'
import imgicon from '../assets/Images/uploadicon.jpg'

function Footer() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
        <div className='container d-flex justify-content-between w-75'>
         <div className='d-flex flex-column align-items-center justify-content-center'>
           <button className='hover:bg-stone-300 rounded-circle ' style={{width:'50px',height:'50px'}}><i className="fa-solid fa-house "></i></button>
           <p>Home</p>
         </div>
           <div className='d-flex flex-column'>
            <button className='hover:bg-stone-300 rounded-circle' style={{width:'50px',height:'50px'}}><i class="fa-regular fa-heart"></i></button>
            <p>Favourites</p>
           </div>
           <Button className='rounded-circle' onClick={handleShow}><i class="fa-solid fa-plus"></i></Button>
           <div className='d-flex flex-column'>
            <button className='hover:bg-stone-300 rounded-circle' style={{width:'50px',height:'50px'}}><i class="fa-solid fa-utensils"></i></button>
            <p>My Recipes</p>
           </div>
           <div className='d-flex flex-column'>
            <button className='hover:bg-stone-300 rounded-circle' style={{width:'50px',height:'50px'}}><i class="fa-regular fa-user"></i></button>
            <p>Profile</p>
           </div>
        </div>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>
            <input type="file" style={{display:'none'}} />
            <img src={imgicon} alt="" />
          </label>
          <FloatingLabel controlId="floatingTitle" label="Title" className="mb-3" >
            <Form.Control type="text" placeholder="Title" />
          </FloatingLabel>
          <FloatingLabel controlId="description" label="Description of reciepe" className='mb-3'>
            <Form.Control as="textarea" placeholder="Description of reciepe" style={{ height: '100px' }} />
          </FloatingLabel>
          <FloatingLabel controlId="ingredients" label="Ingredients">
            <Form.Control as="textarea" placeholder="Ingredients" style={{ height: '100px' }} />
          </FloatingLabel>
          <FloatingLabel controlId="floatingTime" label="Cooking Time" className="mt-3" >
            <Form.Control type="text" placeholder="Time" />
          </FloatingLabel>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Footer