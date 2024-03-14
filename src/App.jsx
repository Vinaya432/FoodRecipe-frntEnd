import { Navigate,Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './Pages/Auth'
import Splash from './Pages/Splash'
import Home from './Pages/Home'
import Reciepe from './Pages/Reciepe'
import UserRecipe from './Pages/UserRecipe'
import FavRecipes from './Pages/FavRecipes'
import React,{ useContext } from 'react'
import Admindashboard from './Pages/Admindashboard'
import { tokenAuthenticationContext } from './Context API/TokenAuthent'


function App() {
   const {isAuthorised,setIsAuthorised}=useContext(tokenAuthenticationContext)
  
  return (
    <>
    <Routes>
      <Route path='/' element={<Splash/>} />
      <Route path='/login' element={<Auth/>} />
      <Route path='/register' element={<Auth insideRegister/>} />
      <Route path='/admin/dashboard' element={isAuthorised?<Admindashboard/>:<Splash/>}/>
      <Route path='/home' element={isAuthorised?<Home/>:<Splash/>} />
      <Route path='/recipe/:id' element={isAuthorised?<Reciepe/>:<Splash/>} />
      <Route path='/userrecipe' element={isAuthorised?<UserRecipe/>:<Splash/>} />
      <Route path='/favrecipe' element={isAuthorised?<FavRecipes/>:<Splash/>}  />
      <Route path='/*' element={<Navigate to={'/'}/>}/>
    </Routes>
      
    </>
  )
}

export default App
