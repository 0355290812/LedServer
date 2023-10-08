const mongoose = require('mongoose')
require('dotenv').config()
async function connect() {
    try{
        await mongoose.connect("mongodb+srv://ha2kv3:iBVL7DldMmpAfUO6@led.cxkycij.mongodb.net/led_dev?retryWrites=true&w=majority")
        console.log("Connect Succesfully");
    } catch(err) {
        console.error(err)
    }
}

module.exports = { connect }