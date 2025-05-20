import React, { useEffect, useState } from 'react'
import img from '../../assets/online-shop.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';



function Seller_nav() {
    const [details, setDetails] = useState({});

    const navigate = useNavigate();
    const hnadleclick = () => {
        sessionStorage.clear();
        navigate('/login');
    };
    useEffect(() => {
        load();
    }, [])
    async function load() {
        const id = sessionStorage.getItem('ID');
        const result = await axios.get(`https://localhost:7135/Seller/Seller/userdeatils/${id}`);
        setDetails(result.data);
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
                            <a className="nav-link active" aria-current="page" href="/seller_home">Home</a>
                        </li>
                        <li className="nav-item">
                            <Link to="/addproducts" className="nav-link active" aria-current="page">Add Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/view_product" className="nav-link active" aria-current="page">view Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Buyerdeatils" className="nav-link active">List of Products Brought</Link>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                        <div className="btn-group me-5">
                            <a className="text-decoration-none dropdown-toggle text-black mt-2 me-5" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {details.ownername}
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link to="/update" state={{id:details.id}} className="dropdown-item">Settings</Link>
                                </li>

                                <li><a className="dropdown-item" href="#" onClick={hnadleclick}>Logout</a></li>
                            </ul>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Seller_nav