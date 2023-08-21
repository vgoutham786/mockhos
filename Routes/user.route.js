const express = require("express")
const userRoute = express.Router()
const bcrypt = require('bcrypt');
const userModel = require("../Model/user.model");
require("dotenv").config()
var jwt = require('jsonwebtoken');
const saltRounds = +process.env.salt;



userRoute.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;
        let hashed = await bcrypt.hash(password, saltRounds);
        await userModel.insertMany([{ email: email, password: hashed }])
        res.status(201).send({ msg: "User Registered Successfull" })
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})
userRoute.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const data = await userModel.findOne({ email: email })
        if (data) {
            const match = await bcrypt.compare(password, data.password);
            if (match) {
                var token = jwt.sign({ email: email }, process.env.secrect);
                res.status(201).send({ msg: "User Login Successfull", token: token })
            } else {
                res.status(200).send({ msg: "Invalid Credentials" })
            }
        } else {
            res.status(200).send({ msg: "Invalid Credentials" })
        }

    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})

module.exports = userRoute