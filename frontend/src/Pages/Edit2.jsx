import { Spinner } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './Edit.css'


export default function Edit2() {
    const [Total_calories_intake, setTotal_calories_intake] = useState("")
    const [Total_calories_burned, setTotal_calories_burned] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    console.log({ "myId": id })

    const token = localStorage.getItem('logintoken')

    const saveFunc = async () => {
        const EditData = JSON.parse(localStorage.getItem('editData'))
        console.log({ "data": EditData })
        let obj = {
            Total_calories_intake: Total_calories_intake || EditData.Total_calories_intake,
            Total_calories_burned: Total_calories_burned || EditData.Total_calories_burned
        }

        try {
            setLoading(true)
            await fetch(`https://vast-red-vulture-sock.cyclic.app/datas/edit/${id}`, {
                method: "PATCH",
                body: JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json",
                    'Authorization': token
                }
            }).then((res) => res.json())
                .then((res) => {
                    console.log(res)
                    if (res.msg === "data has been update") {
                        setLoading(false)
                        localStorage.removeItem('editData')
                        navigate('/notes')
                        alert(res.msg)
                    }

                })
        } catch (err) {
            setLoading(false)
            console.log(err)
        }

    }

    return (
        <div>
            <div>
                <input type="number" placeholder='Total calories intake on that date' onChange={(e) => setTotal_calories_intake(e.target.value)} />
                <input type="number" placeholder='Total calories burned on that date' onChange={(e) => setTotal_calories_burned(e.target.value)} />
                <button onClick={saveFunc}>{loading ? <Spinner /> : ""}</button>
            </div>
            <span>Click here </span><Link to='/notes' style={{ color: 'blue' }}>go Back</Link>
        </div>
    )
}
