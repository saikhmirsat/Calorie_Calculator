import React from 'react'
import "./Home.css"

import eatHealthy from '../Images/eathealthy.jpg'
import gym from '../Images/gym.webp'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'





export default function Home() {
    const isAuth = Cookies.get('isAuth')

    const TodayCal = localStorage.getItem('todayCalories') || 0
    const TodayBurnedCal = localStorage.getItem('todayBurnedCalories') || 0

    const user = JSON.parse(localStorage.getItem('userdetails')) || 0
    const id = user._id
    // console.log(id)

    const calorie = localStorage.getItem('calories')


    let MyCal = TodayCal - TodayBurnedCal
    let needCal = calorie - MyCal

    const navigate = useNavigate()
    const gotoFood = () => {
        navigate('/fooddiet')
    }
    const gotoACtivity = () => {
        navigate('/activity')
    }


    return (
        <div>
            <div className={isAuth?'home_calory_detail_container':"hide_home_first_con"}>
                <div className='home_calorie_child1'>
                    <h1>Hello {user.firstname}</h1>
                    <p>Calories are important because they provide the energy needed for various bodily functions and physical activities. By understanding and calculating your calorie intake, you can make informed decisions about your diet and ensure you're meeting your energy needs.</p>
                    <div className='circle_in_home'></div>
                </div>
                <div className='home_calorie_child2'>
                    <img src="https://cdn.firstcry.com/education/2022/11/29121141/Yellow-Fruit-Names-For-Kids.jpg" alt="" />
                    <div className='calory_calculator_div'>
                        <h1><b style={{ color: 'black' }}>{calorie} </b> &nbsp; number of calories you need daily.</h1>

                        <h1>Your today consumed calories number : {TodayCal}</h1>
                        <h1>Your today Burned calories number : {TodayBurnedCal}</h1>
                        {TodayCal == 0 && TodayBurnedCal == 0 ? "" : MyCal >= 3000 ? <h1 style={{ color: 'green' }}> Congratulations <b>{user.firstname}</b> today you have completed daily calories requirement.</h1> : <h1>To fullfill your daily calories requirement you have to consume rest <b>{needCal}+</b> calories.  </h1>}
                    </div>
                </div>
            </div>

            <div className='introContainer' >
                <div >
                    <div>
                        <h2>Feed Your Body, <br /> Fuel Your Journey.</h2>
                        <p>Eating healthy improves your physical and mental well-being, giving you more energy and reducing the risk of diseases.</p>
                        <button onClick={gotoFood}>choose food</button>
                    </div>
                    <div>
                        <img src={eatHealthy} alt="" />
                    </div>
                </div>
                <div>
                    <div>
                        <img src={gym} alt="" />
                    </div>
                    <div>
                        <h2>Be Active,<br /> Be Alive</h2>
                        <p>Exercise boosts your mood, strengthens your muscles and bones, improves heart health, and helps maintain a healthy weight.</p>
                        <button onClick={gotoACtivity}>Choose calorie to burn</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
