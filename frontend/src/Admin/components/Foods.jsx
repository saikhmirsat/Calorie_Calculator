import React, { useEffect } from 'react'
import Cookies from 'js-cookie';
import { useState } from 'react';
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

export default function Foods(props) {
  const [loading, setLoading] = useState(false)

  const [foodname, setFoodName] = useState('')
  const [foodcalories, setFoodcalories] = useState('')
  const [foodimage, setFoodimage] = useState('')
  const [eatTime, setEatTime] = useState('')

  const [food, setFood] = useState([])
  const [editID, setEditId] = useState("")

  const [showAddFood, setShowAddFood] = useState(false)

  props.sendFoodData(food)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const tokenFromCookies = Cookies.get('token')

  const getData = async () => {
    setLoading(true)
    await fetch(`https://vast-red-vulture-sock.cyclic.app/foods`, {
      headers: {
        'Authorization': tokenFromCookies
      }
    }).then(res => res.json())
      .then(res => {
        // console.log(res)
        setLoading(false)
        setFood(res)
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
      })
  }
  useEffect(() => {
    getData()
  }, [])

  const DeleteFunc = async (ele) => {
    await fetch(`https://vast-red-vulture-sock.cyclic.app/foods/delete/${ele._id}`, {
      method: "DELETE",
      headers: {
        'Authorization': tokenFromCookies
      }
    }).then(res => res.json())
      .then(res => {
        // console.log(res)
        getData()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const EditGetData = (ele) => {
    localStorage.setItem('EditPerticularItme', JSON.stringify(ele))
    console.log(ele)
  }
  const EditFunc = async () => {

    let Editdata = JSON.parse(localStorage.getItem('EditPerticularItme'))

    let obj = {
      food: foodname || Editdata.food,
      Calories: foodcalories || Editdata.Calories,
      image: foodimage || Editdata.image,
      time: eatTime || Editdata.time
    }
    console.log(obj)
    try {
      await fetch(`https://vast-red-vulture-sock.cyclic.app/foods/edit/${Editdata._id}`, {
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
          food && food.map((ele) =>
            <div key={ele._id} >
              <img src={ele.image} alt="" />
              <p>Food : {ele.food}</p>
              <p>Calories : <b> {ele.Calories}</b></p>
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
                    <Input placeholder='Food name' onChange={(e) => setFoodName(e.target.value)} />
                    <Input type="number" placeholder='Food Calories' onChange={(e) => setFoodcalories(e.target.value)} />
                    <Input placeholder='Food Image' onChange={(e) => setFoodimage(e.target.value)} />
                    {/* <Input placeholder='Time "breakfast" "Lunch" "Dinner" ' onChange={(e) => setEatTime(e.target.value)} /> */}
                    <select name="" id="" onChange={(e) => setEatTime(e.target.value)}>
                      <option value="Choose time">Chhose time</option>
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                    </select>
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




