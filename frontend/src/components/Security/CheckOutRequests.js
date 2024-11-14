import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const CheckInRequests = () => {
    const [checkInRequests, setCheckInRequests] = useState([]);

    useEffect(() => {
        const fetchCheckInRequests = async () => {
            try {
                const response = await api.get('/checkInOut/checkin');
                setCheckInRequests(response.data);
            } catch (error) {
                console.error('Error fetching check-in requests:', error);
            }
        };

        fetchCheckInRequests();
    }, []);

    return (
        <div>
            <h3>Check-In Requests</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Employee Name</th>
                        <th>Request Date</th>
                    </tr>
                </thead>
                <tbody>
                    {checkInRequests.map((request) => (
                        <tr key={request._id}>
                            <td>{request._id}</td>
                            <td>{request.employeeId.name}</td>
                            <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CheckInRequests;
