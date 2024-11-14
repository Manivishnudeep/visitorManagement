import React, { useState } from 'react';
import PendingRequests from './PendingRequests';
import CheckInRequests from './CheckInRequests';
import CheckOutRequests from './CheckOutRequests';

const TabsContainer = () => {
    const [activeTab, setActiveTab] = useState('requested');

    const renderContent = () => {
        switch (activeTab) {
            case 'requested':
                return <PendingRequests />;
            case 'check-in':
                // return (<div>Check-IN</div>)
                return <CheckInRequests />;
            case 'check-out':
                // return (<div>Check-OUT</div>)
                return <CheckOutRequests />;
            default:
                return null;
        }
    };

    return (
        <div className="container mt-4">
            <ul className="nav nav-tabs">
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
            <div className="tab-content mt-3">
                {renderContent()}
            </div>
        </div>
    );
};

export default TabsContainer;
