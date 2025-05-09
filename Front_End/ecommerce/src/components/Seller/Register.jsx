import React, { useState } from 'react'
import img from '../../assets/6963167.jpg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate=useNavigate();
  const[sellerDetails,setdetails]=useState({
    Companyname:'',
    License:'',
    Companyaddress:'',
    Ownername:'',
    Phonenumber:'',
    Email:'',
    Address:'',
    Username:'',
    Password:'',
    Usertype:'Seller',
    Active:'Active'
  });
  const handlechnage=(e)=>{
    setdetails({...sellerDetails,[e.target.name]:e.target.value});
  };
  const handlesubmit = async(e)=>{
    e.preventDefault();
    await axios.post(`https://localhost:7135/Seller/Seller/add`,sellerDetails)
    navigate('/login');
  }
  return (
    <div className='container shadow-lg p-4 mt-5 rounded-3'>
      <div className='row'>
        <div className='col-md-6'>
          <img src={img} alt="Registration" className='img-fluid' />
        </div>

        <div className='col-md-6'>
          <form onSubmit={handlesubmit}>
            <div className='row mb-3'>
              <div className='col'>
                <label>Company Name</label>
                <input type="text" name="Companyname" className='form-control' required onChange={handlechnage}/>
              </div>
              <div className='col'>
                <label>Company License Number</label>
                <input type="text" name="License" className='form-control' required onChange={handlechnage}/>
              </div>
            </div>

            <div className='row mb-3'>
              <div className='col'>
                <label>Company Address</label>
                <input type="text" name="Companyaddress" className='form-control' required onChange={handlechnage}/>
              </div>
              <div className='col'>
                <label>Owner Name</label>
                <input type="text" name="Ownername" className='form-control' required onChange={handlechnage}/>
              </div>
            </div>

            <div className='row mb-3'>
              <div className='col'>
                <label>Phone number</label>
                <input type="number" name="Phonenumber" className='form-control' onChange={handlechnage}/>
              </div>
              <div className='col'>
                <label>Email</label>
                <input type="email" name="Email" className='form-control' onChange={handlechnage}/>
              </div>
            </div>

            <div className='mb-3'>
              <label>Owner Address</label>
              <textarea name="Address" className='form-control' onChange={handlechnage}></textarea>
            </div>

            <div className='row mb-3'>
              <div className='col'>
                <label>Username</label>
                <input type="text" name="Username" className='form-control' onChange={handlechnage}/>
              </div>
              <div className='col'>
                <label>Password</label>
                <input type="password" name="Password" className='form-control' onChange={handlechnage}/>
              </div>
            </div>
            <div className='d-flex justify-content-between'>
              <div className='col me-2'>
                <button type='submit' className='btn btn-primary w-100'>Submit</button>
              </div>
              <div className='col'>
                <button type='reset' className='btn btn-secondary w-100'>Clear</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
