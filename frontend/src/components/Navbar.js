import React from "react";
import HdIcon from '@mui/icons-material/Hd';
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeAdmin, removeUser } from "./Store/authSlice";
import axios from "axios";

function Navbar() {

    const user = useSelector((state) => state.user.user);
    const admin = useSelector((state) => state.admin.admin)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        if (user) {
            const confirm = window.confirm("Are you sure you want to logout?");
            if (confirm) {
                axios.post("http://localhost:8080/userApi/logout", {}, {
                    headers: { 'Authorization': "Bearer " + user.token }
                }).then(() => {
                    dispatch(removeUser());
                    navigate('/');
                }).catch(error => {
                    console.error('Logout failed:', error);
                });
            }
        }
        else if (admin) {
            const confirm = window.confirm("Are you sure you want to logout?");
            if (confirm) {
                axios.post("http://localhost:8080/adminApi/logout", {}, {
                    headers: { 'Authorization': "Bearer " + admin.token }
                }).then(() => {
                    dispatch(removeAdmin());
                    navigate('/');
                }).catch(error => {
                    console.error('Logout failed:', error);
                });
            }
            else {
                navigate('/movies');
            }
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container-fluid">
                <div className="navbar-brand"><HdIcon /></div>
                {/* <div className="d-flex align-items-center">
                    <input type="search" id="form1" className="form-control form-control-sm mx-auto" style={{ width: "200px" }} placeholder="Search here..." />
                </div> */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {!admin && (
                            <>
                            <li className="nav-item">
                            <NavLink to={"/"} className="nav-link" activeclassname="active">
                                Home
                            </NavLink>
                        </li>
                            </>
                        )}
                        
                        <li className="nav-item">
                            <NavLink to={"/movies"} className="nav-link" activeclassname="active">
                                Movies
                            </NavLink>
                        </li>
                        {!admin && !user && (
                            <>
                            <li className="nav-item">
                            <NavLink to={"/login"} className="nav-link" activeclassname="active">
                                Login
                            </NavLink>
                        </li>
                        </>
                        )}

                        {user && (
                            <>
                            <li className="nav-item">
                            <NavLink to={"/mybookings/:id"} className="nav-link" activeclassname="active">
                                Bookings
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/"} className="nav-link" onClick= {logout}>
                                Logout
                            </NavLink>
                        </li>
                            </>
                        )}

                        {admin && (
                            <>
                            <li className="nav-item">
                            <NavLink to={"/add"} className="nav-link" activeclassname="active">
                                Add Movie
                            </NavLink>
                        </li>
                            <li className="nav-item">
                            <NavLink to={"/"} className="nav-link" onClick={logout}>
                                Logout
                            </NavLink>
                        </li>
                            </>
                        )}

                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
