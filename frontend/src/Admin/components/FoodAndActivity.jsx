import React from 'react'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { useEffect } from 'react'

export default function FoodAndActivity() {
    const [AddFood, setAddfood] = useState(true)
    const [AddActivities, setAddactivities] = useState(false)

    const [foodname, setFoodName] = useState('')
    const [foodcalories, setFoodcalories] = useState('')
    const [foodimage, setFoodimage] = useState('')

    const tokenFromCookies = Cookies.get('token')


    const AddFoodFunc = async () => {
        let obj = AddFood ? {
            food: foodname,
            Calories: foodcalories,
            Quantity: 1,
            image: foodimage
        } : {
            activity: foodname,
            calorieBurned: foodcalories,
            steps: 1,
            image: foodimage
        }




        let endPoint = AddFood ? "foods/add" : "activity/add"
        await fetch(`https://vast-red-vulture-sock.cyclic.app/${endPoint}`, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                'Content-type': 'application/json',
                'Authorization': tokenFromCookies
            }
        }).then(res => res.json())
            .then(res => {
                if (res.msg == 'Data has been added') {
                    alert('Item Added successfully')
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <div className='Food_activity_main_box'>
            <div className='Food_activity_child1'>
                <button className={AddFood ? "TargetPerticularBTN" : ""} onClick={() => {
                    setAddfood(true)
                    setAddactivities(false)
                }}>Add foods</button>
                <button className={AddActivities ? "TargetPerticularBTN" : ""} onClick={() => {
                    setAddactivities(true)
                    setAddfood(false)
                }}>Add Activities</button>
            </div>

            <div className={AddFood ? "AddProducts_form" : "invisible"}>
                <div>
                    <input placeholder='Food name' onChange={(e) => setFoodName(e.target.value)} />
                    <input type="number" placeholder='Food Calories' onChange={(e) => setFoodcalories(e.target.value)} />
                    <input placeholder='Food Image' onChange={(e) => setFoodimage(e.target.value)} />
                    <button onClick={AddFoodFunc}>Submit</button>
                </div>
            </div>
            <div className={AddActivities ? "AddProducts_form" : "invisible"}>
                <div>
                    <input placeholder='Activity name' onChange={(e) => setFoodName(e.target.value)} />
                    <input type="number" placeholder='Activity Burned Calories' onChange={(e) => setFoodcalories(e.target.value)} />
                    <input placeholder='Activity Image' onChange={(e) => setFoodimage(e.target.value)} />
                    <button onClick={AddFoodFunc}>Submit</button>
                </div>
            </div>
        </div>
    )
}
