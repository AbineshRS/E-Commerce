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
        lodimg();
    }, []);

    async function load() {
        const token = sessionStorage.getItem('ID');
        if (!token) {
            alert('login');
            navigate('/login');
            return;
        } else {
            try {
                const result = await axios.get(`https://localhost:7135/Ecommerce/Buyer/getproduct`);
                setdetails(result.data);
            } catch (error) {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    // Token is invalid or expired
                    sessionStorage.clear();
                    alert("Session expired. Please login again.");
                    navigate('/login');
                } else {
                    console.error("Error fetching data", error);
                }
            }

        }
    }
    const [imgdetails, setimagedetails] = useState([]);
    async function lodimg() {
        const resultimg = await axios.get(`https://localhost:7135/Ecommerce/Buyer/getproductimage`)
        setimagedetails(resultimg.data);
    }

    const handleviewdetails = (detail) => {
        navigate('/buyer_buyproduct', {
            state: { id: detail }
        })
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

                <div id="carouselExampleCaptions" className="carousel slide">
                    <div className="carousel-indicators">
                        {imgdetails.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide-to={index}
                                className={index === 0 ? "active" : ""}
                                aria-current={index === 0 ? "true" : undefined}
                                aria-label={`Slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>

                    <div className="carousel-inner">
                        {imgdetails.map((imgdetail, index) => (
                            <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                                <img
                                    src={`https://localhost:7135/${imgdetail.picture}`}
                                    className="d-block w-100 carousel-img"
                                    alt={`Slide ${index + 1}`}
                                />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>{imgdetail.productname}</h5>
                                    <p>{imgdetail.productdescription}</p>
                                </div>
                            </div>
                        ))}
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
                            <div className="col-12 col-md-4 mt-3" key={detail.serialNo}> {/* Use a unique identifier from the data */}
                                <div className="card h-100">
                                    <img src={`https://localhost:7135/${detail.picture}`} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} alt="..." />
                                    <div className="card-body d-flex flex-column shadow">
                                        <h5 className="card-title">{detail.productname}</h5>
                                        <p className="card-text flex-grow-1">{detail.productdescription}</p>
                                        <button className="btn btn-primary mt-auto" onClick={() => handleviewdetails(detail.id)}>View Product</button>
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
