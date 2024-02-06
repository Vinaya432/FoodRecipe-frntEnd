import React from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function Auth({insideRegister}) {
    return (
        <>
            <div className='container  mt-5 rounded shadow w-50'>
                <div className='row'>
                    <div className="col-md-5">
                        <img className='img-fluid' src="https://i.pinimg.com/236x/50/05/6a/50056adad3da7f66341f13d8d45d1d17.jpg" alt="" />
                    </div>
                    
                    <div className='col-md-7 border'>
                        <h1 className='mt-5 mb-5 text-center'>{insideRegister?'Sign Up':'Login'}</h1>

                        {
                        insideRegister&&<FloatingLabel className="mb-3 w-75 ms-5" label="Enter your Name">
                          <Form.Control type="text" placeholder="Enter your Name" />
                        </FloatingLabel>
                        }
                        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3 w-75 ms-5">
                            <Form.Control type="email" placeholder="name@example.com" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3 w-75 ms-5">
                            <Form.Control type="password" placeholder="Password" />
                        </FloatingLabel>
                        {insideRegister?
                        <div className='text-center'>
                            <button className='btn btn-success mb-2 rounded-pill'>Register</button>
                        <p>Already have an Account? Click here to <Link to={'/login'} className='text-danger fw-bold'>Login</Link></p>
                        </div>
                        :
                        <div className='text-center'>
                            <button className='btn  mb-2 btn-success w-25 mt-3 rounded-pill'>Login</button>
                            <p>New User? Click here to <Link to={'/register'} className='text-danger fw-bold'>Register</Link></p>
                        </div>}
                        <p className='d-flex mt-3 justify-content-center'><hr style={{ width: '150px' }} /><small className='ms-2 me-2 text-secondary'>Or Continue With</small><hr style={{ width: '150px' }} /></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Auth