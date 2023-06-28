const mongoose = require('mongoose')

const connection = mongoose.connect('mongodb+srv://caloriecalculator:caloriecalculator@cluster0.lhfe94b.mongodb.net/CalorieCalculator?retryWrites=true&w=majority')

module.exports = {
    connection
}