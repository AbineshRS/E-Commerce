import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Buyer_view_addcard() {
    const navigate = useNavigate();
    const id = sessionStorage.getItem('ID');
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        loadCart();
        loadCartCount();
    }, []);
    async function loadCartCount() {
        const id = sessionStorage.getItem('ID');
        try {
            const result = await axios.get(`https://localhost:7135/Ecommerce/Buyer/addedcard/${id}`);
            setCartCount(result.data.length);
        } catch (error) {
            console.error("Error fetching cart count:", error);
        }
    }
    async function loadCart() {
        const token = sessionStorage.getItem('token');
        if (!token) {
            alert("Please login first.");
            navigate('/login');
            return;
        }

        try {
            const result = await axios.get(`https://localhost:7135/Ecommerce/Buyer/addedcard/${id}`);
            setCartItems(result.data);
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

    const totalAmount = Array.isArray(cartItems)
        ? cartItems.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0)
        : 0;

    const handleViewDetails = (productId) => {
        navigate('/buyer_buyproduct', { state: { id: productId } });
    };

    const handleBuyAll = async (e) => {
        e.preventDefault();

        const token = sessionStorage.getItem('token');
        if (!token) {
            alert("Session expired. Please login again.");
            navigate('/login');
            return;
        }

        if (cartItems.length === 0) {
            alert("Cart is empty");
            return;
        }

        try {
            // Prepare payload for updatecard API
            const updatePayload = cartItems.map(item => ({
                UserId: item.userId,
                ProductId: item.productId,
                Quantity: item.quantity,
                Status: 0  // You can set the desired status here
            }));

            // Call the updatecard API to update both tables
            await axios.put(
                'https://localhost:7135/Ecommerce/Buyer/updatecard',
                updatePayload,
                { headers: { 'Content-Type': 'application/json' } }
            );

            // Then send orders to buyerbuyed endpoint
            const payload = cartItems.map(item => ({
                UserId: item.userId,
                ProductId: item.productId,
                SellerId: item.sellerId,
                Username: item.username,
                Email: item.email,
                product_Buyed_Details: [{
                    Productname: item.productname,
                    Productdescription: item.productdescription,
                    Quantity: item.quantity.toString(),
                    Amount: item.amount.toString(),
                    Address: item.address
                }]
            }));

            for (let order of payload) {
                await axios.post(
                    'https://localhost:7135/Ecommerce/Buyer/buyerbuyed',
                    order,
                    { headers: { 'Content-Type': 'application/json' } }
                );
            }

            alert('All products purchased and updated successfully.');
            navigate('/buyer');

        } catch (error) {
            console.error("Purchase or update failed:", error);
            alert('Purchase failed. Please try again.');
        }
    };
    const handledelete = async (id) => {
        try {
            await axios.put(`https://localhost:7135/Ecommerce/Buyer/remove/${id}`,{
                 status: 0
            });
            alert("Item removed successfully.");
            loadCart();
            // Optional: Refresh the cart or list
        } catch (error) {
            console.error("Error removing item:", error);
            alert("Failed to remove item.");
        }
    };


return (
    <div className="container mt-4">
        <h2 className="text-center mb-4">My Cart</h2>
        <table className="table table-striped">
            <thead className="thead-dark">
                <tr>
                    <th>Si No</th>
                    <th hidden>User ID</th>
                    <th hidden>Product ID</th>
                    <th hidden>Seller ID</th>
                    <th hidden>Username</th>
                    <th hidden>Email</th>
                    <th>Product Name</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Quantity</th>
                    <th>Address</th>
                    <th>View</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <tr key={`${item.userId}-${item.productId}`}>
                            <td >{index + 1}</td>
                            <td hidden>{item.userId}</td>
                            <td hidden>{item.productId}</td>
                            <td hidden>{item.sellerId}</td>
                            <td hidden>{item.username}</td>
                            <td hidden>{item.email}</td>
                            <td>{item.productname}</td>
                            <td>{item.productdescription}</td>
                            <td>{item.amount}</td>
                            <td>{item.quantity}</td>
                            <td>{item.address}</td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleViewDetails(item.productId)}
                                >
                                    Buy Now
                                </button>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handledelete(item.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="12" className="text-center">No products found in cart.</td>
                    </tr>
                )}
            </tbody>
        </table>

        <div className="text-center my-4">
            <h4>Total Amount: ₹{totalAmount.toFixed(2)}</h4>
            <form onSubmit={handleBuyAll}>
                <button type="submit" className="btn btn-success mt-2">Buy All</button>
            </form>
        </div>
    </div>
);
}

export default Buyer_view_addcard;
