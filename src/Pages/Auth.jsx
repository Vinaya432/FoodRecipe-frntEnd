import React, { useContext, useState } from 'react'
import { FloatingLabel, Form, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../Services/allAPI';
import { tokenAuthenticationContext } from '../Context API/TokenAuthent';



function Auth({ insideRegister }) {

    const {isAuthorised,setIsAuthorised}=useContext(tokenAuthenticationContext)

    const navigate = useNavigate()

    const [userDetails, setUserDetails] = useState({
        username: "", email: "", password: ""
    })

    const [role,setRole]=useState('')

    const [loginStatus,setLoginStatus]=useState(false)


    console.log(userDetails);

    const handleRegister = async (e) => {
        e.preventDefault()
        const { username, email, password } = userDetails

        if (!username || !email || !password) {
            toast.warning("Please fill the Form Completely!!")
        } else {
            try {
                console.log("Register sucessfully,api call");

                const result = await registerAPI(userDetails)
                console.log(result);
                if (result.status === 200) {
                    
                    toast.success(`${result.data.username} has Registered Successfully!!!`)
                    setUserDetails({ username: "", email: "", password: "" })
                    // setRole('user')
                    setTimeout(() => {
                        navigate('/login')
                    }, 2000)
                } else {
                    toast.warning(result.response.data)
                }
            } catch (err) {
                console.log(err);
            }
        }

    }
    
  const handleLogin = async(e) => {
    e.preventDefault()
    const { email, password } = userDetails

    if (!email || !password || !role) {
        toast.info("Please fill the Form Completely!!")
    } else {
        try{
            const result = await loginAPI({email,password},role)
            console.log("login result:",result);
            console.log(("inside login role:",role));
            if(result.status==200){
                if(role==='user'){
                    sessionStorage.setItem("username",result.data.existingUser.username)
                    sessionStorage.setItem("token",result.data.token)
                    sessionStorage.setItem("role", "user");
                    sessionStorage.setItem("userDetails",JSON.stringify(result.data.existingUser))
                    setIsAuthorised(true)
                    setUserDetails({email:" ",password:" "})
                    setRole({role:''})
                    setLoginStatus(true);
                    // console.log("after login:",userDetails);
                    console.log("Login successful!");
                    setTimeout(()=>{
                        navigate('/home')
                        console.log("Login successful!");
                        setLoginStatus(false)
                    },1000)  
                    
                    setLoginStatus(false)
                } else if (role === "admin") {
                    sessionStorage.setItem("adminEmail", result.data.existingAdmin.email);
                    sessionStorage.setItem("adminToken", result.data.token);
                    sessionStorage.setItem("role", "admin"); // Store admin role
                    setIsAuthorised(true)
                    setUserDetails({ email: "", password: "" });
                    setLoginStatus(true);
                    navigate('/admin/dashboard');
                    setLoginStatus(false)  
                }
                
            }else{
                toast.warning(result.response.data)
            }

        }catch(err){
            console.log(err);
        }
    }
    
  }
return (
    <>
        <div  className='container mt-5  '>
            <div className='row  w-75 rounded shadow  bg-light'>
                <div className="col-md-5">
                    <img className='img-fluid w-100' src="https://i.pinimg.com/236x/50/05/6a/50056adad3da7f66341f13d8d45d1d17.jpg" alt="" />
                </div>
                <div className='col-md-7 formsection'>
                    <div  >
                        <h1 className='mt-5 mb-5 text-center text-warning'>{insideRegister ? 'Sign Up' : 'Login'}</h1>
                        <div>
                            {
                                insideRegister && <FloatingLabel className="mb-3 w-75 ms-5" label="Enter your Name">
                                    <Form.Control name='uname' type="text" placeholder="Enter your Name" onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} value={userDetails.username} />
                                </FloatingLabel>
                            }
                            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3 w-75 ms-5">
                                <Form.Control name='email'   type="email" placeholder="name@example.com" onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} value={userDetails.email} />
                            </FloatingLabel>
                            
                            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3 w-75 ms-5">
                                <Form.Control name='password' minLength="4"  type="password" placeholder="Password" onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} value={userDetails.password} />
                            </FloatingLabel>
                           {!insideRegister && <select className='form-control ms-5 w-75' onChange={(e) => setRole(e.target.value)}>
                                    <option>Select mode of login</option>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                            </select>}

                            {insideRegister ?
                                <div className='text-center'>
                                    <button className='btn btn-success mb-2 w-25 rounded-pill' onClick={handleRegister}>Register</button>
                                    <p>Already have an Account? Click here to <Link to={'/login'} className='text-danger fw-bold'>Login</Link></p>
                                </div>
                                :
                                <div className='text-center'>
                                    <button className='btn  mb-2 btn-success w-25 mt-3 rounded-pill' onClick={handleLogin} disabled={loginStatus}>Login{loginStatus? <Spinner animation="border" variant="warning" />:''}</button>
                                    <p>New User? Click here to <Link to={'/register'} className='text-danger fw-bold'>Register</Link></p>
                                </div>}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer theme="colored" autoClose={2000} transition={Slide} />
    </>
  )
}

export default Auth