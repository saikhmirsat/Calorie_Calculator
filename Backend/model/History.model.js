const mongoose = require('mongoose')

const historySchema = mongoose.Schema({
    date: String,
    plan: String,
    totalCalories: Number,
    dailydata: Array,
    user: String
}, {
    versionKey: false
})

const HistoryModel = mongoose.model('history', historySchema)

module.exports = {
    HistoryModel
}