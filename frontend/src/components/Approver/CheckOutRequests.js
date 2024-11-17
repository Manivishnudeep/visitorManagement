import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const CheckInRequests = () => {
    const [CheckOutRequests, setCheckInRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchCheckInRequests = async () => {
            try {
                const response = await api.get('/approver/check-out');
                setCheckInRequests(response.data);
            } catch (error) {
                console.error('Error fetching check-in requests:', error);
            }
        };

        fetchCheckInRequests();
    }, [reload]);

    const handleRowClick = (request) => {
        setSelectedRequest(request); // Open the modal with the selected request
    };

    const handleApprove = async () => {
        if (selectedRequest) {
            try {
                await api.put(`/approver/${selectedRequest._id}`, { status: 'approved' });
                setReload(!reload)
                setSelectedRequest(null);
            } catch (error) {
                console.error('Error approving request:', error);
            }
        }
    };

    const handleReject = async () => {
        if (selectedRequest) {
            try {
                await api.put(`/approver/${selectedRequest._id}`, { status: 'rejected' });
                setReload(!reload);
                setSelectedRequest(null);
            } catch (error) {
                console.error('Error rejecting request:', error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Check-out Requests</h3>
            <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">S.No.</th>
                        <th scope="col">Employee Name</th>
                        <th scope="col">Request Type</th>
                        <th scope='col'>Purpose of Visit</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {CheckOutRequests.map((request, index) => (
                        <tr
                            key={request._id}
                            onClick={() => handleRowClick(request)}
                            style={{ cursor: "pointer" }}
                        >
                            <td>{index + 1}</td>
                            <td>{request.employeeId.name}</td>
                            <td>{request.requestType}</td>
                            <td>{request.purposeOfVisit}</td>
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
                                    Are you sure you want to check-out for{" "}
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