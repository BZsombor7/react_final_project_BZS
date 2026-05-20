import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Login from './components/Login'
import { AuthProvider } from './context/loginContext'
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
    <AuthProvider>
    <NavBar/>
    <Routes>
      <Route path="/"/>
      <Route path="form"/>
      <Route path="login" element={<Login/>}/>
    </Routes>
    </AuthProvider>
    </>
  )
}

export default App
