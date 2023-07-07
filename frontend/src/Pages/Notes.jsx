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
import { useNavigate } from 'react-router-dom'


export default function Notes() {
    const [data, setData] = useState([])

    const [Total_calories_intake, setTotal_calories_intake] = useState("")
    const [Target_calories_intake_value, setTarget_calories_intake_value] = useState("")
    const [Target_achieved_calories_intake, setTarget_achieved_calories_intake] = useState("")
    const [Total_calories_burned, setTotal_calories_burned] = useState("")
    const [Target_calories_burned, setTarget_calories_burned] = useState("")
    const [Target_achieved_calories_burned, setTarget_achieved_calories_burned] = useState("")
    const [createDate, setCreateDate] = useState("")
    const [nodata, setNodata] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const token = localStorage.getItem('logintoken')

    const user = JSON.parse(localStorage.getItem('userdetails')) || 0
    const id = user._id
    console.log(id)

    const navigate = useNavigate()



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
                        getData()
                        onClose()
                    }
                })
        } catch (err) {
            console.log(err)
        }

    }

    const getData = async () => {
        try {
            await fetch(`https://vast-red-vulture-sock.cyclic.app/datas/${id}`, {
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

    const GotoEditIntake = (ele) => {
        navigate(`/notes/${ele._id}`)
        localStorage.setItem('editData', JSON.stringify(ele))
    }
    const GotoEditIntake2 = (ele) => {
        navigate(`/notes/${ele._id}`)
        localStorage.setItem('editData', JSON.stringify(ele))
    }

    const deleteFunc = async (ele) => {
        try {
            await fetch(`https://vast-red-vulture-sock.cyclic.app/datas/delete/${ele._id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': token
                }
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.msg == "Data has deleted") {
                        getData()
                        console.log(res)
                        alert("delete successful")
                    }

                })
        } catch (err) {
            console.log(err)
        }
    }
    const filterdateFunc = async (value) => {
        setNodata(false)
        try {
            await fetch(`https://vast-red-vulture-sock.cyclic.app/datas/${id}`, {
                headers: {
                    'Authorization': token
                }
            })
                .then((res) => res.json())
                .then((res) => {
                    const filterData = res.filter((ele) => ele.createDate == value)
                    if (filterData == "") {
                        setNodata(true)
                    } else {
                        setData(filterData)
                    }
                })
        } catch (err) {
            console.log(err)
        }
    }

    const resteFunc = () => {
        getData()
    }

    function sortByCreateDateAscending(a, b) {
        var dateA = new Date(a.createDate);
        var dateB = new Date(b.createDate);
        return dateA - dateB;
    }

    function sortByCreateDateDescending(a, b) {
        var dateA = new Date(a.createDate);
        var dateB = new Date(b.createDate);
        return dateB - dateA;
    }

    const DateSortFunc = async (value) => {
        console.log(value)
        try {
            await fetch(`https://vast-red-vulture-sock.cyclic.app/datas/${id}`, {
                headers: {
                    'Authorization': token
                }
            })
                .then((res) => res.json())
                .then((res) => {
                    if (value == "assending") {
                        res.sort(sortByCreateDateAscending)
                        setData(res)
                    } else if (value == "descending") {
                        res.sort(sortByCreateDateDescending)
                        setData(res)
                    } else {
                        setData(res)
                    }
                })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <div className='notes_filter_div_con'>
                <div>
                    <label htmlFor="">Filter by date: </label><input type="date" onChange={(e) => filterdateFunc(e.target.value)} /><button onClick={resteFunc}>Reset</button>
                    <select name="" id="" onChange={(e) => DateSortFunc(e.target.value)}>
                        <option value="">Sort by date</option>
                        <option value="assending">assending</option>
                        <option value="descending">decsending</option>
                    </select>
                </div>
                <Button onClick={onOpen} m="20px" bg='#1F427F' color='white' _hover={{ bg: "#EA9F37" }}>Add Notes</Button>
            </div>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Fill some details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input type="date" onChange={(e) => setCreateDate(e.target.value)} />
                        <Input type="number" placeholder='Total calories intake on that date' onChange={(e) => setTotal_calories_intake(e.target.value)}></Input>
                        <Input type="number" placeholder='Target calories intake value' onChange={(e) => setTarget_calories_intake_value(e.target.value)}></Input>
                        <Input type="number" placeholder='Target achieved for calories intake' onChange={(e) => setTarget_achieved_calories_intake(e.target.value)}></Input>
                        <Input type="number" placeholder='Total calories burned on that date' onChange={(e) => setTotal_calories_burned(e.target.value)}></Input>
                        <Input type="number" placeholder='Target calories burned value' onChange={(e) => setTarget_calories_burned(e.target.value)}></Input>
                        <Input type="number" placeholder='Target achieved for calories burned' onChange={(e) => setTarget_achieved_calories_burned(e.target.value)}></Input>
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
                <div><p>Edit Target</p></div>
                <div><p>Edit Total</p></div>
                <div><p>Delete</p></div>

            </div>

            {

                nodata ? <h1>No data found</h1> : data.map((ele) =>
                    <div className='Home_Table_details' key={ele._id}>
                        <div><p>{ele.createDate}</p></div>
                        <div><p>{ele.name}</p></div>
                        <div><p>{ele.Total_calories_intake}</p></div>
                        <div><p>{ele.Target_calories_intake_value}</p></div>
                        <div><p>{ele.Target_achieved_calories_intake}</p></div>
                        <div><p>{ele.Total_calories_burned}</p></div>
                        <div><p>{ele.Target_calories_burned}</p></div>
                        <div><p>{ele.Target_achieved_calories_burned}</p></div>
                        <div><button onClick={() => GotoEditIntake(ele)}>edit</button></div>
                        <div><button onClick={() => GotoEditIntake2(ele)}>edit</button></div>
                        <div><button onClick={() => deleteFunc(ele)}>delete</button></div>

                    </div>
                )

            }

        </div>
    )
}
