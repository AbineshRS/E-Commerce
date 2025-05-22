import React, { useState } from 'react';
import img from '../assets/3293465.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Forgot_password() {
    const navigate= useNavigate();
    const[detail,setdeatils]=useState({
        email:''
    });
    const handelchange=(e)=>{
        setdeatils({...detail,[e.target.name]:e.target.value})
    }
    const handelsubmit = async(e)=>{
        e.preventDefault();
        await axios.post(`https://localhost:7135/Ecommerce/Buyer/resetpassword`,detail,{
            headers: { 'Content-Type': 'application/json' }
        });
        alert("Check your Email");
        navigate('/login');
    }
    return (
        <div className="container my-5 shadow-lg rounded-5">
            <div className="row align-items-center">
                {/* Image column */}
                <div className="col-12 col-md-6 mb-4 mb-md-0">
                    <img src={img} alt="Forgot Password" className="img-fluid w-100 rounded" />
                </div>

                {/* Form column */}
                <div className="col-12 col-md-6">
                    <h4 className="mb-3 text-center">Reset Your Password</h4>
                    <form onSubmit={handelsubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input   type="email" name='email' id="email" className="form-control" placeholder="Enter your email" onChange={handelchange} required />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Send Reset Link
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Forgot_password;
