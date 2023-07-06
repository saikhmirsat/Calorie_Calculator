import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
import logo from '../Images/homeLogo.jpeg'
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { ImportantContext } from '../Context/ImportantContext';

export default function Navbar() {

    const { isAuth } = useContext(ImportantContext)
    const role = Cookies.get('role')

    return (
        <div className='navBar' >
            <div>
                <Link to='/'>
                    <img src={logo} alt="" />
                </Link>
            </div>
            <div>



                {
                    role == 'admin' ? "" : isAuth ? <Link to="/fooddiet">Food Calories</Link> : ""
                }
                {
                    role == 'admin' ? "" : isAuth ? <Link to='/activity'>Activity</Link> : ""
                }
                {
                    role == 'admin' ? "" : isAuth ? <Link to="/notes">Notes</Link> : ""
                }
                {
                    role == 'admin' ? "" : isAuth ? <Link to="/history">History</Link> : ""
                }
                {
                    isAuth ?
                        <Link to="/profile">Account</Link> : <Link to="/login">Login</Link>
                }

                {!isAuth ? <Link to="/register">Register</Link> : ""}
            </div>
        </div>
    )
}
