import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import './Login.css';

function Register() {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        passwordConf: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (inputs.password !== inputs.passwordConf) {
            setErrorMessage('Passwords do not match');
            return;
        }

        const user = {
            email: inputs.email,
            password: inputs.password,
        }
        try {
            await axios.post("http://localhost:8080/userApi/signup", user);
            setErrorMessage('');
            alert('Successfully Registered');
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setErrorMessage(Object.values(error.response.data.errors).join(' '));
            } else {
                setErrorMessage('Failed to connect to API');
            }
        };
    };

    return (
        <div className="container mt-5">
            <div className='row justify-content-center align-items-center'>
                <div className='col-sm-8 col-md-6 col-lg-4'>
            <div className="card mt-5">
                <h2 className="card-title">Register</h2>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <form className="card-body" onSubmit={handleSubmit}>
                    <div className="form-group">
                       
                        <input
                            value={inputs.email}
                            onChange={handleChange}
                            name='email'
                            type="text"
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
                    <div className="form-group">
                 
                        <input
                        value={inputs.passwordConf}
                        onChange={handleChange}
                        name='passwordConf'
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Confirm Password"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Signup</button>
                </form>
                <p className="login-register-link">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
            </div>
            </div>
        </div>
    )
};

export default Register;
