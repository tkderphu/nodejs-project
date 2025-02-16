import jwt, { JwtPayload } from 'jsonwebtoken'
import express from 'express'
import dotenv from 'dotenv'
import db from './db/mongo'
import commentRouter from './routes/CommentRoute'
import postRouter from './routes/PostRoute'
import taggingRouter from './routes/TaggingRoute'
import MailService from './app/service/MailService'
import { ForgetPasswordTemplate } from './app/framework/template/ForgetPassword'
import { random6Digit } from './app/framework/utils/RandomUtils'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(commentRouter)
app.use(postRouter)
app.use(taggingRouter)


app.listen(PORT, () => {
  // const secretKey = `Let's Rock`; // Using this as a secret key
  // const token = jwt.sign({
  //   userId: 1
  // }, secretKey)
  // console.log(token)
  // console.log(new Date().getTime())
  // console.log(jwt.verify(token, secretKey)); // Log payload object in terminal
  // MailService.sendMail("quangphu2050@gmail.com", `Forget password email`, ForgetPasswordTemplate(random6Digit().toString(), 5))
  console.log("Server is listening at PORT: " + PORT)
})





