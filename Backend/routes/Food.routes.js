const express = require('express')

const FoodRoute = express.Router()
const { FoodModel } = require('../model/Food.model')

FoodRoute.get('/', async (req, res) => {
    try {
        const data = await FoodModel.find()
        res.send(data)
    } catch (err) {
        res.send({ "msg": 'Data no found', "success": false })
        console.log(err)
    }
    res.send('Welcome')
})

FoodRoute.get('/:_id', async (req, res) => {
    const { _id } = req.params
    try {
        const data = await FoodModel.findById({ _id })
        res.send(data)
    } catch (err) {
        console.log(err)
    }
})

FoodRoute.post('/add', async (req, res) => {
    try {
        const data = new FoodModel(req.body)
        await data.save()
        res.send({ "msg": "Data has been added", "sucess": true })
    } catch (err) {
        console.log(err)
        res.send({ "msg": 'Data has not post', "success": false })
    }
})

FoodRoute.patch('/edit/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        const payload = req.body
        await FoodModel.findByIdAndUpdate({ _id }, payload)
        res.send({ "msg": "Data has been edited successfully", "success": true })

    } catch (err) {
        res.send({ "msg": "Data has not edited", "success": false })
        console.log(err)
    }
})

FoodRoute.delete('/delete/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        await FoodModel.findByIdAndDelete({ _id })
        res.send({ "msg": "Data has been delete successfully", "success": true })
    } catch (err) {
        console.log(err)
        res.send({ "msg": "Data has been not delete", "success": false })
    }
})

module.exports = {
    FoodRoute
}