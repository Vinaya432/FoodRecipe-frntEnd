import { Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './Pages/Auth'
import Splash from './Pages/Splash'
import Home from './Pages/Home'
import Reciepe from './Pages/Reciepe'
import UserRecipe from './Pages/UserRecipe'



function App() {

  return (
    <>
    <Routes>
      <Route path='/splash' element={<Splash/>} />
      <Route path='/login' element={<Auth/>} />
      <Route path='/register' element={<Auth insideRegister/>} />
      <Route path='/' element={<Home/>} />
      <Route path='/recipe' element={<Reciepe/>} />
      <Route path='/userrecipe' element={<UserRecipe/>} />


    </Routes>
      
    </>
  )
}

export default App
