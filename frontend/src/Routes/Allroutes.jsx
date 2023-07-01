import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../Admin/Dashboard'
import Foods from '../Pages/Foods'
import History from '../Pages/History'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Profile from '../Pages/Profile'
import Register from '../Pages/Register'

export default function Allroutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/fooddiet' element={<Foods />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/history' element={<History />}></Route>
            <Route path='/admin' element={<Dashboard />}></Route>
        </Routes>
    )
}
