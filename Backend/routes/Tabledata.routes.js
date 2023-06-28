const express = require('express')
const { TableModel } = require('../model/Tabledata.model')

const TableRoute = express.Router()

TableRoute.get('/', (req, res) => {
    res.send('Data page')
})


module.exports = {
    TableRoute
}