const ledRoute = require('./led')

function route(app) {
    app.use('/led', ledRoute)
}

module.exports = route