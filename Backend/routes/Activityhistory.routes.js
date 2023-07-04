const express = require('express')
const { ActivityHistoryModel } = require('../model/Activityhistory.model')

const ActivityHistoryRoutes = express()

ActivityHistoryRoutes.get('/', async (req, res) => {
    const data = await ActivityHistoryModel.find()
    res.send(data)
})

ActivityHistoryRoutes.post('/add', async (req, res) => {
    try {
        const dailyData = new ActivityHistoryModel(req.body)
        await dailyData.save()
        res.send({ 'msg': 'Data has been added' })
    } catch (err) {
        res.send(err)
    }
})

ActivityHistoryRoutes.get('/:user', async (req, res) => {
    try {
        const { user } = req.params
        const data = await ActivityHistoryModel.find({ user })

        res.send(data)

    } catch (err) {
        res.send({ "msg": "Not get user request", "sucess": false })
        console.log(err)
    }

})

ActivityHistoryRoutes.delete('/delete/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        await ActivityHistoryModel.findByIdAndDelete({ _id })
        res.send({ "msg": 'Data has deleted' })
    } catch (err) {
        console.log(err)
        res.send({ "msg": 'Data has not delete' })
    }
})



module.exports = {
    ActivityHistoryRoutes
}