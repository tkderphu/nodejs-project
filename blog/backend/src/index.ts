import jwt, { JwtPayload } from 'jsonwebtoken'
import express, { Response } from 'express'
import dotenv from 'dotenv'
import { handlerExceptionMiddleWare } from './middleware/middleware'

import { setupSwagger } from './swagger/SwaggerDocs'
import authRouter from './routes/AuthRoute'
import commentRouter from './routes/CommentRoute'
import postRouter from './routes/PostRoute'
import bookMarkRouter from './routes/BookMarkRoute'
import cors from 'cors'
import followRoute from './routes/FollowRoute'
import userRouter from './routes/UserRoute'
import fireBaseRouter from './routes/FirebaseRoute'
import uploadRouter from './routes/UploadRoute'
import notificationRouter from './routes/NotificationRoute'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const corsOptions = {
  origin: ['http://localhost:5173', "http://localhost:5173/"], // Allow specific frontend URLs
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"], // Allow Authorization header
  credentials: true, // Allow cookies if needed
};



app.use(cors(corsOptions))
app.use(express.json())
app.use(authRouter)
app.use(commentRouter)
app.use(postRouter)
app.use(bookMarkRouter)
app.use(followRoute)
app.use(userRouter)
app.use(fireBaseRouter)
app.use(uploadRouter)
app.use(notificationRouter)
// app.use(taggingRouter)


app.use(handlerExceptionMiddleWare);
setupSwagger(app)
app.listen(PORT, () => {
  console.log("Server is listening at PORT: " + PORT)
})





