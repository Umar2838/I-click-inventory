import { useState } from 'react'
import {Route, Router,Routes} from "react-router-dom"
import Login from './components/Login/Login.jsx'
import Home from './components/Home/Home.jsx'
import Invoice from "./components/Invoice/Invoice.jsx"
function App() {

  return (
    <div>
<Routes>
  
  <Route path="/" element={<Login/>} />
  <Route path="/inventory" element={<Home/>} />
  <Route path="invoice" element={<Invoice/>} />

</Routes>
    </div>
  )
}

export default App
