import React from 'react'
import img from '../../assets/online-shop.png'
import { Link, useNavigate } from 'react-router-dom'



function Seller_nav() {
    const navigate = useNavigate();
    const hnadleclick = () => {
        sessionStorage.clear();
        navigate('/login');
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
                        <li className="nav-item">
                            <a href="#" className="nav-link" onClick={hnadleclick}>Logout</a>
                        </li>
                        

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Seller_nav