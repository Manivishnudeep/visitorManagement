import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PendingRequests from './PendingRequests';
import CheckInRequests from './CheckInRequests';
import CheckOutRequests from './CheckOutRequests';
import api from '../../services/api';

const TabsContainer = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('requested');
    const [showModal, setShowModal] = useState(false);
    const [employeeId, setEmployeeId] = useState('');
    const [requestType, setRequestType] = useState('check-in');
    const [purposeOfVisit, setpurposeOfVisit] = useState('');

    const handleShowModal = () => setShowModal(true);

    const handleCloseModal = () => {
        setShowModal(false);
        setEmployeeId('');
        setRequestType('check-in');
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const fetchEmployeeData = async (employeeId) => {
        try {
          const response = await api.get(`/employees/${employeeId}`);
          const data=response.data
          return data._id;
        } catch (error) {
          console.error('Error fetching employee data:', error);
        }
      };
      
    const handleCreateRequest = async () => {
        const _id=await fetchEmployeeData(employeeId)
        const requestData = {
            employeeId:_id,
            requestType,
        };
        
        try {
            const response = await api.post('/checkInOut', requestData);
            if (response.status === 200 || response.status === 201) {
                // alert('Request created successfully');
                handleCloseModal();
            } else {
                alert('Failed to create request');
            }
        } catch (error) {
            console.error('Error creating request:', error);
            alert('An error occurred while creating the request');
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'requested':
                return <PendingRequests />;
            case 'check-in':
                return <CheckInRequests />;
            case 'check-out':
                return <CheckOutRequests />;
            default:
                return null;
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex align-items-center mb-3" style={{ borderBottom: '1px solid #dee2e6' }}>
                <ul className="nav nav-tabs flex-grow-1">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'requested' ? 'active' : ''}`}
                            onClick={() => setActiveTab('requested')}
                        >
                            PendingRequests
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'check-in' ? 'active' : ''}`}
                            onClick={() => setActiveTab('check-in')}
                        >
                            Check-In
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'check-out' ? 'active' : ''}`}
                            onClick={() => setActiveTab('check-out')}
                        >
                            Check-Out
                        </button>
                    </li>
                </ul>
                <button className="btn btn-primary mx-2" onClick={handleShowModal}>
                    + Add User
                </button>
                <button className="btn btn-danger" onClick={handleSignOut}>
                    Sign Out
                </button>
            </div>
            <div className="tab-content mt-3">
                {renderContent()}
            </div>

            {showModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Creating Check-In/Check-Out Request</h5>
                                <button type="button" className="close" aria-label="Close" onClick={handleCloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="employeeId">Emp ID</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="employeeId"
                                            value={employeeId}
                                            onChange={(e) => setEmployeeId(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="requestType">Request Type</label>
                                        <select
                                            className="form-control"
                                            id="requestType"
                                            value={requestType}
                                            onChange={(e) => setRequestType(e.target.value)}
                                        >
                                            <option value="check-in">Check-In</option>
                                            <option value="check-out">Check-Out</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="purposeOfVisit">Purpose Of Visit</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="purposeOfVisit"
                                            value={purposeOfVisit}
                                            onChange={(e) => setpurposeOfVisit(e.target.value)}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleCreateRequest}>
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModal && <div className="modal-backdrop fade show"></div>}
        </div>
    );
};

export default TabsContainer;
