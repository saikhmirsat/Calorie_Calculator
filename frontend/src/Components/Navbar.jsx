import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
import logo from '../Images/homeLogo.jpeg'
import Cookies from 'js-cookie';

export default function Navbar() {
    const tokenFromCookies = Cookies.get('token')
    const roleFromCookies = Cookies.get('role')
    const isAuthFromCookies = Cookies.get('isAuth')

    return (
        <div className='navBar' >
            <div>
                <Link to='/'>
                    <img src={logo} alt="" />
                </Link>
            </div>
            <div>
                <Link to="/fooddiet">Diet</Link>
                {
                    isAuthFromCookies ?
                        <Link to="/profile">Account</Link> : <Link to="/login">Login</Link>
                }

                {!isAuthFromCookies ? <Link to="/register">Register</Link> : ""}
            </div>
        </div>
    )
}
