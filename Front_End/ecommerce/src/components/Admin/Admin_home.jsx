import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Admin_home() {
    const [details, sedetails] = useState([]);
    const [buyerdetails, sebuyerdeatils] = useState([]);
    useEffect(() => {
        load();
        load2();
    }, []);
   


    async function load() {
        try {
            const result = await axios.get(`https://localhost:7135/admin/Admin/getseller`);
            sedetails(result.data);
        } catch (error) {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                sessionStorage.clear();
                alert("Session expired. Please login again.");
                // navigate('/login');
            } else {
                console.error("Error fetching data", error);
            }
        }
    }
    async function load2() {
        try {
            const result = await axios.get(`https://localhost:7135/admin/Admin/getbuyer`);
            sebuyerdeatils(result.data);
        } catch (error) {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                sessionStorage.clear();
                alert("Session expired. Please login again.");
                // navigate('/login');
            } else {
                console.error("Error fetching data", error);
            }
        }
    }

    async function toggleStatus(id, currentStatus) {
        const newStatus = currentStatus.toLowerCase() === 'active' ? 'Inactive' : 'Active';

        try {
            await axios.put(`https://localhost:7135/admin/Admin/sellerupdate/${id}`, {
                active: newStatus,
            });

            sedetails((prevDetails) =>
                prevDetails.map((detail) =>
                    detail.id === id ? { ...detail, active: newStatus } : detail
                )
            );
        } catch (error) {
            console.error("Error updating status", error);
            alert("Failed to update status.");
        }
    }
    async function toggleStatusbuyer(id, currentStatus) {
        const newStatus = currentStatus.toLowerCase() === 'active' ? 'Inactive' : 'Active';

        try {
            await axios.put(`https://localhost:7135/admin/Admin/buyerupdate/${id}`, {
                active: newStatus,
            });

            sebuyerdeatils((prevDetails) =>
                prevDetails.map((buyerdetails) =>
                    buyerdetails.id === id ? { ...buyerdetails, active: newStatus } : buyerdetails
                )
            );
        } catch (error) {
            console.error("Error updating status", error);
            alert("Failed to update status.");
        }
    }

    return (
        <div>
            <div className='p-5'>
                <h1>Seller's</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Si No</th>
                            <th scope="col">Email</th>
                            <th scope="col">Owner Name</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Address</th>
                            <th scope="col">License</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.length > 0 ? (
                            (() => {
                                let sino = 1;
                                return details.map((detail) => {
                                    const isActive = detail.active.toLowerCase() === 'active';
                                    return (
                                        <tr key={detail.id}>
                                            <td>{sino++}</td>
                                            <td>{detail.email}</td>
                                            <td>{detail.ownername}</td>
                                            <td>{detail.phonenumber}</td>
                                            <td>{detail.companyaddress}</td>
                                            <td>{detail.license}</td>

                                            <td>
                                                <button
                                                    className={`btn btn-sm ${isActive ? 'btn-danger' : 'btn-success'}`}
                                                    onClick={() => toggleStatus(detail.id, detail.active)}
                                                >
                                                    {isActive ? 'Deactivate' : 'Activate'}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                });
                            })()
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center">
                                    No Seller found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* sellers */}
            <div className='p-5'>
                <h1>Buyer's</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Si No</th>
                            <th scope="col">Email</th>
                            <th scope="col">DOB</th>
                            <th scope="col">Name</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buyerdetails.length > 0 ? (
                            (() => {
                                let sino = 1;
                                return buyerdetails.map((buyerdetails) => {
                                    const isActive = buyerdetails.active.toLowerCase() === 'active';
                                    return (
                                        <tr key={buyerdetails.id}>
                                            <td>{sino++}</td>
                                            <td>{buyerdetails.email}</td>
                                            <td>{buyerdetails.dob}</td>
                                            <td>{buyerdetails.fullName}</td>
                                            <td>{buyerdetails.gender}</td>

                                            <td>
                                                <button
                                                    className={`btn btn-sm ${isActive ? 'btn-danger' : 'btn-success'}`}
                                                    onClick={() => toggleStatusbuyer(buyerdetails.id, buyerdetails.active)}
                                                >
                                                    {isActive ? 'Deactivate' : 'Activate'}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                });
                            })()
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center">
                                    No Buyer found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Admin_home;
