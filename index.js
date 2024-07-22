import express from 'express';
import dotenv from 'dotenv'
import router from './routes/users.route.js';
import videoRoutes from './routes/video.route.js';
import commentsRoutes from './routes/comments.route.js';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';
// dot env configuration
dotenv.config()

// mongodb connection 
import connect from './db_Connection/db_connect.js'

const app = express();



app.use(cookieParser())
app.use(express.json())

// routes
app.use("/api/auth", authRoutes)
app.use("/api/users", router)
app.use("/api/video", videoRoutes)
app.use("/api/comments", commentsRoutes)

app.use((err, req, res, next) => {
  const status = err.status || 5000;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message
  })
})




app.listen(8000, () => {
  //connect to database
  connect()
  console.log(`http://localhost:${8000}`)
})



