import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Login from './components/Login'
import { AuthProvider } from './context/loginContext'
import { Routes, Route } from 'react-router-dom';
import WebForm from './components/webForm'

function App() {
    const [WebData, setWebData] = useState([]);

  const handleWebData = (data) => {
    setWebData((prevData) => [...prevData, data]);
    getWebData();
  };

  const getWebData = async () => {
    try {
      const response = await fetch('http://localhost:3000/travels', {
        
      });
      if (response.ok) {
        const data = await response.json();
        setWebData(data);
      } else {
        console.error('Hiba az adatok lekérésekor');
      }
    } catch (error) {
      console.error('Hiba:', error);
    }
  };
  useEffect(() => {
    getWebData();
  }, []);

  const deleteWeb = (id) => {
    getWebData();
  }

  return (
    <>
    <AuthProvider>
    <NavBar/>
    <Routes>
      <Route path="/"/>
      <Route path="form" element={<WebForm sendDataToApp={handleWebData}/>}/>
      <Route path="login" element={<Login/>}/>
    </Routes>
    </AuthProvider>
    </>
  )
}

export default App
