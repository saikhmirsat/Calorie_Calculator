import React from 'react'
import './Profile.css'
import { Button, Spinner } from '@chakra-ui/react'
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


export default function Profile() {
    const [visible, setVisible] = useState(false)

    const [firstname, setFname] = useState("")
    const [lastname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [gender, setGender] = useState("")
    const [age, setAge] = useState("")
    const [height, setHeight] = useState("")
    const [weight, setWeight] = useState("")
    const [avatar, setAvatar] = useState("")

    const [loading, setLoading] = useState(false)

    let User = JSON.parse(localStorage.getItem('userdetails'))

    let token = Cookies.get('token')

    let role = Cookies.get('role')
    const navigate = useNavigate()

    const logoutFunc = () => {
        Cookies.remove("isAuth");
        Cookies.remove("token");
        Cookies.remove("role");
        localStorage.removeItem('userdetails')
        localStorage.removeItem('calories')
        localStorage.removeItem('todayCalories')
        localStorage.removeItem('logintoken')
        localStorage.removeItem('todayBurnedCalories')
        navigate('/login')
        window.location.reload()
    }

    const EditFunc = async () => {
        setLoading(true)

        const formData = new FormData();
        formData.append('file', avatar);
        formData.append('upload_preset', 'CaloriesCalculator');

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/drijzhqfp/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        const data = await response.json();
        console.log(data);
        console.log(data.secure_url)

        let obj = {
            firstname: firstname || User.firstname,
            lastname: lastname || User.lastname,
            email: email || User.email,
            gender: gender || User.gender,
            age: age || User.age,
            weight: weight || User.weight,
            height: height || User.height,
            avatar: data.secure_url || User.avatar
        }
        console.log(obj)

        try {

            await fetch(`https://vast-red-vulture-sock.cyclic.app/users/edit/${User._id}`, {
                method: "PATCH",
                body: JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json",
                    'Authorization': token
                }
            }).then((res) => res.json())
                .then((res) => {
                    if (res.success == true) {
                        setLoading(false)
                        setVisible(false)
                        console.log(res)
                        localStorage.setItem('userdetails', JSON.stringify(obj))
                    }
                })
        } catch (err) {
            setLoading(false)
            console.log(err)
        }

    }
    const SaveFunc = () => {
        setVisible(true)
    }
    const GoBackProfile = () => {
        setVisible(false)
    }

    return (
        <div className='profile_main'>
            <div className="profile_container_1">
                <h1>My Account</h1>
                <p>HELLO, {User.firstname}</p>
                {role === 'admin' ? <Link className='profile_admin_dash_btn' to='/admin'>Admin Dashboard</Link> : ""}
                <button onClick={logoutFunc} className="LogoutBTN">Logout</button>
                <p>From your My Account you have the ability to view your recent account activity and update your account information.</p>
            </div>
            <div className='profileDetail'>
                <div className='profile_child1'>
                    <img src={User.avatar} alt="" />
                </div>
                <div className='profile_child2'>
                    <div className={visible ? "invisible" : "profile_container"}>
                        <h1>Register Date : {User.registerdate}</h1>
                        <h1>Name : {User.firstname} {User.lastname}</h1>
                        <h1>Email : {User.email}</h1>
                        <h1>Age : {User.age}</h1>
                        <h1>Height : {User.height}</h1>
                        <h1>Weight : {User.weight}</h1>
                    </div>
                    <div className={!visible ? "invisible" : "Profile_edit_cont"}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input type="text" placeholder='Firstname' onChange={(e) => setFname(e.target.value)} />
                            <input type="text" placeholder='Lastname' onChange={(e) => setLname(e.target.value)} />
                        </div>
                        <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <select name="" id="" onChange={(e) => setGender(e.target.value)}>
                                <option value="">Choose Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <input type="text" placeholder='Age' onChange={(e) => setAge(e.target.value)} />
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input type="text" placeholder='Height' onChange={(e) => setHeight(e.target.value)} />
                            <input type="text" placeholder='Weight' onChange={(e) => setWeight(e.target.value)} />
                        </div>
                        <input type="file" placeholder='Avatar' onChange={(e) => setAvatar(e.target.files[0])} />
                    </div>
                    <Button onClick={visible ? EditFunc : SaveFunc}>{visible ? loading ? <Spinner /> : "Save" : "Edit"}</Button>
                    {visible ? <span style={{ marginLeft: '20px' }}><b style={{ color: 'blue', cursor: 'pointer' }} onClick={GoBackProfile}>Click</b> here to go back</span> : ""}
                </div>
            </div>
        </div >
    )
}
