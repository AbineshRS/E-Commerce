import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Seller_view_detailed_buyed_sellers() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};
    const [detail, setdeatils] = useState([]);
    useEffect(() => {
        load();
    }, [id])
    async function load() {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/login');
            alert("Login");
            return;
        }
        try {
            const result = await axios.get(`https://localhost:7135/Ecommerce/Buyer/getdata/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            setdeatils(result.data);
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
    const totalAmount = detail.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Si no</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Address</th>
                    </tr>
                </thead>
                <tbody>
                    {detail.length > 0 ? (
                        detail.map((detail, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{detail.username}</td>
                                <td>{detail.email}</td>
                                <td>{detail.amount}</td>
                                <td>{detail.quantity}</td>
                                <td>{detail.address}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No products found</td>
                        </tr>
                    )}
                </tbody>


            </table>
            <p className='text-center fs-3 fw-bolder'> Total: ₹{totalAmount.toLocaleString('en-IN')}</p>
        </div>
    )
}

export default Seller_view_detailed_buyed_sellers