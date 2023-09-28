const express = require('express')
const app = express()
const db = require('../src/config/db')
const route = require('../src/routes/index')
const axios = require('axios')
const cors = require('cors')

//
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(cors())

//Connect Database
db.connect();

//Route
route(app)

// async function getWeather(location) {
//     try {
//         await axios.get("http://api.weatherapi.com/v1/current.json", {
//             params: {
//                 key: "5cbd6980f17349ea85361516232709",
//                 q: location
//             }
//         })
//             .then(function (response) {
//                 const {data} = response
//                 const result = {
//                     location,
//                     temp_c: data.current.temp_c,
//                     condition: data.current.condition.text
//                 }
//                 console.log(result);
//             })
//     } catch (err) {
//         console.log(err)
//     }
// }
// getWeather("HaNoi")

app.listen(3000)
