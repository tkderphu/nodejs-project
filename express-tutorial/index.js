const express = require('express')
const app = express()
require('dotenv/config')
const port = process.env.PORT
app.use(express.json())
app.get('/hello-world', (req, resp) => {
    resp.send(`
        <h1>Hello world: Express</h1>
    `)
})

app.post("/users", (req, res) => {
    const users = db.getCollection("users").find({})
    
    res.send(users)
})

app.get("/users", (req, res)=> {
    res.set({
        'Content-Type': "application/json"
    })
    res.send({
        'name': "phu",
        "age": 21
    })
})


app.listen(port, () => {
    console.log("server is listerning at port " + port)
})
