import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Register from '../Pages/Register'

export default function Allroutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />}>Home</Route>
            <Route path='/register' element={<Register />}>Home</Route>
            <Route path='/login' element={<Login />}>Home</Route>
        </Routes>
    )
}
