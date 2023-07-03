import React, { useState } from 'react'
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export default function Acitivity(props) {
    const [activity, setActivity] = useState([])

    props.sendActivityData(activity)


    const tokenFromCookies = Cookies.get('token')

    const getData = async () => {
        await fetch(`https://vast-red-vulture-sock.cyclic.app/activity`, {
            headers: {
                'Authorization': tokenFromCookies
            }
        }).then(res => res.json())
            .then(res => {
                // console.log(res)
                setActivity(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        getData()
    }, [])

    const DeleteFunc = async (ele) => {
        await fetch(`https://vast-red-vulture-sock.cyclic.app/activity/delete/${ele._id}`, {
            method: "DELETE",
            headers: {
                'Authorization': tokenFromCookies
            }
        }).then(res => res.json())
            .then(res => {
                console.log(res)
                getData()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const EditFunc = (ele) => {
        console.log(ele)
    }

    return (
        <div>
            <div className='showFoodOptionsContainer' >
                {
                    activity && activity.map((ele) =>
                        <div key={ele._id} >
                            <img src={ele.image} alt="" />
                            <p>Activity : {ele.activity}</p>
                            <p>Calories Burned : <b> {ele.calorieBurned}</b></p>
                            <div style={{ display: 'flex', boxShadow: 'unset', gap: '10px' }}>
                                <button onClick={() => EditFunc(ele)}>Edit</button>
                                <button onClick={() => DeleteFunc(ele)}>Delete</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
