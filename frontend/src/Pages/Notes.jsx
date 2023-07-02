import React from 'react'
import './Notes.css'

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
import { useContext } from 'react'
import { ImportantContext } from '../Context/ImportantContext'


export default function Notes() {
    const [data, setData] = useState([])

    const [Total_calories_intake, setTotal_calories_intake] = useState("")
    const [Target_calories_intake_value, setTarget_calories_intake_value] = useState("")
    const [Target_achieved_calories_intake, setTarget_achieved_calories_intake] = useState("")
    const [Total_calories_burned, setTotal_calories_burned] = useState("")
    const [Target_calories_burned, setTarget_calories_burned] = useState("")
    const [Target_achieved_calories_burned, setTarget_achieved_calories_burned] = useState("")
    const [createDate, setCreateDate] = useState("")


    const { isAuth } = useContext(ImportantContext)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const token = localStorage.getItem('logintoken')

    const user = JSON.parse(localStorage.getItem('userdetails')) || 0
    const id = user._id
    console.log(id)

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
            await fetch(`https://vast-red-vulture-sock.cyclic.app/datas/add`, {
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
                        onClose()
                    }
                })
        } catch (err) {
            console.log(err)
        }

    }

    const getData = async () => {
        try {
            await fetch(`http://localhost:8080/datas/${id}`, {
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
        getData()
    }, [])





    return (
        <div>
            <Button onClick={onOpen} m="20px" bg='#1F427F' color='white' _hover={{ bg: "#EA9F37" }}>Add Notes</Button>

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
                <div><p>Date</p></div>
                <div><p>Name</p></div>
                <div><p>Total calories intake on that date</p></div>
                <div><p>Target calories intake value</p></div>
                <div><p>Target achieved for calories intake</p></div>
                <div><p>Total calories burned on that date</p></div>
                <div><p>Target calories burned value</p></div>
                <div><p>Target achieved for calories burned</p></div>
                <div><p>Edit</p></div>
                <div><p>Edit</p></div>
            </div>

            {

                data.map((ele) =>
                    <div className='Home_Table_details' key={ele._id}>
                        <div><p>{ele.createDate}</p></div>
                        <div><p>{ele.name}</p></div>
                        <div><p>{ele.Total_calories_intake}</p></div>
                        <div><p>{ele.Target_calories_intake_value}</p></div>
                        <div><p>{ele.Target_achieved_calories_intake}</p></div>
                        <div><p>{ele.Total_calories_burned}</p></div>
                        <div><p>{ele.Target_calories_burned}</p></div>
                        <div><p>{ele.Target_achieved_calories_burned}</p></div>
                        <div><button>edit</button></div>
                        <div><button>edit</button></div>
                    </div>
                )

            }

        </div>
    )
}
