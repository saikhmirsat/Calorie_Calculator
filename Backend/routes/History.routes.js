const express = require('express')
const { HistoryModel } = require('../model/History.model')

const HistoryRoutes = express()

HistoryRoutes.get('/', async (req, res) => {
    const data = await HistoryModel.find()
    res.send(data)
})

HistoryRoutes.post('/add', async (req, res) => {
    try {
        const dailyData = new HistoryModel(req.body)
        await dailyData.save()
        res.send({ 'msg': 'Data has been added' })
    } catch (err) {
        res.send(err)
    }
})

HistoryRoutes.get('/:user', async (req, res) => {
    try {
        const { user } = req.params
        const data = await HistoryModel.find({ user })

        res.send(data)

    } catch (err) {
        res.send({ "msg": "Not get user request", "sucess": false })
        console.log(err)
    }

})

HistoryRoutes.delete('/delete/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        await HistoryModel.findByIdAndDelete({ _id })
        res.send({ "msg": 'Data has deleted' })
    } catch (err) {
        console.log(err)
        res.send({ "msg": 'Data has not delete' })
    }
})



module.exports = {
    HistoryRoutes
}