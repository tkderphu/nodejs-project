const express = require("express")
const app = express()
const path = require('path')
/**
 * using middleware
 */
app.use('/static', express.static(path.join(__dirname, "static")))


/**
 * using route
 */

app.get("/file", (req, res) => {
    res.sendFile(path.join(__dirname, "static/anh1.png"))
})

app.listen(8080, () => {
    console.log("server started")
})