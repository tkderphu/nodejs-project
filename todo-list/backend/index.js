import dotenv from "dotenv";
dotenv.config();
import cors from 'cors'
import express from 'express'
import { ObjectId } from "mongodb";
import db from "./db/mongo.js";

const app = express()
const PORT = process.env.PORT

const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions))
app.use(express.json())


app.get('/api/todos', async (req, res) => {
    const todoList =  await db.collection("todo").find().toArray();
    res.status(200).send(todoList);
})

app.get("/api/todos/:id", async (req, res) => {
    const todo = await db.collection('todo').findOne({
        _id: new ObjectId(req.params['id'])
    })
    if(!todo) {
        res.status(404).send("Not found todo")
    }
    res.status(200).send(todo)
})

app.post('/api/todos', async (req, res) => {
    const body = req.body
    let result = await db.collection('todo').insertOne(body)
    res.status(200).send(result)
})
app.delete('/api/todos/:todoId', async (req, res) => {
    const todoId = req.params['todoId']

    const collection = await db.collection("todo")
    
    let result = await collection.deleteOne({
        _id: new ObjectId(todoId)
    })

    res.status(200).send(result)

})

app.put('/api/todos/:todoId', async (req, res) => {
    const body = req.body
    const todoId = req.params['todoId']
    let result = await db.collection('todo').updateOne({
        _id: new ObjectId(todoId)
    }, {
        $set: {...body}
    })

    res.status(200).send(result)
})

app.listen(PORT, () => {
    console.log("Server is listening at port: " + PORT);
})