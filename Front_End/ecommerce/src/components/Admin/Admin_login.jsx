import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react'
import img from '../../assets/19197947.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Admin_login() {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const navigate = useNavigate();
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://localhost:7135/Ecommerce/Buyer/login?username=${username}&password=${password}`)
            const token = response.data.token;
            if (!token) {
                alert('login');
                return;
            }
            sessionStorage.setItem('token', token);
            const decode = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            const id = decode.ID;
            sessionStorage.setItem('ID', id);
            if (decode.exp && decode.exp < currentTime) {
                // Token is expired
                alert('Session expired. Please login again.');
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('ID');
                return;
            }

            const usertype = decode.usertype;
            if (usertype == 'Admin') {
                toast.success('success');
                navigate('/admin_home');
            }
        } catch (error) {
            alert('Invalid credentials');
            console.error(error);
        }


    }
    return (
        <div>
            <div className="container mt-5 shadow-lg rounded-5">
                <form onSubmit={handlesubmit}>
                    <div className="row align-items-center">
                        {/* Image column */}
                        <div className="col-lg-6 col-md-12 mb-4">
                            <img src={img} alt="Login Visual" className="img-fluid rounded-2 w-100" />
                        </div>

                        {/* Form column */}
                        <div className="col-lg-6 col-md-12 rounded-2">
                            <div className="p-4 shadow-lg rounded">
                                <h3 className="mb-4 text-center">Admin Login</h3>
                                <input type="text" className="form-control mb-3" name='username' placeholder="Username" value={username} onChange={(e) => setusername(e.target.value)} />
                                <input type="password" className="form-control mb-3" name='password' placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} />
                                <Link to="/Forgotpassword" className='float-end p-3'>Forgot Password?</Link>
                                <button className="btn btn-primary w-100" type='submit'>Login</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Admin_login