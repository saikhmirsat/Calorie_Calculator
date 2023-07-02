const mongoose = require('mongoose')

const activitySchema = mongoose.Schema({
    activity: String,
    calorieBurned: Number,
    steps: Number,
    image: String
}, {
    versionKey: false
})


const ActivityModel = mongoose.model('activitys', activitySchema)


module.exports = {
    ActivityModel
}