import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Seller_viewproduct() {
    const navigate = useNavigate();
    const id = sessionStorage.getItem('ID');
    const token = sessionStorage.getItem('token');
    const [details, sedetails] = useState([]);
    useEffect(() => {
        load();
    }, []);
    async function load() {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        const result = await axios.get(`https://localhost:7135/Seller/Seller/productlist/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        sedetails(result.data);
    }
    const handleviewDetails = (productdetails) => {
        navigate('/viewdetailed', {
            state: { id: productdetails }
        })
    }
    return (
        <div className='p-5'>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Si No</th>
                        <th scope="col">Productname</th>
                        <th scope="col">Productdescription</th>
                        <th scope="col">Category</th>
                        <th scope="col">Spesification</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {details.length > 0 ? (
                        (() => {
                            let sino = 1;
                            return details.map((detail) => (
                                <tr key={detail.id}>
                                    <td>{sino++}</td>
                                    <td>{detail.productname}</td>
                                    <td>{detail.productdescription}</td>
                                    <td>{detail.category}</td>
                                    <td>{detail.spesification}</td>
                                    <td>{detail.amount}</td>
                                    <td>{detail.quantity}</td>
                                    <td>
                                        <button onClick={() => handleviewDetails(detail.id)} className='btn btn-primary'>View</button>
                                    </td>
                                </tr>
                            ));
                        })()
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No products found</td>
                        </tr>
                    )}
                </tbody>


            </table>
        </div>
    )
}

export default Seller_viewproduct