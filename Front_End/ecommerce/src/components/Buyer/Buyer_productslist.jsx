import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Buyer_productslist() {
  const navigate = useNavigate();
  const id = sessionStorage.getItem('ID');
  const [detail, setdetail] = useState([]);
  useEffect(() => {
    load();
  }, [])
  async function load() {
    const id = sessionStorage.getItem('ID');
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/login');
      alert('Login');
      return;
    }
    try {
      const result = await axios.get(`https://localhost:7135/Ecommerce/Buyer/buyerbuyed/${id}`)
      setdetail(result.data);
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
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Si no</th>
            <th scope="col">Product Name</th>
            <th scope="col">Product Description</th>
            <th scope="col">Category</th>
            <th scope="col">Amount</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {detail.length > 0 ? (
            (() => {
              let sino = 1;
              return detail.map((detail) => (
                <tr key={detail.productname + detail.productdescription + detail.amount}>
                  <td>{sino++}</td>
                  <td>{detail.productname}</td>
                  <td>{detail.productdescription}</td>
                  <td>{detail.category}</td>
                  <td>{detail.amount}</td>
                  <td>
                    <Link to="/buyed_details" state={{ id: detail.id }} className='btn btn-primary'>View</Link>
                  </td>
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

export default Buyer_productslist