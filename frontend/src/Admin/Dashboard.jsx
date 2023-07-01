import React from 'react'
import { useState } from 'react'
import User from './components/User'
import './Dashboard.css'

export default function Dashboard() {

    const [userpage, setUserpage] = useState(false)
    const [foodpage, setFoodpage] = useState(false)
    const [activitypage, setActivitypage] = useState(false)

    const data = JSON.parse(localStorage.getItem('userdetails'))
    console.log(data)

    const userFunc = () => {
        setUserpage(true)
        setFoodpage(false)
        setActivitypage(false)
    }
    const foodFunc = () => {
        setUserpage(false)
        setFoodpage(true)
        setActivitypage(false)
    }
    const activityFunc = () => {
        setUserpage(false)
        setFoodpage(false)
        setActivitypage(true)
    }

    return (
        <div className='admin_dash_main'>
            <div className='admin_main_child1'>
                <div className='admin-profile'>
                    <img src={data.avatar} alt="" />
                    <h1>Role : {data.role}</h1>
                    <h1>{data.firstname} {data.lastname}</h1>
                    <h1>{data.email}</h1>

                </div>
                <div className='admin_section_div'>
                    <button onClick={userFunc}>Users</button>
                    <button onClick={foodFunc}>Foods</button>
                    <button onClick={activityFunc}>Activity</button>
                </div>

            </div>
            <div className='admin_main_child2'>
                <div className={userpage ? 'userpage' : "invisible"}>
                    <User />
                </div>
                <div className={foodpage ? 'foodpage' : "invisible"}>
                    food
                </div>
                <div className={activitypage ? 'activitypage' : "invisible"}>
                    Activity
                </div>
            </div>
        </div>
    )
}
