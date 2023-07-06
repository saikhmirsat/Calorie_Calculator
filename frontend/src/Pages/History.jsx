import React, { useEffect } from 'react'
import { useState } from 'react'
import './History.css'
import Cookies from 'js-cookie'
import { Button } from '@chakra-ui/react'

export default function History() {

    const [date, setDate] = useState("")


    const [data, setData] = useState([])
    const [Activitydata, setActivityData] = useState([])
    const [fiterDataValue, setFilterdatavalue] = useState(false)
    const [FilterACdatavalue, setFilterACdatavalue] = useState(false)

    const [loading, setLoading] = useState(true)

    const user = JSON.parse(localStorage.getItem('userdetails'))
    const id = user._id
    console.log(id)

    const token = Cookies.get('token')


    const getData = async () => {
        setLoading(true)
        try {
            await fetch(`https://vast-red-vulture-sock.cyclic.app/history/${id}`, {
                headers: {
                    'Authorization': token
                }
            })
                .then((res) => res.json())
                .then((res) => {
                    setLoading(false)
                    setData(res)
                    console.log(res)
                })
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }

    const getActivityData = async () => {
        setLoading(true)
        try {
            await fetch(`https://vast-red-vulture-sock.cyclic.app/activityhistory/${id}`, {
                headers: {
                    'Authorization': token
                }
            })
                .then((res) => res.json())
                .then((res) => {
                    setLoading(false)
                    setActivityData(res)
                    console.log(res)
                })
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }

    const RemoveFunc = async (ele) => {
        setLoading(true)
        await fetch(`https://vast-red-vulture-sock.cyclic.app/history/delete/${ele._id}`, {
            method: "DELETE",
            headers: {
                'Authorization': token
            }
        }).then((res) => res.json())
            .then((res) => {
                if (res.msg == 'Data has deleted') {
                    setLoading(false)
                    getData()
                    console.log(res)
                    alert(res.msg)
                }

            })
            .catch((e) => {
                setLoading(false)
                console.log(e)
            })
    }

    const RemoveActiveFunc = async (ele) => {
        setLoading(true)
        await fetch(`https://vast-red-vulture-sock.cyclic.app/activityhistory/delete/${ele._id}`, {
            method: "DELETE",
            headers: {
                'Authorization': token
            }
        }).then((res) => res.json())
            .then((res) => {
                if (res.msg == 'Data has deleted') {
                    setLoading(false)
                    getActivityData()
                    console.log(res)
                    alert(res.msg)
                }
            })
            .catch((e) => {
                setLoading(false)
                console.log(e)
            })
    }

    useEffect(() => {
        getData()
        getActivityData()
    }, [])

    const FilterData = async (value) => {
        setLoading(true)
        setFilterdatavalue(false)
        setFilterACdatavalue(false)
        await fetch(`https://vast-red-vulture-sock.cyclic.app/history/${id}`, {
            headers: {
                'Authorization': token
            }
        })
            .then((res) => res.json())
            .then((res) => {
                setLoading(false)

                console.log(res)
                let filterDate = res.filter((ele) => ele.date == value)
                // console.log({ "filter": filterDate })
                if (filterDate == "") {
                    setFilterdatavalue(true)
                } else {
                    setData(filterDate)

                }
            })
            .catch((e) => {
                setLoading(false)
                console.log(e)
            })

        await fetch(`https://vast-red-vulture-sock.cyclic.app/activityhistory/${id}`, {
            headers: {
                'Authorization': token
            }
        })
            .then((res) => res.json())
            .then((res) => {
                setLoading(false)

                console.log(res)
                let filterAcDate = res.filter((ele) => ele.date == value)
                // console.log({ "filter": filterDate })
                if (filterAcDate == "") {
                    setFilterACdatavalue(true)
                } else {
                    setActivityData(filterAcDate)

                }
            })
            .catch((e) => {
                setLoading(false)
                console.log(e)
            })
    }

    return (
        <div className='History_container'>
            <div>
                <span>Filter by Date : </span><input type="date" onChange={(e) => FilterData(e.target.value)} /><br />
                <h1>Food Calories History</h1>
            </div>
            <div className='His_box'>
                <div className="heading_his_box_card">
                    <h1>Date</h1>
                    <h1>Plan</h1>
                    <h1>Total calories</h1>
                    <h1>Items</h1>
                    <h1>Remove</h1>
                </div>
                {
                    loading ? <img style={{ margin: 'auto' }} src="https://media.tenor.com/opUD_-Ao_hcAAAAC/loading-go-on.gif" alt="" /> :
                        data == "" ? <div className='history_emty_img_div'>
                            <img src="https://cdn.dribbble.com/users/1785628/screenshots/5605512/media/097297f8e21d501ba45d7ce437ed77bd.gif" alt="" />
                        </div> :
                            fiterDataValue ? <h2 className='data_not_found_history'>Data not fount in this date please try again</h2> : data && data.map((ele) => <div key={ele._id} className="his_box_card">
                                <h1>{ele.date}</h1>
                                <h1>{ele.plan}</h1>
                                <h1>{ele.totalCalories}</h1>
                                <div className='his_inner_box'>
                                    {
                                        ele.dailydata.map((item) => <div key={item._id} className='hisBox_inner_card'>
                                            <img src={item.image} alt="" />
                                            <p>{item.food}</p>
                                        </div>)
                                    }
                                </div>
                                <button className='HisRemoveBTN' onClick={() => RemoveFunc(ele)}>Remove</button>
                            </div>)
                }
            </div>

            <h1>Activity Calories Burned History</h1>
            <div className='His_box'>
                <div className="heading_his_box_card">
                    <h1>Date</h1>
                    <h1>Type</h1>
                    <h1>Total Burned calories</h1>
                    <h1>Activities</h1>
                    <h1>Remove</h1>
                </div>
                {
                    loading ? <img style={{ margin: 'auto' }} src="https://media.tenor.com/opUD_-Ao_hcAAAAC/loading-go-on.gif" alt="" /> :
                        Activitydata == "" ? <div className='history_emty_img_div'>
                            <img src="https://cdn.dribbble.com/users/1785628/screenshots/5605512/media/097297f8e21d501ba45d7ce437ed77bd.gif" alt="" />
                        </div> :
                            FilterACdatavalue ? <h1>Data not fount in this date please try again</h1> : Activitydata && Activitydata.map((ele) => <div key={ele._id} className="his_box_card">
                                <h1>{ele.date}</h1>
                                <h1>{ele.name}</h1>
                                <h1>{ele.totalCaloriesBurned}</h1>
                                <div className='his_inner_box'>
                                    {
                                        ele.dailydata.map((item) => <div key={item._id} className='hisBox_inner_card'>
                                            <img src={item.image} alt="" />
                                            <p>{item.food}</p>
                                        </div>)
                                    }
                                </div>
                                <button className='HisRemoveBTN' onClick={() => RemoveActiveFunc(ele)}>Remove</button>
                            </div>)
                }
            </div>
        </div>
    )
}
