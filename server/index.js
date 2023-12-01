import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Database from './utils/db.js'

import { fileURLToPath } from 'url';
import path from 'path';
//router object
import mainRouter from './routes/index.js'
dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database();
const URI = process.env.MONGODB_URI

await db.connectDB( URI )

const PORT  = process.env.PORT 
const app = express()


app.use(cors())

app.use(express.json())

app.use(express.static(path.join(__dirname, 'build')))

app.get('/', ( req, res ) =>{
res.sendFile( path.join(__dirname, 'build', 'index.html'))
})

app.use('/', mainRouter)

app.listen( PORT, () => {
    console.log( `Server running on http://localhost:${PORT}` )
})