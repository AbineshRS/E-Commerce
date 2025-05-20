import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function Update_profile() {
    const location = useLocation();
    const { id } = location.state || {};
    const [details, setDetails] = useState({
        companyname:'',
        license:'',
        companyaddress:'',
        ownername:'',
        phonenumber:'',
        email:'',
        address:''
    });

    useEffect(() => {
        if (id) load();
    }, [id])

    async function load() {
        try {
            const result = await axios.get(`https://localhost:7135/Seller/Seller/userdeatils/${id}`)
            setDetails(result.data);
        } catch (error) {
            console.error('Failed to fetch details:', error);
        }
    }
    // Update Code
    const handelchange=(e)=>{
        setDetails({...details,[e.target.name]:e.target.value});
    }
    const handlesubmit = async(e)=>{
        e.preventDefault();
        await axios.put(`https://localhost:7135/Seller/Seller/updateprofile/${id}`, details, {
        headers: { 'Content-Type': 'application/json' }
      });
        alert('Updated');
        load();
    }

    return (
        <div className="container p-4">
            <h2 className="mb-4">Update Profile</h2>
            <form onSubmit={handlesubmit}>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Company Name</label>
                        <input type="text" value={details.companyname}  className="form-control"name='companyname' onChange={handelchange}/>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">License</label>
                        <input type="text" value={details.license} className="form-control" name='license' onChange={handelchange}/>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Company Address</label>
                        <input type="text" value={details.companyaddress} className="form-control" name='companyaddress' onChange={handelchange}/>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Name</label>
                        <input type="text" value={details.ownername} className="form-control" name='ownername' onChange={handelchange}/>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Phone Number</label>
                        <input type="text" value={details.phonenumber} className="form-control" name='phonenumber' onChange={handelchange}/>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input type="email" value={details.email} className="form-control" name='email' onChange={handelchange}/>
                    </div>
                    <div className="col-12">
                        <label className="form-label">Address</label>
                        <textarea value={details.address} className="form-control" rows="3" name='address' onChange={handelchange}/>
                    </div>
                    <div className="row justify-content-center mt-3 mb-5">
                        <div className="col-md-12 d-flex justify-content-center">
                            <button type="submit" className="btn btn-warning col-6"> Update</button>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default Update_profile
