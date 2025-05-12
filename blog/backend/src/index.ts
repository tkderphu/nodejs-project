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
import galleryRouter from './routes/GalleryRoute'
import seriesRoute from './routes/SeriesRoute'
import seriesRouter from './routes/SeriesRoute'
import searchRoute from './routes/SearchRoute'
import textToSpeech from './routes/TextToSpeech'
import transactionRouter from './routes/TransactionRoute'
import vnpayRouter from './routes/VNPayRoute'
import router from './routes/VNPayRoute'
import { initSocket } from "./third/socket/socket";
import { registerEvents } from "./third/socket/events";
import http from 'http'
import { Server } from 'socket.io'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const server = http.createServer(app);
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
app.use(galleryRouter)
app.use(seriesRouter)
app.use(searchRoute)
app.use(textToSpeech)
app.use(transactionRouter)
app.use(router)
// app.use(taggingRouter)



// app.get('/', (_req, res) => {
//   res.send('Socket.IO server is running');
// });

const io = initSocket(server);

// Register events
registerEvents(io);


io.listen(5000)
app.use(handlerExceptionMiddleWare);
setupSwagger(app)
app.listen(PORT, () => {
  console.log("Server is listening at PORT: " + PORT)
})


