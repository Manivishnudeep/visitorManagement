import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckInRequests from './CheckInRequests';
import CheckOutRequests from './CheckOutRequests';

const TabsContainer = () => {
    const [activeTab, setActiveTab] = useState('check-in');
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const renderContent = () => {
        switch (activeTab) {
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
                <button
                    className="btn btn-danger ml-auto"
                    onClick={handleSignOut}
                >
                    Sign Out
                </button>
            </div>
            <div className="tab-content mt-3">
                {renderContent()}
            </div>
        </div>
    );
};

export default TabsContainer;
