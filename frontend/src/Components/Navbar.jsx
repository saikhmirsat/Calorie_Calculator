import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
import logo from '../Images/logo.png'

export default function Navbar() {
    return (
        <div className='navbar_main'>
            <Link to='/' className='logo_and_title'>
                <img src={logo} alt="" />
                <h2>Calorie Calculator</h2>
            </Link>
            <div className='register_login'>
                <Link to='/register'>Register</Link>
                <Link to='/login'>Login</Link>
            </div>

        </div>
    )
}
