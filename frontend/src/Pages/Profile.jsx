import React from 'react'
import './Profile.css'
import { Button } from '@chakra-ui/react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function Profile() {

    const navigate = useNavigate()

    const logoutFunc = () => {
        Cookies.remove("isAuth");
        Cookies.remove("token");
        Cookies.remove("role");
        navigate('/login')
        window.location.reload()
    }

    return (
        <div className='profile_main'>
            <div className="profile_container_1">
                <h1>My Account</h1>
                <p>HELLO, Saikh</p>
                <button onClick={logoutFunc} className="LogoutBTN">Logout</button>
                <p>From your My Account you have the ability to view your recent account activity and update your account information.</p>
            </div>
            <div className='profileDetail'>
                <div className='profile_child1'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxvtEvzZIG6OHpSex-vEQwcDehMoV-ORTVSQm12XtHDFBNL-SBYqtgZhqhsJB7Mv_7y9s&usqp=CAU" alt="" />
                </div>
                <div className='profile_child2'>
                    <div>
                        <h1>Saikh Mirsat</h1>
                        <h2>saikh.mirsat.786@gmail.com</h2>
                        <Button>Edit</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
