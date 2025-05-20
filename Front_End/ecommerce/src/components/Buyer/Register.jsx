import React, { useEffect, useState } from 'react';
import img from '../../assets/3405349.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate=useNavigate();
    const[buyerdetails,setDetails]=useState({
        FirstName:'',
        LastName:'',
        DOB:'',
        Phonenumber:'',
        Email:'',
        Gender:'',
        Address:'',
        Username:'',
        Password:'',
        Usertype:'Buyer',
        Active:'Active'
    });

    const handlechange=(e)=>{
        setDetails({...buyerdetails,[e.target.name]:e.target.value});
    };
    const handlesubmit= async(e)=>{
        e.preventDefault();
        await axios.post(`https://localhost:7135/Ecommerce/Buyer/buyer`,buyerdetails);
        navigate('/login');
    }

    return (
        <div className="container mt-5">
            <div className="row align-items-center">
                {/* Image column */}
                <div className="col-lg-6 col-md-12 mb-4">
                    <img src={img} alt="Register Visual" className="img-fluid rounded-2 w-100" />
                </div>
                
                {/* Form column */}
                <div className="col-lg-6 col-md-12">
                    <div className="p-4 shadow-lg rounded-3">
                        <h3 className="mb-4 text-center">Register</h3>
                        <form onSubmit={handlesubmit}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">First Name</label>
                                    <input type="text" className="form-control" placeholder="First Name" name='FirstName' required onChange={handlechange}/>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Last Name</label>
                                    <input type="text" className="form-control" placeholder="Last Name" name='LastName' required onChange={handlechange}/>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">DOB</label>
                                    <input type="date" className="form-control" name='DOB'  required onChange={handlechange}/>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Phone Number</label>
                                    <input type="number" className="form-control" name='Phonenumber' placeholder="Phone Number" required onChange={handlechange}/>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" name='Email' placeholder="Email" required onChange={handlechange}/>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Gender</label>
                                    <select className="form-select" name='Gender' required onChange={handlechange}>
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Address</label>
                                    <textarea className="form-control" rows="2" placeholder="Address" name='Address' required onChange={handlechange}></textarea>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Username</label>
                                    <input type="text" className="form-control" placeholder="Username" name='Username' required onChange={handlechange}/>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Password</label>
                                    <input type="password" className="form-control" placeholder="Password" name='Password'   required onChange={handlechange}/>
                                </div>
                                <div className="col-6 d-grid">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                                <div className="col-6 d-grid">
                                    <button type="reset" className="btn btn-secondary">Clear</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
