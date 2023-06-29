const mongoose = require('mongoose')

const foodSchema = mongoose.Schema({
    food: String,
    Calories: Number,
    Quantity: Number,
    image: String
}, {
    versionKey: false
})

const FoodModel = mongoose.model('foods', foodSchema)

module.exports = {
    FoodModel
}