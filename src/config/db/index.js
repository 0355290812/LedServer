const mongoose = require('mongoose')

async function connect() {
    try{
        await mongoose.connect('mongodb+srv://ha2kv3:8VRLXneq2Zhh3QWf@ledserver.g8kfp7j.mongodb.net/?retryWrites=true&w=majority')
        console.log("Connect Succesfully");
    } catch(err) {
        console.error(err)
    }
}

module.exports = { connect }