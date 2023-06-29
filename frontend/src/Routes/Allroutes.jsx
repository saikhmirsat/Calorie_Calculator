import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Foods from '../Pages/Foods'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Register from '../Pages/Register'

export default function Allroutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/fooddiet' element={<Foods />}></Route>
        </Routes>
    )
}
