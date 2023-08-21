const express = require("express");
const doctorModel = require("../Model/doctor.model");
const appointRoute = express.Router()



appointRoute.post("/", async (req, res) => {
    try {
        const obj = req.body;
        await doctorModel.insertMany([obj])
        res.status(201).send({ msg: "Appointment booked" })
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})

appointRoute.get("/", async (req, res) => {
    const { filter, sort, name } = req.query
    let data = []
    try {
        if (filter && sort && name) {
            data = await doctorModel.find({ name: { $regex: name }, specialization: filter }).sort({ date: sort })
        } else if (filter && sort) {
            data = await doctorModel.find({ specialization: filter }).sort({ date: sort })
        } else if (sort && name) {
            data = await doctorModel.find({ name: { $regex: name } }).sort({ date: sort })
        } else if (filter && name) {

            data = await doctorModel.find({ name: { $regex: name }, specialization: filter })
        } else if (filter) {
            data = await doctorModel.find({ specialization: filter })
        } else if (sort) {
            data = await doctorModel.find().sort({ date: sort })
        } else if (name) {
            data = await doctorModel.find({ name: { $regex: name } })
        } else {
            data = await doctorModel.find()
        }
        res.status(200).send({ data: data })

    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})
appointRoute.patch("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const obj = req.body;
        await doctorModel.findByIdAndUpdate(id, obj)
        res.status(201).send({ msg: "Appointment Updated" })
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})
appointRoute.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const obj = req.body;
        await doctorModel.findByIdAndDelete(id)
        res.status(201).send({ msg: "Appointment deleted" })
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})
module.exports = appointRoute