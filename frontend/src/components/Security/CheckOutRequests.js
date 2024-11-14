import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const CheckInRequests = () => {
    const [checkInRequests, setCheckInRequests] = useState([]);

    useEffect(() => {
        const fetchCheckInRequests = async () => {
            try {
                const response = await api.get('/checkInOut/checkedin');
                setCheckInRequests(response.data);
            } catch (error) {
                console.error('Error fetching check-in requests:', error);
            }
        };

        fetchCheckInRequests();
    }, []);

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Check-out Requests</h3>
            <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">S.No.</th>
                        <th scope="col">Employee Name</th>
                        <th scope="col">Request Type</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {checkInRequests.map((request, index) => (
                        <tr key={request._id}>
                            <td>{index + 1}</td>
                            <td>{request.employeeId.name}</td>
                            <td>{request.requestType}</td>
                            <td>{request.status}</td>
                            <td>
                                <button className="btn btn-light text-warning d-flex align-items-center gap-2 rounded">
                                <i className="bi bi-box-arrow-right"></i> Check-Out
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CheckInRequests;
