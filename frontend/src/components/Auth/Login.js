import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import './Login.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser, setAdmin } from '../Store/authSlice';

function Login({ userType, api, showRegister = true }) {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

    try {
        const res = await axios.post(api, {
            email: inputs.email,
            password: inputs.password
        });
        setErrorMessage('');
        const data = res.data;

        if (userType === "user") {
            dispatch(setUser(data));
            navigate('/');
        } else if (userType === "admin") {
            dispatch(setAdmin(data));
            navigate('/movies');
        }

    } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
            setErrorMessage(Object.values(error.response.data.errors).join(' '));
        } else {
            setErrorMessage('User does not exist');
        }
    }
    };

    return (
        <div className="container mt-5">
            <div className='row justify-content-center align-items-center'>
                <div className='col-sm-8 col-md-6 col-lg-4'>
            <div className="card mt-5">
                <h2 className="card-title">Login</h2>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <form className="card-body" onSubmit={handleSubmit}>
                    <div className="form-group">
                       
                        <input
                        value={inputs.email}
                        onChange={handleChange}
                        name='email'
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-group">
                 
                        <input
                        value={inputs.password}
                        onChange={handleChange}
                        name='password'
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                </form>
                {showRegister && (
                <p className="login-register-link">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
                )}
            </div>
            </div>
            </div>
        </div>
    );
};

export default Login;
