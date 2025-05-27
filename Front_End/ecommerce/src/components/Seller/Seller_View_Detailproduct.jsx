import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Seller_View_Detailproduct() {

    //Load Data
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state;

    useEffect(() => {
        load();
    }, [id]);

    async function load() {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            const result = await axios.get(`https://localhost:7135/Seller/Seller/viewdetails/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
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
    //Update code
    const [details, setdetails] = useState({
        productname: '',
        productdescription: '',
        category: '',
        spesification: '',
        amount: '',
        quantity: '',
        picture: ''
    });
    const handlechnage = (e) => {
        setdetails({ ...details, [e.target.name]: e.target.value });
    };
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handlesubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('Productname', details.productname);
        formData.append('Productdescription', details.productdescription);
        formData.append('Category', details.category);
        formData.append('Spesification', details.spesification);
        formData.append('Amount', details.amount);
        formData.append('Quantity', details.quantity);

        if (file) {
            formData.append('formFile', file);
        }

        const token = sessionStorage.getItem('token');

        await axios.put(`https://localhost:7135/Seller/Seller/update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });
        toast.warning('Product Updated');
        load();
    };



    return (
        <div className='container mt-4 shadow-lg rounded-5 p-4 p-md-5 mb-5'>
            <form onSubmit={handlesubmit}>

                <div className='col-12  d-flex justify-content-center '>
                    <img
                        src={`https://localhost:7135/${details.picture}`}
                        alt="Product"
                        style={{ cursor: 'pointer', height: '200px', objectFit: 'cover' }}
                        className="img-fluid mb-3 rounded-2 "
                    />
                </div>



                <div className='row g-3'>
                    <div className='col-12 col-md-6'>
                        <label>Product Name</label>
                        <input type="text" name="productname" className='form-control' value={details.productname} onChange={handlechnage} />
                    </div>
                    <div className='col-12 col-md-6'>
                        <label>Product Description</label>
                        <input type="text" name="productdescription" className='form-control' value={details.productdescription} onChange={handlechnage} />
                    </div>
                </div>

                <div className='row g-3 mt-2'>
                    <div className='col-12 col-md-6'>
                        <label>Category</label>
                        <select className="form-select" value={details.category} name='category' onChange={handlechnage}>
                            <option value="">Select Category</option>
                            <option value="Mobile Phones">Mobile Phones</option>
                            <option value="Laptops">Laptops</option>
                            <option value="Headphones">Headphones</option>
                            <option value="Men’s Clothing">Men’s Clothing</option>
                            <option value="Women’s Clothing">Women’s Clothing</option>
                            <option value="Shoes">Shoes</option>
                            <option value="Watches">Watches</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Home Decor">Home Decor</option>
                            <option value="Kitchen Appliances">Kitchen Appliances</option>
                            <option value="Skincare">Skincare</option>
                            <option value="Makeup">Makeup</option>
                            <option value="Fitness Equipment">Fitness Equipment</option>
                            <option value="Books">Books</option>
                            <option value="Toys">Toys</option>
                            <option value="Car Accessories">Car Accessories</option>
                            <option value="Baby Clothing">Baby Clothing</option>
                            <option value="Pet Supplies">Pet Supplies</option>
                            <option value="Snacks">Snacks</option>
                            <option value="Beverages">Beverages</option>
                        </select>
                    </div>
                    <div className='col-12 col-md-6'>
                        <label>Specification</label>
                        <input type="text" name="spesification" className='form-control' value={details.spesification} onChange={handlechnage} />
                    </div>
                </div>

                <div className='row g-3 mt-2'>
                    <div className='col-12 col-md-6'>
                        <label>Amount</label>
                        <input type="text" name="amount" className='form-control' value={details.amount} onChange={handlechnage} />
                    </div>
                    <div className='col-12 col-md-6'>
                        <label>Quantity</label>
                        <input type="text" name="quantity" className='form-control' value={details.quantity} onChange={handlechnage} />
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className='col'>
                        <label >Image</label>
                        <input type="file" accept="image/*" onChange={handleFileChange} className="form-control mt-2" />
                    </div>
                </div>
                <div className='row mt-4'>
                    <div className='col-12 text-center'>
                        <button type='submit' className='btn btn-warning col-5'>Update</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Seller_View_Detailproduct;
