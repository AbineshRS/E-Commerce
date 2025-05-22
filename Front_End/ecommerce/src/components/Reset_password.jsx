import React, { useEffect, useState } from 'react';
import img from '../assets/Reset.jpg';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Reset_password() {
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const navigate= useNavigate();
  const [deatil, setdetails] = useState({
    email: '',
    userId: '',
    username: '',
    password: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const extractedEmail = decoded.email || decoded.Email || '';
        const extractedId = decoded.ID || decoded.id || decoded.Id || '';

        setEmail(extractedEmail);
        setUserId(extractedId);
        setdetails(prev => ({
          ...prev,
          email: extractedEmail,
          userId: extractedId
        }));
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  const handelchang = (e) => {
    setdetails({ ...deatil, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
     e.preventDefault();
         await axios.patch(`https://localhost:7135/Ecommerce/Buyer/resetpassword/${userId}?email=${email}`, {
        username: deatil.username,
        password: deatil.password
      });
      alert('Updated');
      navigate('/login');
  };

  return (
    <div className="container my-5 shadow-lg rounded-4">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 mb-4 mb-md-0">
          <img src={img} alt="Reset" className="img-fluid w-100 rounded" />
        </div>

        <div className="col-12 col-md-6">
          <h4 className="mb-4 text-center">Reset Your Password</h4>
          <form onSubmit={handlesubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id="email" className="form-control" value={email} disabled onChange={handelchang} />
            </div>

            <div className="mb-3">
              <label htmlFor="userId" className="form-label">User ID</label>
              <input type="text" id="userId" className="form-control" value={userId} disabled onChange={handelchang} />
            </div>

            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" id="username" name="username" className="form-control" required onChange={handelchang} />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">New Password</label>
              <input type="password" id="password" name="password" className="form-control" required onChange={handelchang} />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Reset_password;
