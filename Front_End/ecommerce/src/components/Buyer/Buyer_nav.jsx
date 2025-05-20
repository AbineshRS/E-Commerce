import React, { useEffect, useState } from 'react'
import img from '../../assets/online-shop.png'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
function Buyer_nav() {
    const navigate = useNavigate();
    const handlelogout = () => {
        sessionStorage.clear();
        navigate('/login');
    }
    const[details,setdetails]=useState({});
    useEffect(()=>{
        load();
    })
    async function load() {
        const id = sessionStorage.getItem('ID');
        const result = await axios.get(`https://localhost:7135/Ecommerce/Buyer/userdetails/${id}`)
        setdetails(result.data);
    }
    return (

        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top mt-2">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src={img} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
                    E-Commerce
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto"> {/* Using ms-auto to push the nav items to the right */}
                        <li className="nav-item">
                            <Link to='/buyer' className="nav-link active" aria-current="page">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/buyer' className="nav-link active" aria-current="page">cart</Link>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                        <div className="btn-group me-5">
                            <a className="text-decoration-none dropdown-toggle text-black  me-5 nav-link active" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              {details.firstName+'  '+details.lastName}
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link to="/profile" state={{ id: details.id }} className="dropdown-item">Settings</Link>
                                </li>

                                <li><a className="dropdown-item" href="#" onClick={handlelogout}>Logout</a></li>
                            </ul>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Buyer_nav