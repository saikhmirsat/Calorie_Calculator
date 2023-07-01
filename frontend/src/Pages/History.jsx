import React, { useEffect } from 'react'
import { useState } from 'react'
import './History.css'
import Cookies from 'js-cookie'
import { Button } from '@chakra-ui/react'

export default function History() {

    const [date, setDate] = useState("")
    console.log(date)

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const user = JSON.parse(localStorage.getItem('userdetails'))
    const id = user._id
    console.log(id)

    const token = Cookies.get('token')



    const getData = async () => {
        try {
            await fetch(`http://localhost:8080/history/${id}`, {
                headers: {
                    'Authorization': token
                }
            })
                .then((res) => res.json())
                .then((res) => {
                    setData(res)
                    console.log(res)
                })
        } catch (err) {
            console.log(err)
        }
    }

    const RemoveFunc = async (ele) => {
        await fetch(`http://localhost:8080/history/delete/${ele._id}`, {
            method: "DELETE",
            headers: {
                'Authorization': token
            }
        }).then((res) => res.json())
            .then((res) => {
                getData()
                console.log(res)
            })
            .catch((e) => console.log(e))
    }

    useEffect(() => {
        getData()
    }, [])

    const FilterData = (date) => {
        const filterArr = data.filter((ele) => date == ele.date)
        setData(filterArr)
    }

    return (
        <div className='History_container'>
            <span>Filter by Date : </span><input type="date" onChange={(e) => FilterData(e.target.value)} /><br />
            <div className='His_box'>
                <div className="heading_his_box_card">
                    <h1>Date</h1>
                    <h1>Plan</h1>
                    <h1>Total calories</h1>
                    <h1>Items</h1>
                    <h1>Remove</h1>
                </div>
                {
                    data == "" ? <div className='history_emty_img_div'>
                        <img src="https://cdn.dribbble.com/users/1785628/screenshots/5605512/media/097297f8e21d501ba45d7ce437ed77bd.gif" alt="" />
                    </div> :
                        data && data.map((ele) => <div key={ele._id} className="his_box_card">
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
        </div>
    )
}
