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



  const [food, setFood] = useState([])
  const [editID, setEditId] = useState("")

  const [showAddFood, setShowAddFood] = useState(false)

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
        // console.log(res)
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
        // console.log(res)
        getData()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const EditFunc = () => {
    console.log(editID)
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
                <button onClick={onOpen}>Edit</button>

                <button onClick={() => DeleteFunc(ele)}>Delete</button>

              </div>

              <Modal isOpen={isOpen} onClose={onClose}>
                {/* <ModalOverlay /> */}
                <ModalContent>
                  <ModalHeader>Modal Title</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>

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




