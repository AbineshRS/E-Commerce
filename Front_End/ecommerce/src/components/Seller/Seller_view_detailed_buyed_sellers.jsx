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
        if(!token){
            navigate('/login');
            alert("Login");
            return;
        }
        const result = await axios.get(`https://localhost:7135/Ecommerce/Buyer/getdata/${id}`,{
            headers:{ 'Authorization': `Bearer ${token}`}
        })
        setdeatils(result.data);
    }
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
                        (() => {
                            let sino = 1;
                            return detail.map((detail) => (
                                <tr key={detail.username + detail.email + detail.amount+detail.quantity+detail.address}>
                                    <td>{sino++}</td>
                                    <td>{detail.username}</td>
                                    <td>{detail.email}</td>
                                    <td>{detail.amount}</td>
                                    <td>{detail.quantity}</td>
                                    <td>{detail.address}</td>
                                </tr>
                            ));
                        })()
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No products found</td>
                        </tr>
                    )}
                </tbody>

            </table>
        </div>
    )
}

export default Seller_view_detailed_buyed_sellers