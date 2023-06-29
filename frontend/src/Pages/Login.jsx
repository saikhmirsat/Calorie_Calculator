import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")

    const Navigate = useNavigate()

    const Login = async () => {
        const obj = {
            email, password
        }
        await fetch(`http://localhost:8080/users/login`, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-type": "application/json"
            }
        }).then((res) => res.json())
            .then((res) => {
                console.log(res)
                if (res.success === true) {
                    localStorage.setItem('userdetails', JSON.stringify(res.user[0]))
                    localStorage.setItem('logintoken', res.token)
                    Navigate('/')
                    window.location.reload()
                } else {
                    alert('something wrong')
                }
            })
    }

    return (
        <div>
            <input type="text" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder='password' onChange={(e) => setpassword(e.target.value)} />
            <button onClick={Login}>Login</button>
        </div>
    )
}
