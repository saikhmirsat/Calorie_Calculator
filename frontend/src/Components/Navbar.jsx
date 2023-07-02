import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
import logo from '../Images/homeLogo.jpeg'
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { ImportantContext } from '../Context/ImportantContext';

export default function Navbar() {

    const { isAuth } = useContext(ImportantContext)


    return (
        <div className='navBar' >
            <div>
                <Link to='/'>
                    <img src={logo} alt="" />
                </Link>
            </div>
            <div>
                {
                    isAuth ? <Link to="/notes">Notes</Link> : ""
                }
                {
                    isAuth ? <Link to="/fooddiet">Food Calories</Link> : ""
                }
                {
                    isAuth ? <Link to="/history">History</Link> : ""
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
