import express from 'express'
const app = express()
import connectDB from './db/connect.js'
import jobsRoute from './routes/jobs.js'
import authRoute from './routes/auth.js'
import helmet from 'helmet'
import cors from 'cors'
import xss from 'xss-clean'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import authentication from './middlewares/auth.js'
dotenv.config()

// middlewares
app.set('trust proxy', 1)
app.use(rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

// routes
app.use('/api/v1/jobs', authentication, jobsRoute)
app.use('/api/v1/auth', authRoute)

// start
const port = process.env.PORT || 5000
const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log('starting server...')
        })
    } catch (error) {
        console.log(error);
    }
}

start()