import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.css'

export default function Register() {

    const [firstname, setFname] = useState("")
    const [lastname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [gender, setGender] = useState("")
    const [age, setAge] = useState("")
    const [height, setHeight] = useState("")
    const [weight, setWeight] = useState("")


    const Navigate = useNavigate()

    const Register = async () => {


        const obj = {
            role: 'user',
            registerdate: new Date().toISOString().split('T')[0],
            avatar: "https://i.pinimg.com/474x/76/4d/59/764d59d32f61f0f91dec8c442ab052c5.jpg",
            firstname, lastname, email, password, gender, height, weight, age
        }

        try {
            await fetch(`http://localhost:8080/users/register`, {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json"
                }
            }).then((res) => res.json())
                .then((res) => {
                    console.log(res)
                    if (res.success === true) {
                        Navigate('/login')
                    }
                })
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <div className='Register_con'>
            <input type="text" placeholder='First Name' onChange={(e) => setFname(e.target.value)} />
            <input type="text" placeholder='Last Name' onChange={(e) => setLname(e.target.value)} />
            <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <select name="" id="" onChange={(e) => setGender(e.target.value)}>
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <input type="text" placeholder='Age' onChange={(e) => setAge(e.target.value)} />
            <input type="text" placeholder='Height - cm' onChange={(e) => setHeight(e.target.value)} />
            <input type="text" placeholder='Weight - Kg' onChange={(e) => setWeight(e.target.value)} />
            <button onClick={Register}>Register</button>
        </div>
    )
}
