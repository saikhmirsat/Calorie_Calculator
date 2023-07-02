const express = require('express')
const { TableModel } = require('../model/Tabledata.model')

const TableRoute = express.Router()


TableRoute.get('/', async (req, res) => {
    try {
        const data = await TableModel.find()
        res.send(data)
    } catch (e) {
        res.send({ 'msg': 'Error' })
    }
})

// TableRoute.get('/userdata', async (req, res) => {
//     try {
//         let { user } = req.params
//         const data = await TableModel.find({ user })
//         res.send(data)
//     } catch (e) {
//         res.send({ 'msg': 'Error' })
//     }
// })
TableRoute.get('/:user', async (req, res) => {
    try {
        const { user } = req.params
        const data = await TableModel.find({ user })

        res.send(data)

    } catch (err) {
        res.send({ "msg": "Not get user request", "sucess": false })
        console.log(err)
    }

})

TableRoute.post('/add', async (req, res) => {
    try {
        const tableData = new TableModel(req.body)
        await tableData.save()
        res.send({ 'msg': 'Data has been added' })
    } catch (err) {
        res.send(err)
    }
})

TableRoute.patch('/edit/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        const payload = req.body
        await TableModel.findByIdAndUpdate({ _id }, payload)
        res.send({ 'msg': 'data has been update' })
    } catch (err) {
        res.send({ "msg": "Data not updated" })
        console.log(err)
    }
})
TableRoute.delete('/delete/:_id', async (req, res) => {
    try {
        const { _id } = req.params
        await TableModel.findByIdAndDelete({ _id })
        res.send({ "msg": 'Data has deleted' })
    } catch (err) {
        console.log(err)
        res.send({ "msg": 'Data has not delete' })
    }
})

module.exports = {
    TableRoute
}