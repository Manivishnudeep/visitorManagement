import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const Navigate=useNavigate();
    return (
        <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
            <div className="text-center mb-4">
                <h1 className="display-4">Welcome to Visitior Management System</h1>
                <p className="lead">Effortlessly manage check-in and check-out records</p>
            </div>
            <div className="d-flex gap-3">
            <button className="btn btn-primary btn-lg" onClick={() => Navigate('/login')}>Login</button>
                <button className="btn btn-success btn-lg" onClick={() => Navigate('/signup')}>Signup</button>
                <button className="btn btn-info btn-lg text-white" onClick={() => Navigate('/Employees')}>History</button>
            </div>
        </div>
    );
};

export default Home;