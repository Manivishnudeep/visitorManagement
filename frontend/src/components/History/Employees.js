import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from "react-router-dom";

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [editingEmployeeId, setEditingEmployeeId] = useState(null); // ID of the employee being edited
    const [editName, setEditName] = useState(''); // Name being edited

    // For Add User Modal
    const [showModal, setShowModal] = useState(false);  // Modal visibility state
    const [newEmployeeName, setNewEmployeeName] = useState('');
    const [newEmployeeId, setNewEmployeeId] = useState('');

    useEffect(() => {
        // Fetch all employees
        const fetchEmployees = async () => {
            try {
                const response = await api.get('/employees');
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    // Handle edit button click
    const handleEdit = (employee) => {
        setEditingEmployeeId(employee.employeeId);
        setEditName(employee.name);
    };

    // Handle save button click
    const handleSave = async (employee) => {
        try {
            await api.put(`/employees/${employee._id}`, { name: editName });
            setEmployees((prevEmployees) =>
                prevEmployees.map((emp) =>
                    emp.employeeId === employee.employeeId ? { ...emp, name: editName } : emp
                )
            );
            setEditingEmployeeId(null); // Exit editing mode
        } catch (error) {
            console.error('Error saving employee:', error);
        }
    };

    // Handle delete button click
    const handleDelete = async (employee) => {
        try {
            await api.delete(`/employees/${employee._id}`);
            setEmployees((prevEmployees) =>
                prevEmployees.filter((emp) => emp.employeeId !== employee.employeeId)
            );
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    // Handle adding a new employee
    const handleAddEmployee = async () => {
        try {
            const newEmployee = {
                name: newEmployeeName,
                employeeId: newEmployeeId,
            };
            const response = await api.post('/employees', newEmployee);
            setEmployees((prevEmployees) => [...prevEmployees, response.data]);
            setShowModal(false); // Close modal after adding
            setNewEmployeeName('');
            setNewEmployeeId('');
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        Visitor Management System
                    </a>
                    <div className="d-flex">
                        <Link to="/login" className="btn btn-outline-primary me-2">
                            Login
                        </Link>
                        <Link to="/signup" className="btn btn-outline-success">
                            Signup
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Employee List</h2>

                    {/* Add User Button */}
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowModal(true)}
                    >
                        Add User
                    </button>
                </div>

                {/* Employees Table */}
                <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr className="table-primary">
                            <th scope="col">S.No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Employee ID</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, index) => (
                            <tr key={employee.employeeId}>
                                <td>{index + 1}</td>
                                <td>
                                    {editingEmployeeId === employee.employeeId ? (
                                        <input
                                            type="text"
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            className="form-control"
                                        />
                                    ) : (
                                        employee.name
                                    )}
                                </td>
                                <td>{employee.employeeId}</td>
                                <td className="d-grid gap-2 d-md-block">
                                    {editingEmployeeId === employee.employeeId ? (
                                        <button
                                            className="btn btn-sm btn-success me-2"
                                            onClick={() => handleSave(employee)}
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                className="btn btn-sm btn-primary me-2"
                                                onClick={() => handleEdit(employee)}
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDelete(employee)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Modal for Adding Employee */}
                {showModal && (
                    <div className="modal show" style={{ display: 'block' }} onClick={() => setShowModal(false)}>
                        <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Add New Employee</h5>
                                    <button type="button" className="close" onClick={() => setShowModal(false)}>
                                        <span>&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="employeeName">Employee Name</label>
                                        <input
                                            type="text"
                                            id="employeeName"
                                            className="form-control"
                                            value={newEmployeeName}
                                            onChange={(e) => setNewEmployeeName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="employeeId">Employee ID</label>
                                        <input
                                            type="text"
                                            id="employeeId"
                                            className="form-control"
                                            value={newEmployeeId}
                                            onChange={(e) => setNewEmployeeId(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                        Close
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={handleAddEmployee}>
                                        Save Employee
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Employees;
