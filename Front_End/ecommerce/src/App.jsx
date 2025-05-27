import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
import Update_profiles from './components/Buyer/Update_profile'
import Forgot_password from '../src/components/Forgot_password'
import Reset_password from './components/Reset_password'
import Buyer_view_buyedetail from './components/Buyer/Buyer_view_buyedetail'
import Buyer_view_addcard from './components/Buyer/Buyer_view_addcard'
import Admin_login from './components/Admin/Admin_login'
import Admin_home from './components/Admin/Admin_home'
import Admin_nav from './components/Admin/Admin_nav'

function App() {

  return (
    <div>
      <MainLayout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<><Nav /><Home /></>} />
            <Route path="/login" element={<><Nav />,<Login /></>} />
            {/* Buyer */}
            <Route path="/buyer_reg" element={<><Nav />,<Register /></>} />
            <Route path="/buyer" element={<><Buyer_nav />,<Buyer_home /></>} />
            <Route path="/buyer_buyproduct" element={<><Buyer_nav />,<Buyer_buying_detailed /></>} />
            <Route path="/profile" element={<><Buyer_nav />,<Update_profiles /></>} />
            <Route path="/buyed" element={<><Buyer_nav />,<Buyer_productslist /></>} />
            <Route path="/buyed_details" element={<><Buyer_nav />,<Buyer_view_buyedetail /></>} />
            <Route path="/addcart" element={<><Buyer_nav />,<Buyer_view_addcard /></>} />
            {/* Sellers */}
            <Route path='/seller_reg' element={<><Nav />,<Registers /></>} />
            <Route path='/update' element={<><Seller_nav />,<Update_profile /></>} />
            <Route path='/seller_home' element={<><Seller_nav />,<Seller_home /></>} />
            <Route path='/addproducts' element={<><Seller_nav />,<AddProduct /></>} />
            <Route path='/view_product' element={<><Seller_nav />,<Seller_viewproduct /></>} />
            <Route path='/viewdetailed' element={<><Seller_nav />,<Seller_View_Detailproduct /></>} />
            <Route path='/Buyerdeatils' element={<><Seller_nav />,<Seller_view_brougheted_Buyers /></>} />
            <Route path='/detail' element={<><Seller_nav />,<Seller_view_detailed_buyed_sellers /></>} />



            <Route path='/Forgotpassword' element={<><Nav />,<Forgot_password /></>} />
            <Route path='/resetpassword' element={<><Nav />,<Reset_password /></>} />


            <Route path='/location' element={<><Nav />,<LocationSelector /></>} />
            <Route path='/dark' element={<><Nav />,<Dark /></>} />

            {/* Admin */}
            <Route path='/admin_login' element={<><Admin_nav /><Admin_login /></>} />
            <Route path='/admin_home' element={<><Admin_nav /><Admin_home /></>} />
          </Routes>
        </BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={900}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </MainLayout>
    </div>
  )
}

export default App
