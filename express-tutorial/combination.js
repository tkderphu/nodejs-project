const express = require('express')
const app = express()
const myRoute = require('./routes/my.route')
require('dotenv/config')

const PORT  = process.env.PORT


app.use('/route', myRoute)


app.listen(PORT, () => {
    console.log("server is running");
})