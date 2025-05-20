import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Update_profile() {
    const location = useLocation();
    const { id } = location.state;

    const [details, setDetails] = useState({
        firstName:'',
        lastName:'',
        dob:'',
        phonenumber:'',
        email:'',
        gender:'',
        address:''
    });

    useEffect(() => {
        load();
    }, []); 

    async function load() {
        const result = await axios.get(`https://localhost:7135/Ecommerce/Buyer/userdetails/${id}`);
        setDetails(result.data);
    }
    // update
    const handlechnage=(e)=>{
        setDetails({...details,[e.target.name]:e.target.value});
    }
    const handlesubmit = async(e)=>{
        e.preventDefault();
        await axios.put(`https://localhost:7135/Ecommerce/Buyer/Buyerupdate/${id}`,details,{
            headers: { 'Content-Type': 'application/json' }
        })
        alert('updated');
        load();
    }
    return (
        <div className="container mt-5">
            <form onSubmit={handlesubmit}>
                <div className="row mb-3">
                    <div className="col-12 col-md-6 mb-3">
                        <label>First Name</label>
                        <input type="text" className="form-control" name='firstName' value={details.firstName} onChange={handlechnage} />
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <label>Last Name</label>
                        <input type="text" className="form-control" name='lastName' value={details.lastName}  onChange={handlechnage}/>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-12 col-md-6 mb-3">
                        <label>DOB</label>
                        <input type="date" className="form-control" name='dob' value={details.dob}  onChange={handlechnage}/>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <label>Phone Number</label>
                        <input type="text" className="form-control" name='phonenumber' value={details.phonenumber}  onChange={handlechnage}/>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-12 col-md-6 mb-3">
                        <label>Email</label>
                        <input type="text" className="form-control" name='email' value={details.email}  onChange={handlechnage}/>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <label>Gender</label>
                        <select className="form-select" name='gender' value={details.gender} onChange={handlechnage}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-12 mb-3">
                        <label>Address</label>
                        <textarea name="address" id="" className='form-control'  value={details.address} onChange={handlechnage}></textarea>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-warning col-5">Update</button>
                </div>
            </form>
        </div>
    );
}

export default Update_profile;
