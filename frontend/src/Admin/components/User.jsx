import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Cookies from 'js-cookie'

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

export default function User(props) {

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState("")

    const [data, setData] = useState([])
    props.sendDataToParent(data);

    const token = localStorage.getItem('logintoken')

    const { isOpen, onOpen, onClose } = useDisclosure()

    const getData = async () => {
        await fetch(`https://vast-red-vulture-sock.cyclic.app/users`)
            .then((res) => res.json())
            .then((res) => {
                setData(res)
                // console.log(res)

            })
            .catch((e) => console.log(e))
    }

    useEffect(() => {
        getData()
    }, [])

    const DeleteFunc = async (id) => {

        await fetch(`https://vast-red-vulture-sock.cyclic.app/users/delete/${id}`, {
            method: "DELETE"
        })
            .then((res) => res.json())
            .then((res) => {
                getData()
                // console.log(res)
            })
            .catch((e) => console.log(e))
    }
    const EditFunc = async () => {
        let userdata = JSON.parse(localStorage.getItem('EditUserData'))

        let obj = {
            firstname: firstname || userdata.firstname,
            lastname: lastname || userdata.lastname,
            email: email || userdata.email,
            avatar: avatar || userdata.avatar
        }
        try {
            await fetch(`https://vast-red-vulture-sock.cyclic.app/users/edit/${userdata._id}`, {
                method: "PATCH",
                body: JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json"
                }
            }).then((res) => res.json())
                .then((res) => {
                    if (res.msg == "Updated user") {
                        getData()
                        localStorage.removeItem('EditUserData')
                        onClose()
                    }
                })
        } catch (err) {
            console.log(err)
        }
    }
    const EditGetData = (ele) => {
        localStorage.setItem('EditUserData', JSON.stringify(ele))
    }
    return (
        <div className='user_board_con'>
            {
                data && data.map((ele) => <div className='userCard_div' key={ele._id}>
                    <img src={ele.avatar} alt="" />
                    <h1>{ele.firstname} {ele.lastname}</h1>
                    <h1>Role: {ele.role}</h1>
                    <div className='card_btn_div'>
                        <button onClick={() => {
                            EditGetData(ele)
                            onOpen()
                        }}>Edit</button>
                        <button onClick={() => DeleteFunc(ele._id)}>Delete</button>
                    </div>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        {/* <ModalOverlay /> */}
                        <ModalContent>
                            <ModalHeader>Fill the details</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Input placeholder='First Name' onChange={(e) => setFirstname(e.target.value)} />
                                <Input placeholder='Last Name' onChange={(e) => setLastname(e.target.value)} />
                                <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                                <Input placeholder='Avatar' onChange={(e) => setAvatar(e.target.value)} />
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={onClose}>
                                    Close
                                </Button>
                                <Button onClick={EditFunc}>Save</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </div>)
            }
        </div>
    )
}
