import React from 'react';
import Login from './Login';

const UserLogin = () => {
    const userApi = "http://localhost:8080/userApi/login";

    return (
        <Login api={userApi} userType="user" />
    );
};

export default UserLogin;
