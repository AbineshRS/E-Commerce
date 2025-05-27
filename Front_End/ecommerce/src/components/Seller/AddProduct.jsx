// AddProduct.jsx

import React, { useState } from 'react';
import img from '../../assets/10915798.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddProduct() {
    const id = sessionStorage.getItem('ID');
    const token = sessionStorage.getItem('token');
    const categories = [
        "Mobile Phones", "Laptops", "Headphones", "Men’s Clothing", "Women’s Clothing",
        "Shoes", "Watches", "Furniture", "Home Decor", "Kitchen Appliances",
        "Skincare", "Makeup", "Fitness Equipment", "Books", "Toys",
        "Car Accessories", "Baby Clothing", "Pet Supplies", "Snacks", "Beverages"
    ];

    const [addProducts, setProduct] = useState({
        UserId: id,
        Productname: '',
        Productdescription: '',
        Category: '',
        Spesification: '',
        Amount: '',
        Picture: null
    });

    const handleChange = (e) => {
        setProduct({ ...addProducts, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setProduct({ ...addProducts, Picture: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('UserId', addProducts.UserId);
        formData.append('Productname', addProducts.Productname);
        formData.append('Productdescription', addProducts.Productdescription);
        formData.append('Category', addProducts.Category);
        formData.append('Spesification', addProducts.Spesification);
        formData.append('Amount', addProducts.Amount);
        formData.append('Quantity', addProducts.Quantity);

        if (addProducts.Picture) {
            formData.append('profilePicture', addProducts.Picture);
        }

        try {
            await axios.post(`https://localhost:7135/Seller/Seller/addproduct`, formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`

                    }
                }
            );
            toast.success('Product added successfully');

            setProduct({
                UserId: addProducts.UserId,
                Productname: '',
                Productdescription: '',
                Category: '',
                Spesification: '',
                Amount: '',
                Quantity: '',
                Picture: null
            });

            document.querySelector('input[name="Picture"]').value = '';

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
    };

    return (
        <div className="container my-5 shadow-lg rounded-3 p-5">
            <div className="row justify-content-center mb-4">
                <div className="col-12 col-md-8 text-center">
                    <img src={img} alt="Product" className="img-fluid rounded shadow-sm mb-4" style={{ maxHeight: '400px', objectFit: 'cover', border: '2px solid #dee2e6' }} />
                </div>
            </div>

            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-12 col-md-6">
                        <label className="form-label">Product Name</label>
                        <input type="text" name="Productname" className="form-control" value={addProducts.Productname} onChange={handleChange} />
                    </div>
                    <div className='col-12 col-md-6'>
                        <label className="form-label">Quantity</label>
                        <input type="text" name="Quantity" id="" className='form-control' value={addProducts.Quantity} onChange={handleChange} />
                    </div>


                    <div className="col-12 col-md-6">
                        <label className="form-label">Category</label>
                        <select name="Category" className="form-select" value={addProducts.Category} onChange={handleChange}>
                            <option value="">Select Category</option>
                            {categories.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12 col-md-6">
                        <label className="form-label">Specification</label>
                        <input type="text" name="Spesification" className="form-control" value={addProducts.Spesification} onChange={handleChange} />
                    </div>

                    <div className="col-12 col-md-6">
                        <label className="form-label">Amount</label>
                        <input type="number" name="Amount" className="form-control" value={addProducts.Amount} onChange={handleChange} />
                    </div>

                    <div className="col-12 col-md-6">
                        <label className="form-label">Image</label>
                        <input type="file" name="Picture" className="form-control" accept='image/*' onChange={handleFileChange} />
                    </div>
                    <div className="col-12 col-md-12">
                        <label className="form-label">Product Description</label>
                        <textarea type="text" name="Productdescription" className="form-control" value={addProducts.Productdescription} onChange={handleChange} />
                    </div>
                </div>

                <div className="mt-4 text-center">
                    <button type="submit" className="btn btn-primary px-4">Add Product</button>
                </div>
            </form>
        </div>
    );
}

export default AddProduct;
