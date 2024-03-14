import React, { useEffect, useState } from 'react'
import {Offcanvas} from 'react-bootstrap'
import { updateUserProfileAPI } from '../Services/allAPI';
import uploadProfile from '../assets/images/profile.jpg'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../Services/serverURL';

function Profile() {
const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [userData,setuserData]=useState({
    username:"",email:"",password:"",facebook:"",instagram:"",profile:""
  })

  const [existingImg,setExistingImg]=useState("")
  const [preview,setPreview]=useState("")

  

  useEffect(()=>{
    if(sessionStorage.getItem("userDetails")){
        const user=JSON.parse(sessionStorage.getItem("userDetails"))
        setuserData({...userData,username:user.username,email:user.email,password:user.password,facebook:user.facebook,instagram:user.instagram})
        setExistingImg(user.pImg)
    }

},[])


  useEffect(()=>{
    
  if(userData.profile){
    setPreview(URL.createObjectURL(userData.profile))
  }else{
    setPreview("")
  }
  },[userData.profile])


  const handleProfileUpdate= async ()=>{
    console.log("inside profile");
    const {username,email,password,facebook,instagram,profile}=userData
    if(!instagram|| !profile){
        alert("Please upload your profile pic and instagram Link")
    }else{
        const reqBody=new FormData()
        reqBody.append("username",username)
        reqBody.append("password",password)
        reqBody.append("email",email)
        reqBody.append("facebook",facebook)
        reqBody.append("instagram",instagram)
        preview?reqBody.append("profile",profile):reqBody.append("profile",existingImg)

        const token=sessionStorage.getItem("token")
        if(token){
          const reqHeader={
            "Content-Type":preview?"multipart/form-data":"application/json",
            "Authorization":`Bearer ${token}`
          }
          try {
            const result=await updateUserProfileAPI(reqBody,reqHeader)
            if(result.status==200){
                sessionStorage.setItem("userDetails",JSON.stringify(result.data))
                handleClose()
                toast.success("Profile updated sucessfully")
            }else{
                console.log(result);
            }
            
          } catch (error) {
            console.log(error);
          }
        }
    }  
  }
  return (
    <>
      <button  className="btn  rounded-circle profile" style={{width:'50px',height:'50px'}} onClick={handleShow}>
      <i className="fa-regular fa-user text-dark"></i> 
      </button>
      
      <Offcanvas show={show} onHide={handleClose} placement="end" style={{height:'700px'}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='mt-5'>Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className='row shadow p-5 justify-content-center mt-3'>
          <label className='text-center'>
            <input style={{display:'none'}}  type="file" onChange={e=>setuserData({...userData,profile:e.target.files[0]})} />
            {existingImg==""?
              <img width={'200px'} height={'200px'} src={preview?preview:uploadProfile} alt="upload image" /> 
            :
              <img width={'200px'} height={'200px'} className='rounded-circle' src={preview?preview:`${SERVER_URL}/uploads/${existingImg}`} alt="user profile img"/>
            }
          </label>

          <div className='mt-3 mb-3'><input type="text" placeholder='Enter your FaceBook URL' className='form-control' value={userData.facebook} onChange={e=>setuserData({...userData,facebook:e.target.value})}/></div>
          <div className='mb-3'><input type="text" placeholder='Enter your Instagram URL' className='form-control' value={userData.instagram}  onChange={e=>setuserData({...userData,instagram:e.target.value})}/></div>
          <button className='btn btn-warning' onClick={handleProfileUpdate}>UPLOAD</button>
        </div>
        </Offcanvas.Body>
      </Offcanvas>
      <ToastContainer autoClose={2000} theme='colored'/>
    </>
  )
}

export default Profile