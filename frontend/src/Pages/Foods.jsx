import React, { useState } from 'react'
import './Food.css'
import { Button } from '@chakra-ui/react'
import { useEffect } from 'react'
import Cookies from 'js-cookie';

export default function Food() {
    const [saveShown, setSaveshow] = useState(false)

    const planFromLs = localStorage.getItem('plan') || ''
    const [Timefiltervalue, setTimeFiltervalue] = useState("")

    const [plan, setPlan] = useState(planFromLs)
    const [food, setFood] = useState([])
    const [loading, setLoading] = useState(false)

    const totalFronLs = +localStorage.getItem('total_calories') || 0

    const [totalCalories, setTotalCalories] = useState(totalFronLs)

    const todayData = JSON.parse(localStorage.getItem('todayData')) || []

    const [arrCal, setArrcal] = useState([])

    const [selectFood, setSelectFood] = useState(todayData)

    const todayLocalStorageData = JSON.parse(localStorage.getItem('todayData')) || []
    console.log(todayLocalStorageData)

    let calorie = localStorage.getItem('total_calories') || 0

    const tokenFromCookies = Cookies.get('token')



    const getData = async () => {


        setLoading(true)
        await fetch(`https://vast-red-vulture-sock.cyclic.app/foods`, {
            headers: {
                'Authorization': tokenFromCookies
            }
        }).then(res => res.json())
            .then(res => {
                setLoading(false)
                // console.log(res)
                setFood(res)

            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }
    useEffect(() => {
        getData()
    }, [])

    const AddFood = (ele) => {
        if (plan == "") {
            alert('Plaese selecet a plan first')
        } else {
            setSaveshow(true)
            todayLocalStorageData.push(ele)
            localStorage.setItem('todayData', JSON.stringify(todayLocalStorageData))
            localStorage.setItem('plan', plan)

            setSelectFood([...selectFood, ele])

            let total = 0
            for (var i = 0; i < todayLocalStorageData.length; i++) {
                if (isNaN(todayLocalStorageData[i].Calories)) {
                    continue;
                }
                total += Number(todayLocalStorageData[i].Calories);
            }

            setTotalCalories(total)
            localStorage.setItem('total_calories', total)

        }
    }

    const RemoveFood = (ele, ind) => {
        setSelectFood(selectFood => selectFood.filter(item => item._id !== ele._id))

        todayLocalStorageData.splice(ind, 1)
        localStorage.setItem('todayData', JSON.stringify(todayLocalStorageData))

        let total = 0
        for (var i = 0; i < todayLocalStorageData.length; i++) {
            if (isNaN(todayLocalStorageData[i].Calories)) {
                continue;
            }
            total += Number(todayLocalStorageData[i].Calories);
        }

        setTotalCalories(total)
        localStorage.setItem('total_calories', total)


    }


    const SaveFunction = async () => {
        let obj = {
            "date": new Date().toISOString().split('T')[0],
            "plan": plan,
            "totalCalories": calorie,
            "dailydata": todayLocalStorageData,
        }
        await fetch('http://localhost:8080/history/add', {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-type": "application/json",
                "Authorization": tokenFromCookies
            }
        }).then((res) => res.json())
            .then((res) => {
                if (res.msg === "Data has been added") {
                    setSelectFood([])
                    window.localStorage.removeItem("todayData")
                    localStorage.setItem('todayCalories', calorie)
                    setTotalCalories(0)
                    window.localStorage.removeItem("total_calories")
                    window.localStorage.removeItem('plan')

                    setPlan("")
                    alert('Your data save in history')
                }
                console.log(res)
            })
            .catch((err) => console.log(err))
    }



    return (
        <div>
            <div>
                <div className='filterContainer' >
                    <select onChange={(e) => setPlan(e.target.value)}>
                        <option value="">Plan For</option>
                        <option value="weight-gain">Weight Gain</option>
                        <option value="weight-loos">Weaight Loos</option>
                    </select>

                </div>
                <select name="" id="" onChange={() => setTimeFiltervalue(e.target.value)}>
                    <option value="">Filter</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                </select>
                <div className='FoodContainer' >
                    <div>
                        {loading ? <img className='loading_gif_foodshown_con' width='300px' src="https://kostt.com/assets/img/preloader.gif" alt="" /> :

                            <div className='showFoodOptionsContainer' >
                                {
                                    food && food.map((ele) =>
                                        <div key={ele._id} >
                                            <img src={ele.image} alt="" />
                                            <p>Food : {ele.food}</p>
                                            <p>Calories : <b> {ele.Calories}</b></p>
                                            <button onClick={() => {
                                                AddFood(ele)

                                            }} >Add</button>
                                        </div>
                                    )
                                }
                            </div>
                        }

                    </div>
                    <div  >
                        <div className='bitInfo' >
                            <h1>{plan === 'weight-gain' ? 'Weight Gain' : plan === 'weight-loos' ? 'Weight Loos' : 'Please select a plan'}</h1>
                        </div>
                        <div className='showWantToremove' >
                            {
                                selectFood && selectFood.map((ele, index) =>
                                    <div key={ele._id} >
                                        <img src={ele.image} alt="" />
                                        <p>Food : {ele.food}</p>
                                        <p>Calories : <b> {ele.Calories}</b></p>
                                        <button onClick={() => RemoveFood(ele, index)} >Remove</button>
                                    </div>
                                )
                            }
                        </div>

                        {totalCalories == 0 ? "" : <h1 className="total_calories_amount" >Total Calories : <b>{totalCalories}</b></h1>}
                        {totalCalories == 0 ? <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>Add food to calculate calories</h1> : <button onClick={SaveFunction}>Save</button>}

                    </div>
                </div>
            </div>
        </div>
    )
}