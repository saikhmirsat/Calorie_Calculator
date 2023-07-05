import { chakra } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './Edit.css'
import { Spinner } from '@chakra-ui/react'

export default function EditIntake() {

    const [loading, setLoading] = useState(false)

    const [Target_calories_intake_value, setTarget_calories_intake_value] = useState("")
    const [Target_calories_burned, setTarget_calories_burned] = useState("")


    const navigate = useNavigate()
    const { id } = useParams()
    console.log({ "myId": id })

    const token = localStorage.getItem('logintoken')

    const saveFunc = async () => {
        const EditData = JSON.parse(localStorage.getItem('editData'))
        console.log({ "data": EditData })
        let obj = {
            Target_calories_intake_value: Target_calories_intake_value || EditData.Target_calories_intake_value,
            Target_calories_burned: Target_calories_burned || EditData.Target_calories_burned
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
        <div className='main_container_input_box_edit'>
            <div>
                <input type="number" placeholder='Target calories intake value' onChange={(e) => setTarget_calories_intake_value(e.target.value)} />
                <input type="number" placeholder='Target calories burned value' onChange={(e) => setTarget_calories_burned(e.target.value)} />
                <button onClick={saveFunc}>{loading ? <Spinner /> : "Save"}</button>
            </div>
            <span>Click here </span><Link to='/notes' style={{ color: 'blue' }}>go Back</Link>
        </div>
    )
}
