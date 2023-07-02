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
  Button
} from '@chakra-ui/react'

export default function Foods(props) {

  const [food, setFood] = useState([])

  props.sendFoodData(food)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const tokenFromCookies = Cookies.get('token')

  const getData = async () => {
    await fetch(`https://vast-red-vulture-sock.cyclic.app/foods`, {
      headers: {
        'Authorization': tokenFromCookies
      }
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        setFood(res)
      })
      .catch(err => {
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
        console.log(res)
        getData()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const EditFunc = (ele) => {
    console.log(ele)
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
                <button onClick={() => EditFunc(ele)}>Edit</button>
                <button onClick={() => DeleteFunc(ele)}>Delete</button>
              </div>



            </div>
          )
        }
      </div>



    </div>
  )
}
