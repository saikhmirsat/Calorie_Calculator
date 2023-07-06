import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../Admin/Dashboard'
import Activity from '../Pages/Activity'
import Edit2 from '../Pages/Edit2'
import EditIntake from '../Pages/EditIntake'
import Foods from '../Pages/Foods'
import History from '../Pages/History'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Notes from '../Pages/Notes'
import Profile from '../Pages/Profile'
import Register from '../Pages/Register'
import PrivateRouteForAdmin from './PrivateRouteForAdmin'
import PrivateRouteForAuth from './PrivateRouteForAuth'

export default function Allroutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/fooddiet' element={
                <PrivateRouteForAuth><Foods /></PrivateRouteForAuth>
            }></Route>
            <Route path='/profile' element={
                <PrivateRouteForAuth><Profile /></PrivateRouteForAuth>
            }></Route>
            <Route path='/history' element={
                <PrivateRouteForAuth><History /></PrivateRouteForAuth>
            }></Route>
            <Route path='/admin' element={
                <PrivateRouteForAdmin><Dashboard /></PrivateRouteForAdmin>
            }></Route>
            <Route path='/notes' element={
                <PrivateRouteForAuth><Notes /></PrivateRouteForAuth>
            }></Route>
            <Route path='/activity' element={
                <PrivateRouteForAuth><Activity /></PrivateRouteForAuth>
            }></Route>
            <Route path='/notes/:id' element={
                <PrivateRouteForAuth><EditIntake /></PrivateRouteForAuth>
            }></Route>
            <Route path='/notes/:id' element={
                <PrivateRouteForAuth><Edit2 /></PrivateRouteForAuth>
            }></Route>
        </Routes>
    )
}
