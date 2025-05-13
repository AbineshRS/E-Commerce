import React, { useEffect, useState } from 'react'
import img1 from '../../assets/2672252.jpg'
import img2 from '../../assets/5860.jpg'
import img3 from '../../assets/3255317.jpg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Buyer_home() {
    const navigate = useNavigate();
    const [details, setdetails] = useState([]);

    useEffect(() => {
        load();
    }, []);

    async function load() {
        const token = sessionStorage.getItem('ID');
        if (!token) {
            alert('login');
            navigate('/login');
            return;
        } else {
            const result = await axios.get(`https://localhost:7135/Ecommerce/Buyer/getproduct`);
            setdetails(result.data);
        }
    }
    

    return (
        <div>
            <div className="container my-4">
                {/* Inline CSS for uniform image size */}
                <style>{`
                    .carousel-img {
                        height: 400px; /* Set desired height */
                        object-fit: cover; /* Crop nicely */
                    }

                    @media (max-width: 768px) {
                        .carousel-img {
                            height: 250px; /* Smaller height on mobile */
                        }
                    }
                `}</style>

                {/* Carousel */}
                <div id="carouselExampleCaptions" className="carousel slide">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={img1} className="d-block w-100 carousel-img" alt="First slide" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src={img2} className="d-block w-100 carousel-img" alt="Second slide" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Second slide label</h5>
                                <p>Some representative placeholder content for the second slide.</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src={img3} className="d-block w-100 carousel-img" alt="Third slide" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Third slide label</h5>
                                <p>Some representative placeholder content for the third slide.</p>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

                {/* Product Cards */}
                <div className="row mt-5">
                    {details.length > 0 ? (
                        details.map((detail) => (
                            <div className="col-12 col-md-4" key={detail.serialNo}> {/* Use a unique identifier from the data */}
                                <div className="card h-100">
                                <img src={`https://localhost:7135/${detail.picture}`} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} alt="..." />
                                <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{detail.productname}</h5>
                                        <p className="card-text flex-grow-1">{detail.productdescription}</p>
                                        <button className="btn btn-primary mt-auto">View Product</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products available</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Buyer_home;
