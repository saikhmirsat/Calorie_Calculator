const express = require('express')
const { Model } = require('mongoose')
const { ExerciseModel } = require('../model/Exercise.model')

const ExerciseRoute = express.Router()

ExerciseRoute.get('/', async (req, res) => {
    try {
        const data = await ExerciseModel.find()
        res.send(data)
    } catch (err) {
        res.send({ "msg": 'Data no found', "success": false })
        console.log(err)
    }
})

ExerciseRoute.get('/:_id', async (req, res) => {
    const { _id } = req.params
    try {
        const data = await ExerciseModel.findById({ _id })
        res.send(data)
    } catch (err) {
        console.log(err)
    }
})

ExerciseRoute.post('/add', async (req, res) => {
    try {
        const data = new ExerciseModel(req.body)
        await data.save()
        res.send({ "msg": "Data has been added", "sucess": true })
    } catch (err) {
        console.log(err)
        res.send({ "msg": 'Data has not post', "success": false })
    }
})

ExerciseRoute.patch('/edit/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        const payload = req.body
        await ExerciseModel.findByIdAndUpdate({ _id }, payload)
        res.send({ "msg": "Data has been edited successfully", "success": true })

    } catch (err) {
        res.send({ "msg": "Data has not edited", "success": false })
        console.log(err)
    }
})

ExerciseRoute.delete('/delete/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        await ExerciseModel.findByIdAndDelete({ _id })
        res.send({ "msg": "Data has been delete successfully", "success": true })
    } catch (err) {
        console.log(err)
        res.send({ "msg": "Data has been not delete", "success": false })
    }
})

module.exports = {
    ExerciseRoute
}