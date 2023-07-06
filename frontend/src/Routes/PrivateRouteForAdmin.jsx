import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

export default function PrivateRouteForAdmin({ children }) {
    const role = Cookies.get('role')
    console.log(role)

    if (role !== 'admin') {
        alert('Your not authorised to access Admin pannel!')
        return <Navigate to='/' />
    }

    return children

}
