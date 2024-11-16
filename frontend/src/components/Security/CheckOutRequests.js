import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const CheckOutRequests = () => {
    const [checkedInRequests, setCheckedInRequests] = useState([]);
    const [checkOutRequests, setcheckOutRequests] = useState([]);
    const [reload, setReload] = useState("false");

    useEffect(() => {
        const fetchCheckInRequests = async () => {
            try {
                const response = await api.get('/checkInOut/checkedin');
                setCheckedInRequests(response.data);
            } catch (error) {
                console.error('Error fetching check-in requests:', error);
            }
        };
        const fetchCheckOutRequests = async () => {
            try {
                const response = await api.get('/checkInOut/checkOut');
                setcheckOutRequests(response.data);
            } catch (error) {
                console.error('Error fetching check-in requests:', error);
            }
        };

        fetchCheckInRequests();
        fetchCheckOutRequests();
    }, [reload]);

    const handleRequestCheckOut=async(request)=>{
        try {
            await api.put(`/checkInOut/${request._id}`)
            setReload(!reload)
        } catch (error) {
            console.error('Error approving request:', error);
        }
    }

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Check-out Requests</h3>
            <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Employee Name</th>
                        <th scope="col">Request Type</th>
                        <th scope='col'>Purpose Of Visit</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {checkedInRequests.map((request) => (
                        <tr key={request._id}>
                            <td>{request.employeeId.name}</td>
                            <td>{request.requestType}</td>
                            <td>{request.purposeOfVisit}</td>
                            <td>{request.status}</td>
                            <td>
                                <button className="btn btn-light text-warning d-flex align-items-center gap-2 rounded"
                                onClick={()=>handleRequestCheckOut(request)}>
                                <i className="bi bi-box-arrow-right"></i> Request Check-Out
                                </button>
                            </td>
                        </tr>
                    ))}
                    {checkOutRequests.map((request) => (
                        <tr key={request._id}>
                            <td>{request.employeeId.name}</td>
                            <td>{request.requestType}</td>
                            <td>{request.purposeOfVisit}</td>
                            <td>{request.status}</td>
                            <td>
                                <button className="btn btn-light text-warning d-flex align-items-center gap-2 rounded"
                                onClick={()=>handleRequestCheckOut(request)}>
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

export default CheckOutRequests;
