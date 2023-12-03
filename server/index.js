import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Database from './utils/db.js'

//router object
import mainRouter from './routes/index.js'
dotenv.config()

const db = new Database();
const URI = process.env.MONGODB_URI

await db.connectDB( URI )

const PORT  = process.env.PORT 
const app = express()


app.use(cors())

app.use(express.json())


app.use('/', mainRouter)



app.listen( PORT, () => {
    console.log( `Server running on http://localhost:${PORT}` )
})