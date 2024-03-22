import React from 'react';
import Login from './Login';

const AdminLogin = () => {
    const adminApi = "http://localhost:8080/adminApi/login";

    return (
        <Login api={adminApi} showRegister={false} userType="admin" />
    );

};

export default AdminLogin;
