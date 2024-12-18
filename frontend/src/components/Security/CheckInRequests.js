import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const CheckInRequests = () => {
    const [checkInRequests, setCheckInRequests] = useState([]);
    const [reload, setReload] = useState(false);

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
    }, [reload]);

    const handleCheckIn=async(request)=>{
        try {
            await api.put(`/checkInOut/${request._id}`)
            setReload(!reload)
        } catch (error) {
            console.error('Error approving request:', error);
        }
    }

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Check-In Requests</h3>
            <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">S.No.</th>
                        <th scope="col">Employee Name</th>
                        <th scope="col">Request Type</th>
                        <th scope='col'>Purpose of Visit</th>
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
                            <td>{request.purposeOfVisit}</td>
                            <td>{request.status}</td>
                            <td>
                                <button className="btn btn-light text-primary d-flex align-items-center gap-2 rounded"
                                onClick={()=>handleCheckIn(request)}>
                                    <i className="bi bi-box-arrow-in-right"></i> Check-In
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
