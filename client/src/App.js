import React from 'react'
import { Route , Routes } from 'react-router-dom'
import Login from './components/User/Login/Login'
import Signup from './components/User/Signup/Signup'
function App() {

  return (
    <div>
      <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
