const mongoose = require("mongoose")

const doctorSchema = mongoose.Schema({

    "name": String,
    "image": String,
    "specialization": String,
    "experience": Number,
    "location": String,
    "date": {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
    },
    "slots": Number,
    "fee": Number

})

const doctorModel = mongoose.model("doctor", doctorSchema)

module.exports = doctorModel