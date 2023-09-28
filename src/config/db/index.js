const mongoose = require('mongoose')
require('dotenv').config()
async function connect() {
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_URI)
        console.log("Connect Succesfully");
    } catch(err) {
        console.error(err)
    }
}

module.exports = { connect }