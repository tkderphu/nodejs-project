import jwt, { JwtPayload } from 'jsonwebtoken'
import express from 'express'
import dotenv from 'dotenv'
import db from './db/mongo'
import commentRouter from './routes/CommentRoute'
import postRouter from'./routes/PostRoute'
import taggingRouter from'./routes/TaggingRoute'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(commentRouter)
app.use(postRouter)
app.use(taggingRouter)


app.listen(PORT, () => {
  console.log("Server is listening at PORT: " + PORT)
})





