import React from 'react'
import './Food.css'
import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Foods() {
    const [data, setData] = useState([])

    let arr = []
    console.log(arr)
    const token = localStorage.getItem('logintoken')
    console.log(token)

    useEffect(() => {
        fetch('http://localhost:8080/foods', {
            headers: {
                Authorization: token
            }
        }).then((res) => res.json())
            .then((res) => {
                setData(res)
                console.log(res)
            })
    }, [])

    const AddProducts = (ele) => {
        arr.push(ele)
    }

    return (
        <div>
            <div>
                <select name="" id="">
                    <option value="">Choose Plan</option>
                    <option value="wightGain">Weight Gain</option>
                    <option value="weightLoss">Weight Loss</option>
                </select>
                <Button>Breakfast</Button>
                <Button>Lunch</Button>
                <Button>Dinner</Button>
            </div>
            <div className='food_and_colorie_con'>
                <div className='food_and_colorie_con_child_1'>
                    {
                        data.map((ele) => <div key={ele._id} className="food_card">
                            <img src={ele.image} alt="" />
                            <h3>{ele.food}</h3>
                            <h3>{`Calories:${ele.Calories}`}</h3>
                            <input type="radio" onChange={(e) => {
                                AddProducts(ele)
                            }} />
                        </div>)
                    }
                    <button onClick={() => console.log(arr)}>Arr data show</button>
                </div>
                <div></div>
            </div>
        </div>
    )
}
