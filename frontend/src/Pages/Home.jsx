import React from 'react'
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

import eatHealthy from '../Images/eathealthy.jpg'
import gym from '../Images/gym.webp'
import { useContext } from 'react'
import { ImportantContext } from '../Context/ImportantContext'
import ModalCompo from './Modal'



export default function Home() {
    const [data, setData] = useState([])

    const [Total_calories_intake, setTotal_calories_intake] = useState("")
    const [Target_calories_intake_value, setTarget_calories_intake_value] = useState("")
    const [Target_achieved_calories_intake, setTarget_achieved_calories_intake] = useState("")
    const [Total_calories_burned, setTotal_calories_burned] = useState("")
    const [Target_calories_burned, setTarget_calories_burned] = useState("")
    const [Target_achieved_calories_burned, setTarget_achieved_calories_burned] = useState("")
    const [createDate, setCreateDate] = useState("")
    const [modalOpen, setModalOpen] = useState(false);

    const { isAuth } = useContext(ImportantContext)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const token = localStorage.getItem('logintoken')

    const TodayCal = localStorage.getItem('todayCalories')

    const user = JSON.parse(localStorage.getItem('userdetails')) || 0
    const id = user._id
    console.log(id)

    const calorie = localStorage.getItem('calories')

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

    let needCal = calorie - TodayCal
    console.log(needCal)


    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };


    return (
        <div>
            <div className='home_calory_detail_container'>
                <div className='home_calorie_child1'>
                    <h1>Hello {user.firstname}</h1>
                    <p>Calories are important because they provide the energy needed for various bodily functions and physical activities. By understanding and calculating your calorie intake, you can make informed decisions about your diet and ensure you're meeting your energy needs.</p>
                    <div className='circle_in_home'></div>
                </div>
                <div className='home_calorie_child2'>
                    <img src="https://cdn.firstcry.com/education/2022/11/29121141/Yellow-Fruit-Names-For-Kids.jpg" alt="" />
                    <div className='calory_calculator_div'>
                        <h1><b style={{ color: 'black' }}>{calorie} </b> &nbsp; number of calories you need daily.</h1>

                        <h1>Your today consumed calories number : {TodayCal}</h1>
                        <h1>To fullfill your daily calories requirement you have to consume rest <b>{needCal}+</b> calories.  </h1>
                    </div>
                </div>
            </div>

            <div className='introContainer' >
                <div >
                    <div>
                        <h2>Feed Your Body, <br /> Fuel Your Journey.</h2>
                        <p>Eating healthy improves your physical and mental well-being, giving you more energy and reducing the risk of diseases.</p>
                        <button>choose food</button>
                    </div>
                    <div>
                        <img src={eatHealthy} alt="" />
                    </div>
                </div>
                <div>
                    <div>
                        <img src={gym} alt="" />
                    </div>
                    <div>
                        <h2>Be Active,<br /> Be Alive</h2>
                        <p>Exercise boosts your mood, strengthens your muscles and bones, improves heart health, and helps maintain a healthy weight.</p>
                        <button>Choose calorie to burn</button>
                    </div>
                </div>
            </div>




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
                        <Button onClick={openModal}>edit</Button>
                        <Button>edit</Button>
                    </div>
                )

            }
            
            <ModalCompo isOpen={modalOpen} onClose={closeModal}/>
        </div>
    )
}
