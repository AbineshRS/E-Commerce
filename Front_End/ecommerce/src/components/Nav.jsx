import React from 'react';
import img from '../assets/online-shop.png'
import { Link } from 'react-router-dom';
function Nav() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top mt-2">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src={img} alt="Logo" width="30" height="24" className="d-inline-block align-text-top"/>
                        E-Commerce
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto"> {/* Using ms-auto to push the nav items to the right */}
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                               Register
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link to="/buyer_reg" className="dropdown-item">Buyer</Link></li>
                                <li><Link to="/seller_reg" className="dropdown-item">Seller</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link  me-5">Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
