import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const CheckInRequests = () => {
    const [checkInRequests, setCheckInRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null); // Track the selected request for the popup

    useEffect(() => {
        const fetchCheckInRequests = async () => {
            try {
                const response = await api.get('/approver/check-in');
                setCheckInRequests(response.data);
            } catch (error) {
                console.error('Error fetching check-in requests:', error);
            }
        };

        fetchCheckInRequests();
    }, [checkInRequests]);

    const handleRowClick = (request) => {
        setSelectedRequest(request); // Open the modal with the selected request
    };

    const handleApprove = async () => {
        if (selectedRequest) {
            try {
                await api.put(`/approver/${selectedRequest._id}`, { status: 'approved' });
                setCheckInRequests(checkInRequests.map(req => req._id === selectedRequest._id ? { ...req, status: 'approved' } : req));
                setSelectedRequest(null); // Close the modal
            } catch (error) {
                console.error('Error approving request:', error);
            }
        }
    };

    const handleReject = async () => {
        if (selectedRequest) {
            try {
                await api.put(`/approver/${selectedRequest._id}`, { status: 'rejected' });
                setCheckInRequests(checkInRequests.map(req => req._id === selectedRequest._id ? { ...req, status: 'rejected' } : req));
                setSelectedRequest(null); // Close the modal
            } catch (error) {
                console.error('Error rejecting request:', error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Check-In Requests</h3>
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
                    {checkInRequests.map((request, index) => (
                        <tr
                            key={request._id}
                            onClick={() => handleRowClick(request)}
                            style={{ cursor: "pointer" }}
                        >
                            <td>{index + 1}</td>
                            <td>{request.employeeId.name}</td>
                            <td>{request.requestType}</td>
                            <td>{request.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedRequest && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Action</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setSelectedRequest(null)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    Are you sure you want to check-in for{" "}
                                    <strong>{selectedRequest.employeeId.name}</strong>?
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleApprove}
                                >
                                    Approve
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleReject}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckInRequests;