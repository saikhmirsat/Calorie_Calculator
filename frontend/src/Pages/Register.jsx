import { Spinner } from '@chakra-ui/react'
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

    const [loading, setLoading] = useState(false)


    const Navigate = useNavigate()

    const Register = async () => {


        const obj = {
            role: 'user',
            registerdate: new Date().toISOString().split('T')[0],
            avatar: "https://i.pinimg.com/474x/76/4d/59/764d59d32f61f0f91dec8c442ab052c5.jpg",
            firstname, lastname, email, password, gender, height, weight, age
        }

        if (firstname == "" && lastname == "" && email == "" && password == "" && gender == "" && age == "" && height == "" && weight == "") {
            alert("Please fill all the details")
        } else if (firstname == "" || lastname == "" || email == "" || password == "" || gender == "" || age == "" || height == "" || weight == "") {
            alert("Please check again!")
        } else {

            try {
                setLoading(true)
                await fetch(`https://vast-red-vulture-sock.cyclic.app/users/register`, {
                    method: "POST",
                    body: JSON.stringify(obj),
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((res) => res.json())
                    .then((res) => {
                        console.log(res)
                        if (res.success === true) {
                            alert('Your register successfully')
                            setLoading(false)
                            Navigate('/login')
                        } else {
                            alert('Something wrong')
                        }
                    })
            } catch (err) {
                console.log(err)
                alert(err)
                setLoading(false)
            }
        }




    }
    return (
        <div className='register_main_con'>
            <div className='Register_con'>
                <input type="text" placeholder='First Name' onChange={(e) => setFname(e.target.value)} />
                <input type="text" placeholder='Last Name' onChange={(e) => setLname(e.target.value)} />
                <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                <div>
                    <select name="" id="" onChange={(e) => setGender(e.target.value)}>
                        <option value="">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <input type="number" placeholder='Age' onChange={(e) => setAge(e.target.value)} />
                </div>
                <div>
                    <input type="number" placeholder='Height - cm' onChange={(e) => setHeight(e.target.value)} />
                    <input type="number" placeholder='Weight - Kg' onChange={(e) => setWeight(e.target.value)} />
                </div>
                <button onClick={Register}>{loading ? <Spinner /> : "Register"}</button>
            </div>
        </div>
    )
}
