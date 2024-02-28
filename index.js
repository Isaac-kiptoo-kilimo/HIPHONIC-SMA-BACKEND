import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'

import userRouter from './src/routes/usersRoutes.js'
import postRoutes from './src/routes/postRoutes.js'
import friendshipRouter from './src/routes/friendshipRoutes.js'
import notificationRouter from './src/routes/notificationRoutes.js'
import statuRouter from './src/routes/statusRoutes.js'

dotenv.config()

const app=express()
var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 
}
const PORT=process.env.PORT || 3500

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors(corsOptions));

app.use('/api',userRouter)
app.use('/api',postRoutes)
app.use('/api',friendshipRouter)
app.use('/api',notificationRouter)
app.use('/api',statuRouter)





app.listen(PORT,()=>{
    console.log(`This app is running on port ${PORT}`);
})