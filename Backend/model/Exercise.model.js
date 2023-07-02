const mongoose = require('mongoose')

const exerciseSchema = mongoose.Schema({
    activity: String,
    calorieBurned: Number,
    image: String
}, {
    versionKey: false
})

const ExerciseModel = mongoose.model('exercise', exerciseSchema)

module.exports = {
    ExerciseModel
}