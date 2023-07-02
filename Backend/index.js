const express = require('express')
const { connection } = require("./config/db")
const { userRoute } = require("./routes/User.routes")
const { authenticate } = require("./middleware/Authenticate.middleware")
const { TableRoute } = require("./routes/Tabledata.routes")
const { FoodRoute } = require("./routes/Food.routes")
const { HistoryRoutes } = require('./routes/History.routes')
const { ActivityRoute } = require('./routes/Activity.routes')
const { ExerciseRoute } = require('./routes/Exercise.routes')

const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Welcome")
})

app.use("/users", userRoute)
app.use(authenticate)
app.use("/datas", TableRoute)
app.use("/foods", FoodRoute)
app.use("/history", HistoryRoutes)
app.use("/activity", ActivityRoute)
app.use("/exercise", ExerciseRoute)

app.listen(8080, async () => {
    try {
        await connection
        console.log("DB connected")
    } catch (err) {
        console.log("DB not connected")
    }
    console.log("Server porting at 8080")
})