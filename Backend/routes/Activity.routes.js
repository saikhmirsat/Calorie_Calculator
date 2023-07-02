const express = require('express')

const { ActivityModel, ExerciseModel } = require('../model/Activity.model')

const ActivityRoute = express.Router()


ActivityRoute.get('/', async (req, res) => {
    try {
        const data = await ActivityModel.find()
        res.send(data)
    } catch (err) {
        res.send({ "msg": 'Data no found', "success": false })
        console.log(err)
    }
})






ActivityRoute.get('/:_id', async (req, res) => {
    const { _id } = req.params
    try {
        const data = await ActivityModel.findById({ _id })
        res.send(data)
    } catch (err) {
        console.log(err)
    }
})

ActivityRoute.post('/add', async (req, res) => {
    try {
        const data = new ActivityModel(req.body)
        await data.save()
        res.send({ "msg": "Data has been added", "sucess": true })
    } catch (err) {
        console.log(err)
        res.send({ "msg": 'Data has not post', "success": false })
    }
})

ActivityRoute.patch('/edit/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        const payload = req.body
        await ActivityModel.findByIdAndUpdate({ _id }, payload)
        res.send({ "msg": "Data has been edited successfully", "success": true })

    } catch (err) {
        res.send({ "msg": "Data has not edited", "success": false })
        console.log(err)
    }
})

ActivityRoute.delete('/delete/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        await ActivityModel.findByIdAndDelete({ _id })
        res.send({ "msg": "Data has been delete successfully", "success": true })
    } catch (err) {
        console.log(err)
        res.send({ "msg": "Data has been not delete", "success": false })
    }
})

module.exports = {
    ActivityRoute
}