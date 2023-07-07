import React from 'react'
import './Food.css'
import './Activity.css'
import { useEffect } from 'react'
import Cookies from 'js-cookie';
import { useState } from 'react';
import { Spinner } from '@chakra-ui/react';

export default function Activity() {

    const [food, setFood] = useState([])

    const [loading, setLoading] = useState(false)
    const [loadingSaveBTN, setLoadingSaveBTN] = useState(false)
    const totalFronLs = +localStorage.getItem('total_calories') || 0
    const [totalCalories, setTotalCalories] = useState(totalFronLs)
    const todayActivity = JSON.parse(localStorage.getItem('todayActivity')) || []
    const [selectFood, setSelectFood] = useState(todayActivity)
    const todayLocalStorageData = JSON.parse(localStorage.getItem('todayActivity')) || []
    let calorie = localStorage.getItem('total_calories') || 0
    const tokenFromCookies = Cookies.get('token')
    const getData = async () => {

        setLoading(true)
        await fetch(`https://vast-red-vulture-sock.cyclic.app/activity`, {
            headers: {
                'Authorization': tokenFromCookies,
            }
        }).then(res => res.json())
            .then(res => {
                setLoading(false)
                setFood(res)

            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }
    useEffect(() => {
        getData()
        getTotalData()
    }, [])

    const AddFood = (ele) => {

        todayLocalStorageData.push(ele)
        localStorage.setItem('todayActivity', JSON.stringify(todayLocalStorageData))

        setSelectFood([...selectFood, ele])

        let ActDataArr = JSON.parse(localStorage.getItem('todayActivity'))

        let finalCount = ActDataArr.map((ele) => ele.calorieBurned * ele.steps)
        console.log(finalCount)
        const sum = finalCount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        console.log({ "sum": sum })
        setTotalCalories(sum)
    }

    const RemoveFood = (ele, ind) => {
        setSelectFood(selectFood => selectFood.filter(item => item._id !== ele._id))

        todayLocalStorageData.splice(ind, 1)
        localStorage.setItem('todayActivity', JSON.stringify(todayLocalStorageData))

        let ActDataArr = JSON.parse(localStorage.getItem('todayActivity'))

        let finalCount = ActDataArr.map((ele) => ele.calorieBurned * ele.steps)
        console.log(finalCount)
        const sum = finalCount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        console.log({ "sum": sum })
        setTotalCalories(sum)

    }


    const SaveFunction = async () => {
        setLoadingSaveBTN(true)
        let obj = {
            "date": new Date().toISOString().split('T')[0],
            "totalCaloriesBurned": totalCalories,
            "name": "Activities",
            "dailydata": selectFood,
        }
        await fetch('https://vast-red-vulture-sock.cyclic.app/activityhistory/add', {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-type": "application/json",
                "Authorization": tokenFromCookies,
            }
        }).then((res) => res.json())
            .then((res) => {
                if (res.msg === "Data has been added") {
                    setLoadingSaveBTN(false)
                    setSelectFood([])
                    window.localStorage.removeItem("todayActivity")
                    localStorage.setItem('todayBurnedCalories', totalCalories)
                    setTotalCalories(0)
                    window.localStorage.removeItem("FinalBurneCalories")

                    alert('Your data save in history')
                }
                console.log(res)
            })
            .catch((err) => {
                setLoadingSaveBTN(false)
                console.log(err)
            })
    }

    const Inc = (id, stp) => {

        setSelectFood((selectFood) =>
            selectFood.map((item) =>
                item._id === id ? { ...item, steps: stp } : item
            )
        );

        const IncArr = []

        for (let i = 0; i < selectFood.length; i++) {
            if (selectFood[i]._id == id) {

                let newObj = {
                    activity: selectFood[i].activity,
                    calorieBurned: selectFood[i].calorieBurned,
                    image: selectFood[i].image,
                    steps: stp,
                    _id: selectFood[i]._id
                }
                IncArr.push(newObj)

            } else {
                IncArr.push(selectFood[i])
            }
        }

        localStorage.setItem('todayActivity', JSON.stringify(IncArr))

        let ActDataArr = JSON.parse(localStorage.getItem('todayActivity'))

        let finalCount = ActDataArr.map((ele) => ele.calorieBurned * ele.steps)
        console.log(finalCount)
        const sum = finalCount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        console.log({ "sum": sum })
        setTotalCalories(sum)


    }
    const Dec = (id, stp) => {

        setSelectFood((selectFood) =>
            selectFood.map((item) =>
                item._id === id ? { ...item, steps: stp } : item
            )
        );

        const DecArr = []

        for (let i = 0; i < selectFood.length; i++) {
            if (selectFood[i]._id == id) {

                let newObj = {
                    activity: selectFood[i].activity,
                    calorieBurned: selectFood[i].calorieBurned,
                    image: selectFood[i].image,
                    steps: stp,
                    _id: selectFood[i]._id
                }
                DecArr.push(newObj)
            } else {
                DecArr.push(selectFood[i])
            }
        }

        localStorage.setItem('todayActivity', JSON.stringify(DecArr))

        let ActDataArr = JSON.parse(localStorage.getItem('todayActivity'))

        let finalCount = ActDataArr.map((ele) => ele.calorieBurned * ele.steps)
        console.log(finalCount)
        const sum = finalCount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        console.log({ "sum": sum })
        setTotalCalories(sum)
    }

    const getTotalData = () => {
        // let ActDataArr = JSON.parse(localStorage.getItem('todayActivity'))
        // console.log(ActDataArr)

        let finalCount = selectFood.map((ele) => ele.calorieBurned * ele.steps)
        console.log(finalCount)

        const sum = finalCount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        setTotalCalories(sum)
        localStorage.setItem('FinalBurneCalories', sum)
    }
    const FilterByCalories = async (value) => {
        setLoading(true)
        await fetch(`https://vast-red-vulture-sock.cyclic.app/activity`, {
            headers: {
                'Authorization': tokenFromCookies
            }
        }).then(res => res.json())
            .then(res => {
                setLoading(false)
                const sortedData = res.sort((a, b) => {
                    if (value === 'ascending') {
                        return a.calorieBurned - b.calorieBurned;
                    } else if (value === 'descending') {
                        return b.calorieBurned - a.calorieBurned;
                    } else {
                        return
                    }
                });
                setFood(sortedData)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }

    return (
        <div>
            <select className='activity_filter_select' name="" id="" onChange={(e) => FilterByCalories(e.target.value)}>
                <option value="">Sort by Calories Burned</option>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>

            </select>
            <div>
                <div className='filterContainer' >

                </div>
                <div className='FoodContainer' >
                    <div>
                        {loading ? <img className='loading_gif_foodshown_con' width='300px' src="https://kostt.com/assets/img/preloader.gif" alt="" /> :

                            <div className='showFoodOptionsContainer' >
                                {
                                    food && food.map((ele) =>
                                        <div key={ele._id} >
                                            <img src={ele.image} alt="" />
                                            <p>Activity : {ele.activity}</p>
                                            <p>Calories Burned : <b> {ele.calorieBurned}</b></p>
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
                            <h1>Activities Counter</h1>
                        </div>
                        <div className='seleceted_activity_main_con' >
                            {
                                selectFood && selectFood.map((ele, index) =>
                                    <div key={ele._id} >
                                        <img src={ele.image} alt="" />
                                        <p>Activity : {ele.activity}</p>
                                        <p>Calories Burned : <b> {ele.calorieBurned}</b></p>

                                        <p style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }} >
                                            <button className='Inc_dec_btn_activity' disabled={ele.steps == 1} onClick={() => Dec(ele._id, ele.steps - 1)} >-</button>
                                            <p>Steps : <b> {ele.steps}</b></p>
                                            <button className='Inc_dec_btn_activity' onClick={() => Inc(ele._id, ele.steps + 1)} >+</button>
                                        </p>
                                        <p>Total Calories burn : <b> {ele.steps * ele.calorieBurned}</b></p>
                                        <button onClick={() => RemoveFood(ele, index)} >Remove</button>
                                    </div>

                                )
                            }
                        </div>

                        {totalCalories == 0 ? "" : <h1 className="total_calories_amount" >Total Calories burned : <b>{totalCalories}</b></h1>}
                        {totalCalories == 0 ? <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>Add food to calculate calories</h1> : <button onClick={SaveFunction}>{loadingSaveBTN ? <Spinner /> : "Save"}</button>}

                    </div>
                </div>
            </div>
        </div>
    )
}