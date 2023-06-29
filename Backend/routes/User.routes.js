const express = require('express')
const { userModel } = require('../model/User.model')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');



const userRoute = express.Router()

userRoute.get('/user', (req, res) => {
    res.send("User DB")
})

userRoute.post('/register', async (req, res) => {
    const { email, firstname, lastname, password, role, registerdate, avatar, gender, height, weight, age } = req.body

    try {
        const user = await userModel.find({ email })
        if (user.length > 0) {
            res.send({ "msg": "Already have an account please login" })
        } else {
            bcrypt.hash(password, 9, async (err, hash) => {
                if (err) {
                    res.send("Something went wrong")
                } else {
                    const user = new userModel({ role, registerdate, avatar, gender, email, firstname, lastname, password: hash, height, weight, age })
                    await user.save()
                    res.send({ "msg": "new user has been register", "success": true })
                }
            });
        }

    } catch (err) {
        console.log(err)
        res.send({ "msg": "Can't register", "success": false })
    }
})

userRoute.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user[0]._id }, "caloriecalculator")
                    res.send({ "msg": "Login sucessful", "success": true, token, user })
                } else {
                    res.send({ "msg": "Wrong crediential", "success": false })
                }
            });
        } else {
            res.send({ "msg": "Wrong crediential", "success": false })
        }
    } catch (err) {
        res.send({ "msg": "Something Wrong", "success": false })
    }
})

userRoute.get('/', async (req, res) => {
    try {
        const allUsers = await userModel.find()
        res.send(allUsers)
        console.log(allUsers)
    } catch (err) {
        res.send(err)
    }
})

userRoute.get('/:_id', async (req, res) => {
    try {
        const user = await userModel.find({ _id: req.params })
        if (user == "") {
            res.send("This is person not available")
        } else {
            res.send(user)
        }
        console.log(user)

    } catch (err) {
        res.send(err)
    }
})

userRoute.delete('/delete/:_id', async (req, res) => {
    try {
        let _id = req.params._id
        await userModel.findByIdAndDelete({ _id })
        res.send({ "msg": "User has been delete", "success": true })
    } catch (err) {
        res.send({ "msg": "User has not been delete", "success": false })
        console.log(err)
    }
})

userRoute.patch('/edit/:_id', async (req, res) => {
    try {
        let payload = req.body
        let _id = req.params._id
        await userModel.findByIdAndUpdate({ _id }, payload)
        res.send({ "msg": "Updated user", "success": true })
    } catch (err) {
        res.send({ "msg": "Updated has not been updated", "success": false })
        console.log(err)
    }
})
module.exports = {
    userRoute
}