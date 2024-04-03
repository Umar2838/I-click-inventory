import { useState,useEffect } from 'react'
import {Route, Router,Routes} from "react-router-dom"
import Login from './components/Login/Login.jsx'
import Home from './components/Home/Home.jsx'
import Invoice from "./components/Invoice/Invoice.jsx"
import "./App.css"
import { FormProvider } from './components/Context/Context.jsx';


function App() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth <= 768);
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isSmallScreen) {
    return (
      <>
    <div className="noise"></div>
    <div className="overlay"></div>
    <div className="terminal">
      <h1>Error <span className="errorcode">Screen Error</span></h1>
      <p className="output">This software is not for mobile use</p>
      <p className="output">Good luck.</p>
    </div>
    </>
      )
  }



  return (
    <div className="app">
    <FormProvider>

    <div>
<Routes>
  
  <Route path="/" element={<Login/>} />
  <Route path="/inventory" element={<Home/>} />
  <Route path="/invoice" element={<Invoice/>} />

</Routes>
    </div>
    </FormProvider>
    </div>
  )
}

export default App
