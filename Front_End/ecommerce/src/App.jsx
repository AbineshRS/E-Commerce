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
import Seller_home from './components/Seller/Seller_home'
import Seller_nav from './components/Seller/Seller_nav'
import AddProduct from './components/Seller/AddProduct'
import Seller_viewproduct from './components/Seller/Seller_viewproduct'
import Buyer_productslist from './components/Buyer/Buyer_productslist'
import Seller_View_Detailproduct from './components/Seller/Seller_View_Detailproduct'
import Buyer_buying_detailed from './components/Buyer/Buyer_buying_detailed'
import Seller_view_brougheted_Buyers from './components/Seller/Seller_view_brougheted_Buyers'
import Seller_view_detailed_buyed_sellers from './components/Seller/Seller_view_detailed_buyed_sellers'
import Dark from './components/Dark'
import MainLayout from './components/MainLayout'
import Update_profile from './components/Seller/Update_profile'

function App() {

  return (
    <div>
      <MainLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Nav /><Home /></>}/>
          <Route path="/login" element={<><Nav/>,<Login/></>}/>
          {/* Buyer */}
          <Route path="/buyer_reg" element={<><Nav/>,<Register/></>}/>
          <Route path="/buyer" element={<><Buyer_nav/>,<Buyer_home/></>}/>
          <Route path="/buyer_buyproduct" element={<><Buyer_nav/>,<Buyer_buying_detailed/></>}/>
          {/* Sellers */}
          <Route path='/seller_reg' element={<><Nav/>,<Registers/></>}/>
          <Route path='/update' element={<><Seller_nav/>,<Update_profile/></>}/>
          <Route path='/seller_home' element={<><Seller_nav/>,<Seller_home/></>}/>
          <Route path='/addproducts' element={<><Seller_nav/>,<AddProduct/></>}/>
          <Route path='/view_product' element={<><Seller_nav/>,<Seller_viewproduct/></>} />
          <Route path='/viewdetailed' element={<><Seller_nav/>,<Seller_View_Detailproduct/></>} />
          <Route path='/Buyerdeatils' element={<><Seller_nav/>,<Seller_view_brougheted_Buyers/></>} />
          <Route path='/detail' element={<><Seller_nav/>,<Seller_view_detailed_buyed_sellers/></>} />

          
          <Route path='/location' element={<><Nav/>,<LocationSelector/></>}/>
          <Route path='/dark' element={<><Nav/>,<Dark/></>}/>
        </Routes>
      </BrowserRouter>
      </MainLayout>
    </div>
  )
}

export default App
