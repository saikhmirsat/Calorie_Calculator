import React from 'react'
import { json } from 'react-router-dom'
import "./Home.css"

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Input
} from '@chakra-ui/react'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Home() {
    const [data, setData] = useState([])

    const [Total_calories_intake, setTotal_calories_intake] = useState("")
    const [Target_calories_intake_value, setTarget_calories_intake_value] = useState("")
    const [Target_achieved_calories_intake, setTarget_achieved_calories_intake] = useState("")
    const [Total_calories_burned, setTotal_calories_burned] = useState("")
    const [Target_calories_burned, setTarget_calories_burned] = useState("")
    const [Target_achieved_calories_burned, setTarget_achieved_calories_burned] = useState("")
    const [createDate, setCreateDate] = useState("")




    const { isOpen, onOpen, onClose } = useDisclosure()


    const token = localStorage.getItem('logintoken')

    let young = ""
    let mature = ""
    let old = ""
    const user = JSON.parse(localStorage.getItem('userdetails'))

    const calorie = localStorage.getItem('calories')

    const getUserData = async () => {

        if (user.gender === 'male') {
            if (user.age > 19 && user.age <= 30) {
                young = 3000
                localStorage.setItem('calories', young)
            } else if (user.age > 31 && user.age <= 60) {
                mature = 2800
                localStorage.setItem('calories', mature)
            } else if (user.age > 60) {
                old = 2600
                localStorage.setItem('calories', old)
            }
        } else {
            if (user.age > 19 && user.age <= 30) {
                young = 2400
                localStorage.setItem('calories', young)
            } else if (user.age > 31 && user.age <= 60) {
                mature = 2200
                localStorage.setItem('calories', mature)
            } else if (user.age > 60) {
                old = 2000
                localStorage.setItem('calories', old)
            }
        }

        try {
            await fetch(`http://localhost:8080/datas/${user._id}`, {
                headers: {
                    'Authorization': token
                }
            })
                .then((res) => res.json())
                .then((res) => {
                    setData(res)
                    console.log(res)
                })
        } catch (err) {
            console.log(err)
        }

    }


    useEffect(() => {
        getUserData()
    }, [])


    const AddData = async () => {
        let obj = {
            createDate: createDate,
            name: `${user.firstname} ${user.lastname}`,
            Total_calories_intake,
            Target_calories_intake_value,
            Target_achieved_calories_intake,
            Total_calories_burned,
            Target_calories_burned,
            Target_achieved_calories_burned,
        }

        try {
            await fetch(`http://localhost:8080/datas/add`, {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json",
                    'Authorization': token

                }
            }).then((res) => res.json())
                .then((res) => {
                    console.log(res)
                    if (res.msg == 'Data has been added') {
                        getUserData()
                        onClose()
                    }
                })
        } catch (err) {
            console.log(err)
        }

    }




    return (
        <div>
            <h1>Calorie need- {calorie}</h1>

            <Button onClick={onOpen}>Add Routines</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Fill some details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input type="date" onChange={(e) => setCreateDate(e.target.value)} />
                        <Input placeholder='Total calories intake on that date' onChange={(e) => setTotal_calories_intake(e.target.value)}></Input>
                        <Input placeholder='Target calories intake value' onChange={(e) => setTarget_calories_intake_value(e.target.value)}></Input>
                        <Input placeholder='Target achieved for calories intake' onChange={(e) => setTarget_achieved_calories_intake(e.target.value)}></Input>
                        <Input placeholder='Total calories burned on that date' onChange={(e) => setTotal_calories_burned(e.target.value)}></Input>
                        <Input placeholder='Target calories burned value' onChange={(e) => setTarget_calories_burned(e.target.value)}></Input>
                        <Input placeholder='Target achieved for calories burned' onChange={(e) => setTarget_achieved_calories_burned(e.target.value)}></Input>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button onClick={AddData}>Add</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <div className='Home_Table_head'>
                <p>Date</p>
                <p>Name</p>
                <p>Total calories intake on that date</p>
                <p>Target calories intake value</p>
                <p>Target achieved for calories intake</p>
                <p>Total calories burned on that date</p>
                <p>Target calories burned value</p>
                <p>Target achieved for calories burned</p>
                <p>Edit</p>
                <p>Edit</p>
            </div>
            {
                data.map((ele) =>
                    <div className='Home_Table_head' key={ele._id}>
                        <p>{ele.createDate}</p>
                        <p>{ele.name}</p>
                        <p>{ele.Total_calories_intake}</p>
                        <p>{ele.Target_calories_intake_value}</p>
                        <p>{ele.Target_achieved_calories_intake}</p>
                        <p>{ele.Total_calories_burned}</p>
                        <p>{ele.Target_calories_burned}</p>
                        <p>{ele.Target_achieved_calories_burned}</p>
                        <Button>edit</Button>
                        <Button>edit</Button>
                    </div>
                )

            }
        </div>
    )
}
