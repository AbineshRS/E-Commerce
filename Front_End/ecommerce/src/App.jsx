import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Nav from './components/Nav'
import Login from './components/Login'
import Register from './components/Buyer/Register'
import Registers from './components/Seller/Register'
import LocationSelector from './components/LocationSelector'
import Buyer_home from './components/Buyer/Buyer_home'
import Buyer_nav from './components/Buyer/Buyer_nav'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Nav /><Home /></>}/>
          <Route path="/login" element={<><Nav/>,<Login/></>}/>
          {/* Buyer */}
          <Route path="/buyer_reg" element={<><Nav/>,<Register/></>}/>
          <Route path="/buyer" element={<><Buyer_nav/>,<Buyer_home/></>}/>
          {/* Sellers */}
          <Route path='/seller_reg' element={<><Nav/>,<Registers/></>}/>
          <Route path='/location' element={<><Nav/>,<LocationSelector/></>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
