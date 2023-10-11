const ledModel = require('../models/led')
const axios = require('axios')

async function getWeather(location) {
    try {
        const response = await axios.get("http://api.weatherapi.com/v1/current.json", {
            params: {
                key: "5cbd6980f17349ea85361516232709",
                q: location
            }
        })

        const { data } = response
        const result = {
            location,
            temp_c: data.current.temp_c,
            condition: data.current.condition.text
        }
        return result
    } catch (err) {
        console.log(err)
    }
}

class ledController {
    async index(req, res) {
        try {
            const result = await ledModel.findOne({ status: "active" })
            if (result.program == 1) {
                let { location, temp_c, condition } = await getWeather(result.location)
                condition = condition.toLowerCase()
                if (condition.includes("sunny")) {
                    condition = "Sunny"
                } else if (condition.includes("cloudy")) {
                    condition = "Cloudy"
                } else if (condition.includes("rain")) {
                    condition = "Rain"
                } else if (condition.includes("thunder")) {
                    condition = "Thunder"
                }
                await ledModel.findOneAndUpdate({ program: 1 }, { location, temp_c, condition, status: "active" })
                res.send({
                    program: result.program,
                    location: location,
                    temp_c: temp_c,
                    condition: condition
                })
            } else if (result.program == 2 || result.program == 3) {
                res.send({
                    program: result.program,
                    text: result.text,
                    color: result.color
                })
            } else {
                res.send({
                    program: result.program
                })
            }
        } catch (err) {
            console.error(err)
        }
    }

    async updateData(req, res) {
        const program = req.params.program
        await ledModel.findOneAndUpdate({ status: "active" }, { status: "disable" })
        if (program == 1) {
            let { location, temp_c, condition } = await getWeather(req.body.location)
            condition = condition.toLowerCase()
            if (condition.includes("sunny")) {
                condition = "Sunny"
            } else if (condition.includes("cloudy")) {
                condition = "Cloudy"
            } else if (condition.includes("rain")) {
                condition = "Rain"
            } else if (condition.includes("thunder")) {
                condition = "Rain with thunder"
            }
            await ledModel.findOneAndUpdate({ program: 1 }, { location, temp_c, condition, status: "active" })
        } else if (program == 4) {
            await ledModel.findOneAndUpdate({ program }, { status: "active" })
        } else {
            const text = req.body.text;
            const color = req.body.color;
            console.log(text, color);
            await ledModel.findOneAndUpdate({ program }, { text, color, status: "active" })
        }

        try {
            const result = await ledModel.findOne({ status: "active" })
            if (result.program == 1) {
                res.send({
                    program: result.program,
                    location: result.location,
                    temp_c: result.temp_c,
                    condition: result.condition
                })
            } else if (program == 4) {
                res.send("Kích hoạt hiển thị icon")
            } else {
                res.send({
                    program: result.program,
                    text: result.text,
                    color: result.color
                })
            }
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = new ledController