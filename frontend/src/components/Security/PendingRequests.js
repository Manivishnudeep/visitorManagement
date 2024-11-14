import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const PendingRequests = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchPendingRequests = async () => {
            try {
                const response = await api.get('/checkInOut/pending');
                setRequests(response.data);
            } catch (error) {
                console.error('Error fetching pending requests:', error);
            }
        };

        fetchPendingRequests();
    }, []);

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Pending & Declined Requests</h3>
            <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">S.No.</th>
                        <th scope="col">Employee Name</th>
                        <th scope="col">Request Type</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request, index) => (
                        <tr key={request._id}>
                            <td>{index + 1}</td>
                            <td>{request.employeeId.name}</td>
                            <td>{request.requestType}</td>
                            <td className={request.status === 'rejected' ? 'text-danger' : ''}>{request.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PendingRequests;
