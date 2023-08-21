const express = require("express");
const app = express()
const cors = require("cors");
const connetToDb = require("./db");
const userRoute = require("./Routes/user.route");
const appointRoute = require("./Routes/appointment.route");
require("dotenv").config()
app.use(cors())
app.use(express.json())


const port = +process.env.PORT || 8000
app.use("/", userRoute)
app.use("/appointments", appointRoute)




app.listen(port, async () => {
    try {
        await connetToDb
        console.log("connected to DB")
        console.log("server running at port", port)
    } catch (error) {
        console.log(error)
    }
})