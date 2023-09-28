const mongoose = require('mongoose')
const Schema = mongoose.Schema

const led = new Schema ({
    program: {type: Number, default: 1},
    text: {type: String, default: "Hello"},
    location: {type: String, default: "HaNoi"},
    temp_c: {type: Number, default: 30.0},
    condition: {type: String, default: "Sunny"},
    color: {type: Object, default: {
        r: 5,
        g: 5,
        b: 5
    }},
    status: {type: String, default: "disable"}
})

module.exports = mongoose.model('led', led)