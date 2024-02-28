import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'

import userRouter from './src/routes/usersRoutes.js'
import postRoutes from './src/routes/postRoutes.js'
import friendshipRouter from './src/routes/friendshipRoutes.js'
import notificationRouter from './src/routes/notificationRoutes.js'
import statuRouter from './src/routes/statusRoutes.js'
import photosRouter from './src/routes/photosRoutes.js'
import eventsRouter from './src/routes/eventsRoutes.js'
import commentRouter from './src/routes/commentRouter.js'
<<<<<<< HEAD
=======

>>>>>>> 025315ed0dbd6716dcc31e69f5b267e4b20dc1bc

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
<<<<<<< HEAD
=======

>>>>>>> 025315ed0dbd6716dcc31e69f5b267e4b20dc1bc
app.use('/api',friendshipRouter)
app.use('/api',notificationRouter)
app.use('/api',statuRouter)
app.use('/api',photosRouter)
app.use('/api',eventsRouter)
app.use('/api',commentRouter)


<<<<<<< HEAD
app.use('/api',photosRouter)
app.use('/api',eventsRouter)
app.use('/api',commentRouter)

=======
>>>>>>> 025315ed0dbd6716dcc31e69f5b267e4b20dc1bc


app.listen(PORT,()=>{
    console.log(`This app is running on port ${PORT}`);
})