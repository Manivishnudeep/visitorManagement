import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';

const EmployeeHistory = () => {
    const { employeeId } = useParams();
    const [history, setHistory] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date
    let EmployeeName = '';
    if (history.length > 0) {
        EmployeeName = history[0].employeeId.name
    }
    const fetchHistory = async (date) => {
        try {
            const response = await api.get(`/history/${employeeId}`, { params: { date } });
            setHistory(response.data);

        } catch (error) {
            console.error('Error fetching employee history:', error);
        }
    };

    useEffect(() => {
        fetchHistory(selectedDate);
    }, [employeeId, selectedDate]);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    return (
        <div className="container mt-4">
            <h2>History for Employee : {EmployeeName}</h2>
            <Link to="/Employees" className="btn btn-primary mb-4">
                Back to Employees
            </Link>
            <div className="mb-3">
                <label htmlFor="datePicker" className="form-label">Select Date:</label>
                <div className="row">
                    <div className="col-md-3"> {/* Use a column for 1/4 width */}
                        <input
                            type="date"
                            id="datePicker"
                            className="form-control"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    </div>
                </div>
            </div>
            {history.length > 0 ?
                <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr className="table-primary">
                            <th scope="col">S.No.</th>
                            <th scope="col">Date & Time</th>
                            <th scope="col">Request Type</th>
                            <th scope="col">Action Performed</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item, index) => {
                            const date = new Date(item.timestamp);
                            return (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {date.toLocaleDateString('en-GB')} {/** Format: DD/MM/YYYY */}
                                        &nbsp;{date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                    </td>
                                    <td>{item.requestType}</td>
                                    <td>{item.action}</td>
                                    <td>
                                        <span
                                            className={`badge ${item.status === 'approved' || item.status === 'checked-in' || item.status === 'checked-out'
                                                    ? 'bg-success'
                                                    : item.status === 'pending'
                                                        ? 'bg-warning'
                                                        : 'bg-danger'
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                : (
                    <div className="text-center text-muted">No history available for this employee.</div>
                )}
        </div>
    );
};

export default EmployeeHistory;