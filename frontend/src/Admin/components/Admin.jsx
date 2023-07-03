import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'


export default function Admin(data) {
    const [adminData, setAdminData] = useState([])

    const getData = async () => {
        await fetch(`https://vast-red-vulture-sock.cyclic.app/users`)
            .then((res) => res.json())
            .then((res) => {
                let filterAdmin = res.filter((ele) => ele.role === 'admin')
                setAdminData(filterAdmin)
            })
            .catch((e) => console.log(e))
    }

    useEffect(() => {
        getData()
    }, [])

    const EditFunc = () => {

    }

    const DeleteFunc = async (id) => {
        await fetch(`https://vast-red-vulture-sock.cyclic.app/users/delete/${id}`, {
            method: "DELETE"
        })
            .then((res) => res.json())
            .then((res) => {
                getData()
                // console.log(res)
            })
            .catch((e) => console.log(e))
    }

    return (
        <div>
            <div className='user_board_con'>
                {
                    adminData && adminData.map((ele) => <div className='userCard_div' key={ele._id}>
                        <img src={ele.avatar} alt="" />
                        <h1>{ele.firstname} {ele.lastname}</h1>
                        <h1>Role: {ele.role}</h1>
                        <div className='card_btn_div'>
                            <button onClick={EditFunc}>Edit</button>
                            <button onClick={() => DeleteFunc(ele._id)}>Delete</button>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}
