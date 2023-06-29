import React from 'react'
import './Food.css'
import { Button } from '@chakra-ui/react'
import { useState } from 'react'

export default function Foods() {
    const [data, setData] = useState([])

    const token = localStorage.getItem('logintoken')
    console.log(token)

    const getdata = async () => {
        try {
            const response = await fetch(`https://zany-slippers-fox.cyclic.app/foods`, {
                headers: {
                    'Authorization': token
                }
            }).then((res) => res.json())
                .then((res) => {
                    console.log(res)
                    setData(res)
                })


        } catch (err) {
            console.log(err);
        }
    };

    getdata();

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
                <div>
                    {
                        data.map((ele) => <div>
                            <img src={ele.image} alt="" />
                            <h3>{ele.food}</h3>
                            <h3>{`Calories:${ele.Calories}`}</h3>
                        </div>)
                    }
                </div>
                <div></div>
            </div>
        </div>
    )
}
