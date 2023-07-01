import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'


import Cookies from 'js-cookie';

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
                    let token = res.token
                    const expirationTime = new Date(new Date().getTime() + 3600 * 6000); // expires in 1 hour
                    Cookies.set('token', token, { expires: expirationTime });
                    Cookies.set('isAuth', true, { expires: expirationTime });
                    Cookies.set('role', res.user[0].role, { expires: expirationTime });

                    let user = JSON.parse(localStorage.getItem('userdetails'))
                    let young = ""
                    let mature = ""
                    let old = ""
                    if (user.gender === 'male') {
                        if (user.age > 19 && user.age <= 30) {
                            young = 3000
                            localStorage.setItem('calories', young)
                        } else if (user.age > 31 && user.age <= 60) {
                            mature = 2800
                            localStorage.setItem('calories', mature)
                        } else if (user.age > 60) {
                            old = 2600
                            localStorage.setItem('calories', old)
                        }
                    } else {
                        if (user.age > 19 && user.age <= 30) {
                            young = 2400
                            localStorage.setItem('calories', young)
                        } else if (user.age > 31 && user.age <= 60) {
                            mature = 2200
                            localStorage.setItem('calories', mature)
                        } else if (user.age > 60) {
                            old = 2000
                            localStorage.setItem('calories', old)
                        }
                    }

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
