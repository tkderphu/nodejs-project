import jwt, { JwtPayload } from 'jsonwebtoken'
import express, { Response } from 'express'
import dotenv from 'dotenv'
import db from './db/mongo'
import UsernameOrPasswordNotMatchException from './app/exception/UsernameOrPasswordNotMatchException'
import TokenInvalidException from './app/exception/TokenInvalidException'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
// app.use(commentRouter)
// app.use(postRouter)
// app.use(taggingRouter)

app.get("/users",  (req, res, next) => {
    const userCollections = db.collection('users')
    getUsers(userCollections).then(response => {
      return response
    }).catch(err => {
      next(err)
    })
  })

async function getUsers(userCollections: any) {
  const users = await userCollections.find({}).toArray()
  if(users.length == 2) {
    throw new TokenInvalidException("hehe")
  }
  return users
}

// Centralized error handling middleware
function errorHandler(err: UsernameOrPasswordNotMatchException, req:any, res: Response, next:any) {
  console.error(err.stack);
  res.status( 403).json({ error: err.message });

}

app.use(errorHandler);

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





