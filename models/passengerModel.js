const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        default: 'test'
    },
    source: {
        type: String,
        trim: true,
        default: 'Delhi'
    },
    destination: {
        type: String,
        trim: true,
        default: 'Jaipur'
    },
    date: {
        type: String,
        default: new Date()
    },
    flight: {
        type: String,
        enum: ['indigo', 'airAsia', 'vistara'],
        default: 'indigo'
    },
    fare: {
        type: Number,
        default: 1200.00
    }
}, {
    timeStamps: true
})

const passengerModel = mongoose.model("passenger", schema)

module.exports = { passengerModel }