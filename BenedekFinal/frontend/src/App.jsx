import { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import Login from './components/Login'
import WebForm from './components/WebForm'
import WebList from './components/WebList'
import { AuthProvider } from './context/loginContext'
import { Routes, Route } from 'react-router-dom'

function App() {
  const [webData, setWebData] = useState([])

  const getWebData = async () => {
    try {
      const res = await fetch('http://localhost:3000/products')
      const data = await res.json()
      setWebData(data.products)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getWebData()
  }, [])

  const refreshData = () => {
    getWebData()
  }

  return (
    <>
    <AuthProvider>
      <NavBar />

      <Routes>
        <Route path="/" element={
          <WebList webData={webData} />
        } />

        <Route path="/form" element={
          <WebForm refreshData={refreshData} />
        } />

        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
    </>
  )
}

export default App