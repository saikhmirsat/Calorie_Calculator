import React, { useState } from 'react'
import './Food.css'
import { Button } from '@chakra-ui/react'

export default function Food() {
    const [time, setTime] = useState('')
    const [plan, setPlan] = useState('')
    const [calorie, setCalories] = useState(0)
    const [food, setFood] = useState([])
    const [loading, setLoading] = useState(false)

    const [arrCal, setArrcal] = useState([])

    const [selectFood, setSelectFood] = useState([])


    const showOption = async (time) => {
        if (plan == '') {
            alert('Please select Plan for')
        } else {
            setLoading(true)
            await fetch(`https://vast-red-vulture-sock.cyclic.app/foods/${time}`, {
                headers: {
                    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDlkMjdiYzNkNTA3OTVjODE4NzM5YjYiLCJpYXQiOjE2ODgxMjU4MDV9.B5MLXGVlkxNMIRmf98V0gjSqO4hB0nhZC93VjAJCU1E'
                }
            }).then(res => res.json())
                .then(res => {
                    setLoading(false)
                    console.log(res)
                    setFood(res)

                })
                .catch(err => {
                    setLoading(false)
                    console.log(err)
                })
        }
    }


    const AddFood = (ele) => {
        selectFood.push(ele)
        console.log(selectFood)
        let total = 0
        for (var i = 0; i < selectFood.length; i++) {
            if (isNaN(selectFood[i].Calories)) {
                continue;
            }
            total += Number(selectFood[i].Calories);
        }

        setCalories(total)
    }

    const RemoveFood = (ele) => {
        setSelectFood(selectFood => selectFood.filter(item => item._id !== ele._id))
    }


    const SaveFunction = async () => {
        // let obj = {
        //     "date": new Date().toISOString().split('T')[0],
        //     "dailydata": selectFood
        // }
        // await fetch('https://mirsat-vercel-database.vercel.app/datas', {
        //     method: "POST",
        //     body: JSON.stringify(obj),
        //     headers: {
        //         "Content-type": "application/json",
        //     }
        // }).then((res) => res.json())
        //     .then((res) => console.log(res))
        //     .catch((err) => console.log(err))
        // console.log(obj)
    }

    return (
        <div>
            <div>
                <select onChange={(e) => setPlan(e.target.value)}>
                    <option value="">Plan For</option>
                    <option value="weight-gain">Weight Gain</option>
                    <option value="weight-loos">Weaight Loos</option>
                </select>
                <button onClick={() => {
                    setTime('breakfast')
                    showOption('breakfast')
                }} >Breakfist</button>
                <button onClick={() => {
                    setTime('lunch')
                    showOption('lunch')
                }} >Lunch</button>
                <button onClick={() => {
                    setTime('dinner')
                    showOption('dinner')
                }} >Dinner</button>
            </div>
            <div className='FoodContainer' >
                <div>
                    {loading ? <img width='300px' src="https://media.tenor.com/IuABkwIwrUUAAAAC/loading-yellow.gif" alt="" /> :

                        <div className='showFoodOptionsContainer' >
                            {
                                food && food.map((ele) =>
                                    <div key={ele._id} >
                                        <img src={ele.image} alt="" />
                                        <p>Food : {ele.food}</p>
                                        <p>Calories : {ele.Calories}</p>
                                        <button onClick={() => {
                                            AddFood(ele)
                                            // CountCalorie(ele.Calories)
                                        }} >Add</button>
                                    </div>
                                )
                            }
                        </div>
                    }

                </div>
                <div  >
                    <div className='bitInfo' >
                        <h1>{plan === 'weight-gain' ? 'Weight Gain' : plan === 'weight-loos' ? 'Weight Loos' : 'Please select plan for'}</h1>
                        <h1>{time}</h1>
                    </div>
                    <div className='showWantToremove' >
                        {
                            selectFood.map((ele) =>
                                <div key={ele._id} >
                                    <img src={ele.image} alt="" />
                                    <p>Food : {ele.food}</p>
                                    <p>Calories : {ele.Calories}</p>
                                    <button onClick={() => RemoveFood(ele)} >Remove</button>
                                </div>
                            )
                        }
                    </div>
                    <Button onClick={SaveFunction}>Save</Button>
                    <div>

                        <h1>Total Calories</h1>
                        <h2  >{calorie}</h2>

                    </div>
                </div>
            </div>
        </div>
    )
}