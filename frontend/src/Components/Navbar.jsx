import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
import logo from '../Images/homeLogo.jpeg'

export default function Navbar() {
    return (
        <div className='navBar' >
            <div>
                <Link to='/'>
                    <img src={logo} alt="" />
                </Link>
            </div>
            <div>
                <Link to="/fooddiet">Diet</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </div>
    )
}
