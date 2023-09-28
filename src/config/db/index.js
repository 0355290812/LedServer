const mongoose = require('mongoose')

async function connect() {
    try{
        await mongoose.connect('mongodb://127.0.0.1/led_dev')
        console.log("Connect Succesfully");
    } catch(err) {
        console.error(err)
    }
}

module.exports = { connect }