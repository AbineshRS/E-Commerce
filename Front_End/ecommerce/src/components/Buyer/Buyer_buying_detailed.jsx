import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Buyer_buying_detailed() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};

  const [details, setDetails] = useState({
    id: '',
    productname: '',
    productdescription: '',
    category: '',
    spesification: '',
    amount: '',
    quantity: '',
    userid: '',
    picture: ''
  });

  const [userDetail, setUserDetail] = useState({
    id: '',
    firstName: '',
    email: '',
    address: '',
  });

  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (id) {
      load();
      loadUserDetails();
    }
  }, [id]);

  useEffect(() => {
    const price = parseFloat(details.amount);
    if (!isNaN(price)) {
      setTotalAmount(price * selectedQuantity);
    }
  }, [details.amount, selectedQuantity]);

  async function load() {
    try {
      const result = await axios.get(`https://localhost:7135/Ecommerce/Buyer/getdetails/${id}`);
      setDetails(result.data);
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

  async function loadUserDetails() {
    const token = sessionStorage.getItem('ID');
    if (!token) {
      alert("Token not found");
      navigate('/login');
      return;
    }

    try {
      const user = await axios.get(`https://localhost:7135/Ecommerce/Buyer/userid/${token}`);
      setUserDetail(user.data);
    } catch (error) {
      console.error("Error loading user details:", error);
      alert("Failed to load user details.");
    }
  }

  const handleSelectChange = (e) => {
    setSelectedQuantity(Number(e.target.value));
  };

  const updateProductQuantity = async () => {
    try {
      const payload = {
        id: details.id,
        userId: details.userId,
        productname: details.productname,
        productdescription: details.productdescription,
        category: details.category,
        spesification: details.spesification,
        amount: details.amount,
        picture: details.picture,
        quantity: selectedQuantity
      };

      await axios.put(
        `https://localhost:7135/Ecommerce/Buyer/update/${details.id}`,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log("Quantity updated successfully.");
    } catch (error) {
      console.error("Failed to update quantity:", error.response?.data || error.message);
      alert("Quantity update failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!details.id || !userDetail.id) {
      alert("Missing product or user information.");
      return;
    }

    const totalAmountCalculated = parseFloat(details.amount) * selectedQuantity;

    const payload = {
      UserId: userDetail.id,
      ProductId: details.id,
      SellerId: details.userId,
      Username: userDetail.firstName,
      Email: userDetail.email,
      product_Buyed_Details: [
        {
          Productname: details.productname,
          Productdescription: details.productdescription,
          Quantity: selectedQuantity.toString(),
          Amount: totalAmountCalculated.toString(),
          Address: userDetail.address,
        }
      ]
    };

    try {
      await axios.post(
        'https://localhost:7135/Ecommerce/Buyer/buyerbuyed',
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      await updateProductQuantity(); // ✅ Update product quantity after purchase

      alert('Purchase successful');
      navigate('/buyer'); // or any page you want to redirect to
    } catch (error) {
      console.error("Purchase failed:", error.response || error.message);
      alert('Purchase failed. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <h3>Product Purchase</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>User Email</label>
          <input type="text" className="form-control" value={userDetail.email} disabled />
        </div>

        <div className="mb-3">
          <label>User Address</label>
          <input type="text" className="form-control" value={userDetail.address} disabled />
        </div>

        <div className="mb-3">
          <label>Select Quantity</label>
          <select className="form-select" value={selectedQuantity} onChange={handleSelectChange}>
            {[...Array(Number(details.quantity) || 1)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Seller Id</label>
          <input type="text" className="form-control" value={details.userId} disabled />
        </div>

        <div className="mb-3">
          <label>Product Id</label>
          <input type="text" className="form-control" value={details.id} disabled />
        </div>

        <div className="mb-3">
          <label>User Id</label>
          <input type="text" className="form-control" value={userDetail.id} disabled />
        </div>

        <div className="mb-3">
          <label>User Name</label>
          <input type="text" className="form-control" value={userDetail.firstName} disabled />
        </div>

        <div className="mb-3">
          <label>Product Name</label>
          <input type="text" className="form-control" value={details.productname} disabled />
        </div>

        <div className="mb-3">
          <label>Product Description</label>
          <input type="text" className="form-control" value={details.productdescription} disabled />
        </div>

        <div className="mb-3">
          <label>Total Amount</label>
          <input
            type="text"
            className="form-control"
            value={totalAmount.toLocaleString('en-IN')}
            disabled
          />
        </div>

        <div className="row">
          <button type="submit" className="btn btn-primary mb-4">
            Buy
          </button>
        </div>
      </form>
    </div>
  );
}

export default Buyer_buying_detailed;
