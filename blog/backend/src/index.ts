import jwt, { JwtPayload } from 'jsonwebtoken'
import express, { Response } from 'express'
import dotenv from 'dotenv'
import UsernameOrPasswordNotMatchException from './app/exception/UsernameOrPasswordNotMatchException'
import TokenInvalidException from './app/exception/TokenInvalidException'
import { handlerExceptionMiddleWare } from './middleware/middleware'

import { setupSwagger } from './swagger/SwaggerDocs'
import authRouter from './routes/AuthRoute'
import commentRouter from './routes/CommentRoute'
import postRouter from './routes/PostRoute'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(authRouter)
app.use(commentRouter)
app.use(postRouter)
// app.use(taggingRouter)



app.use(handlerExceptionMiddleWare);
setupSwagger(app)
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





