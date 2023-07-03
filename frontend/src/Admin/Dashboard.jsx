import React from 'react'
import { useState } from 'react'
import User from './components/User'
import './Dashboard.css'
import { TbUsers } from 'react-icons/tb';
import { RiAdminLine } from 'react-icons/ri';
import { MdOutlineFastfood } from 'react-icons/md';
import { MdOutlineSportsMartialArts } from 'react-icons/md';
import { MdOutlineSpeakerNotes } from 'react-icons/md';
import { FaHistory } from 'react-icons/fa';
import { useEffect } from 'react';
import Foods from './components/Foods';
import Acitivity from './components/Acitivity';
import Cookies from 'js-cookie';
import Admin from './components/Admin';
import FoodAndActivity from './components/FoodAndActivity';


export default function Dashboard() {

    const [userpage, setUserpage] = useState(false)
    const [adminpage, setAdminpage] = useState(false)
    const [foodpage, setFoodpage] = useState(false)
    const [activitypage, setActivitypage] = useState(false)
    const [AddFood_activitypage, setFood_Activitypage] = useState(false)


    const [usersData, setUsersData] = useState("")
    const [adminData, setAdminData] = useState("")
    const [foodData, setFoodData] = useState("")
    const [activityData, setActivityData] = useState("")
    const [HistoryData, setHistoryData] = useState("")
    const [NotesData, setNotesData] = useState("")

    const [defaultDash, setDefaultDash] = useState(true)

    const data = JSON.parse(localStorage.getItem('userdetails'))
    const tokenFromCookies = Cookies.get('token')

    const userFunc = () => {
        setUserpage(true)
        setFoodpage(false)
        setActivitypage(false)
        setDefaultDash(false)
        setAdminpage(false)
        setFood_Activitypage(false)
    }
    const foodFunc = () => {
        setUserpage(false)
        setFoodpage(true)
        setActivitypage(false)
        setDefaultDash(false)
        setAdminpage(false)
        setFood_Activitypage(false)
    }
    const activityFunc = () => {
        setUserpage(false)
        setFoodpage(false)
        setActivitypage(true)
        setDefaultDash(false)
        setAdminpage(false)
        setFood_Activitypage(false)
    }

    const adminFunc = () => {
        setAdminpage(true)
        setUserpage(false)
        setFoodpage(false)
        setActivitypage(false)
        setDefaultDash(false)
        setFood_Activitypage(false)
    }
    const AddFoodAndActivityFunc = () => {
        setFood_Activitypage(true)
        setAdminpage(false)
        setUserpage(false)
        setFoodpage(false)
        setActivitypage(false)
        setDefaultDash(false)
    }

    const getData = async (data) => {
        setUsersData(data.length)
        const filterDataAdmin = data.filter((ele) => ele.role == 'admin')
        setAdminData(filterDataAdmin.length)


    }
    const getFoodData = (food) => {
        setFoodData(food)
    }

    const getActivityData = (activity) => {
        setActivityData(activity)
    }

    const getNotes = async () => {
        await fetch(`https://vast-red-vulture-sock.cyclic.app/datas`, {
            headers: {
                'Authorization': tokenFromCookies
            }
        }).then(res => res.json())
            .then(res => {
                // console.log({ "notes": res })
                setNotesData(res)
            })
            .catch(err => {

                console.log(err)
            })
    }
    const getHistory = async () => {
        await fetch(`https://vast-red-vulture-sock.cyclic.app/history`, {
            headers: {
                'Authorization': tokenFromCookies
            }
        }).then(res => res.json())
            .then(res => {
                // console.log({ "his": res })
                setHistoryData(res)
            })
            .catch(err => {

                console.log(err)
            })
    }
    useEffect(() => {
        getNotes()
        getHistory()
    }, [])


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
                    <button onClick={adminFunc}>Admin</button>
                    <button onClick={foodFunc}>Foods</button>
                    <button onClick={activityFunc}>Activity</button>
                    <button onClick={AddFoodAndActivityFunc}>Add Food & Activity</button>
                </div>

            </div>

            <div className='admin_main_child2'>
                <div className={userpage ? 'userpage' : "invisible"}>
                    <User sendDataToParent={getData} />
                </div>
                <div className={adminpage ? 'adminpage' : "invisible"}>
                    <Admin />
                </div>
                <div className={foodpage ? 'foodpage' : "invisible"}>
                    <Foods sendFoodData={getFoodData} />
                </div>
                <div className={activitypage ? 'activitypage' : "invisible"}>
                    <Acitivity sendActivityData={getActivityData} />
                </div>
                <div className={AddFood_activitypage ? 'Food_Activity_add_box' : "invisible"}>
                    <FoodAndActivity />
                </div>


                <div className={defaultDash ? "adminPannel_default_screen" : "invisible"}>
                    <div>
                        <div><TbUsers size="80px" color='#1F427F' /></div>
                        <h1>User : <b>{usersData}</b></h1>
                    </div>
                    <div>
                        <div><RiAdminLine size="80px" color='#1F427F' /></div>
                        <h1>Admin : <b>{adminData}</b></h1>
                    </div>
                    <div>
                        <div><MdOutlineFastfood size="80px" color='#1F427F' /></div>
                        <h1>Foods : <b>{foodData.length}</b></h1>
                    </div>
                    <div>
                        <div> <MdOutlineSportsMartialArts size="80px" color='#1F427F' /></div>
                        <h1>Activities : <b>{activityData.length}</b></h1>
                    </div>
                    <div>
                        <div><MdOutlineSpeakerNotes size="80px" color='#1F427F' /></div>
                        <h1>Notes : <b>{NotesData.length}</b></h1>
                    </div>
                    <div>
                        <div><FaHistory size="80px" color='#1F427F' /></div>
                        <h1>History : <b>{HistoryData.length}</b></h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
