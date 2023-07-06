import React, { useState } from 'react'
import Cookies from 'js-cookie';
import { useEffect } from 'react';

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

export default function Acitivity(props) {
    const [activity, setActivity] = useState([])

    const [ActivityValue, setActivityValue] = useState('')
    const [CaloriesBurned, setCaloriesBurned] = useState('')
    const [Activityimage, setActivityimage] = useState('')

    const { isOpen, onOpen, onClose } = useDisclosure()

    props.sendActivityData(activity)


    const tokenFromCookies = Cookies.get('token')

    const getData = async () => {
        await fetch(`https://vast-red-vulture-sock.cyclic.app/activity`, {
            headers: {
                'Authorization': tokenFromCookies
            }
        }).then(res => res.json())
            .then(res => {
                // console.log(res)
                setActivity(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        getData()
    }, [])

    const DeleteFunc = async (ele) => {
        await fetch(`https://vast-red-vulture-sock.cyclic.app/activity/delete/${ele._id}`, {
            method: "DELETE",
            headers: {
                'Authorization': tokenFromCookies
            }
        }).then(res => res.json())
            .then(res => {
                console.log(res)
                getData()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const EditGetData = (ele) => {
        localStorage.setItem('EditPerticularItme', JSON.stringify(ele))
    }
    const EditFunc = async () => {

        let Editdata = JSON.parse(localStorage.getItem('EditPerticularItme'))

        let obj = {
            activity: ActivityValue || Editdata.activity,
            calorieBurned: CaloriesBurned || Editdata.calorieBurned,
            image: Activityimage || Editdata.image
        }

        try {
            await fetch(`https://vast-red-vulture-sock.cyclic.app/activity/edit/${Editdata._id}`, {
                method: "PATCH",
                body: JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json",
                    'Authorization': tokenFromCookies
                }
            }).then((res) => res.json())
                .then((res) => {
                    if (res.success == true) {
                        console.log(res)
                        getData()
                        localStorage.removeItem('EditPerticularItme')
                        onClose()
                        alert(res.msg)
                    }
                })
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div>
            <div className='showFoodOptionsContainer' >
                {
                    activity && activity.map((ele) =>
                        <div key={ele._id} >
                            <img src={ele.image} alt="" />
                            <p>Activity : {ele.activity}</p>
                            <p>Calories Burned : <b> {ele.calorieBurned}</b></p>
                            <div style={{ display: 'flex', boxShadow: 'unset', gap: '10px' }}>
                                <button onClick={() => {
                                    EditGetData(ele)
                                    onOpen()
                                }}>Edit</button>
                                <button onClick={() => DeleteFunc(ele)}>Delete</button>
                            </div>
                            <Modal isOpen={isOpen} onClose={onClose}>
                                {/* <ModalOverlay /> */}
                                <ModalContent>
                                    <ModalHeader>Fill the details</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <Input placeholder='Activity' onChange={(e) => setActivityValue(e.target.value)} />
                                        <Input placeholder='Calories Burned' onChange={(e) => setCaloriesBurned(e.target.value)} />
                                        <Input placeholder='Image link' onChange={(e) => setActivityimage(e.target.value)} />
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                                            Close
                                        </Button>
                                        <Button onClick={EditFunc}>Save</Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
