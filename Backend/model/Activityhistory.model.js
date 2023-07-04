const mongoose = require('mongoose')

const ActivityhistorySchema = mongoose.Schema({
    date: String,
    name: String,
    totalCaloriesBurned: Number,
    dailydata: Array,
    user: String
}, {
    versionKey: false
})

const ActivityHistoryModel = mongoose.model('Activityhistory', ActivityhistorySchema)

module.exports = {
    ActivityHistoryModel
}