import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Buyer_home() {
    const navigate = useNavigate();
    const [details, setdetails] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [imgdetails, setimagedetails] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;

    useEffect(() => {
        load();
        lodimg();
    }, []);

    useEffect(() => {
        handleSearch(searchTerm);
    }, [searchTerm, details]);

    async function load() {
        const token = sessionStorage.getItem('token'); // Fix: get correct token
        if (!token) {
            alert('Login required');
            sessionStorage.clear();
            navigate('/login');
            return;
        }
        try {
            const result = await axios.get(`https://localhost:7135/Ecommerce/Buyer/getproduct`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setdetails(result.data);
            setFiltered(result.data);
        } catch (error) {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                sessionStorage.clear();
                alert("Session expired. Please login again.");
                navigate('/login');
            } else {
                console.error("Error fetching data", error);
            }
        }
    }

    async function lodimg() {
        try {
            const resultimg = await axios.get(`https://localhost:7135/Ecommerce/Buyer/getproductimage`);
            setimagedetails(resultimg.data);
        } catch (error) {
            console.error("Image load error", error);
        }
    }

    const handleviewdetails = (id) => {
        navigate('/buyer_buyproduct', { state: { id } });
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        const filtered = details.filter((item) =>
            item.productname.toLowerCase().includes(term.toLowerCase()) ||
            item.productdescription.toLowerCase().includes(term.toLowerCase())
        );
        setFiltered(filtered);
        setCurrentPage(1); // Reset to first page
    };

    // Pagination logic
    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    const currentProducts = filtered.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filtered.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container my-4">
            <style>{`
                .carousel-img { height: 400px; object-fit: cover; }
                @media (max-width: 768px) {
                    .carousel-img { height: 250px; }
                }
            `}</style>


            {/* Search */}
            <div className="row mb-4 justify-content-end">
                <div className="col-md-3">
                    <label htmlFor="exampleDataList" className="form-label">Search Product</label>
                    <div className="input-group">

                        <input
                            className="form-control"
                            list="datalistOptions"
                            id="exampleDataList"
                            placeholder="Type to search..."
                            aria-describedby="search-icon"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                        <span className="input-group-text" id="search-icon">
                            <i className="bi bi-search"></i>
                        </span>
                        <datalist id="datalistOptions">
                            {details.slice(-5).map((item, index) => (
                                <option key={index} value={item.productname} />
                            ))}
                        </datalist>
                    </div>
                </div>
            </div>





            {/* Carousel */}
            <div id="carouselExampleCaptions" className="carousel slide mb-5">
                <div className="carousel-indicators">
                    {imgdetails.map((_, index) => (
                        <button key={index} type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={index}
                            className={index === 0 ? "active" : ""} aria-current={index === 0 ? "true" : undefined}
                            aria-label={`Slide ${index + 1}`}></button>
                    ))}
                </div>
                <div className="carousel-inner">
                    {imgdetails.map((imgdetail, index) => (
                        <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                            <img src={`https://localhost:7135/${imgdetail.picture}`} className="d-block w-100 carousel-img" alt="" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>{imgdetail.productname}</h5>
                                <p>{imgdetail.productdescription}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
            </div>

            {/* Products Grid */}
            <div className="row">
                {currentProducts.length > 0 ? (
                    currentProducts.map((detail) => (
                        <div className="col-12 col-md-4 mt-3" key={detail.serialNo || detail.id}>
                            <div className="card h-100">
                                <img src={`https://localhost:7135/${detail.picture}`} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} alt="..." />
                                <div className="card-body d-flex flex-column shadow">
                                    <h5 className="card-title">{detail.productname}</h5>
                                    <p className="card-text flex-grow-1">{detail.productdescription}</p>
                                    <p className="card-text flex-grow-1 text-center fw-bolder">
                                        ₹{parseFloat(detail.amount).toLocaleString('en-IN')}
                                    </p>
                                    <button className="btn btn-primary mt-auto" onClick={() => handleviewdetails(detail.id)}>View Product</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <nav className="mt-4">
                    <ul className="pagination justify-content-center">
                        {[...Array(totalPages).keys()].map((number) => (
                            <li key={number} className={`page-item ${currentPage === number + 1 ? "active" : ""}`}>
                                <button onClick={() => paginate(number + 1)} className="page-link">
                                    {number + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </div>
    );
}

export default Buyer_home;
