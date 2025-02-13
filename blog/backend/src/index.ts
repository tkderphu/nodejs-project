import db from "./db/connect/mongo";
import jwt, { JwtPayload } from 'jsonwebtoken'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.get('/user/generateToken', (req, res) => {
  const jwtSecretKey: any = process.env.JWT_SECRET_KEY
  let data = {
    time: Date(),
    userId: 12
  }

  const token = jwt.sign(data, jwtSecretKey)
  res.send(token)
})


app.get("/user/validateToken/:token", (req, res) => {
    const token = req.params['token']
    const jwtSecretKey: any = process.env.JWT_SECRET_KEY
  

})

app.listen(PORT, () => {
  console.log("Server is listening at PORT: " + PORT)
})


