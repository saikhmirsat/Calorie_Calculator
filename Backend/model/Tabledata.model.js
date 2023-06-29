const mongoose = require('mongoose')

const tableSchema = mongoose.Schema({
    createDate: String,
    name: String,
    Total_calories_intake: Number,
    Target_calories_intake_value: Number,
    Target_achieved_calories_intake: Number,
    Total_calories_burned: Number,
    Target_calories_burned: Number,
    Target_achieved_calories_burned: Number,
    user: String
}, {
    versionKey: false
})

const TableModel = mongoose.model('tableDatas', tableSchema)

module.exports = {
    TableModel
}