import express from "express"
import cors from "cors"
import { ObjectId } from "mongodb"
import db from "./db.js"
import dotenv from "dotenv"

import loginRouter from "./routes/loginRouter.js"
import productsRouter from "./routes/productsRouter.js"

dotenv.config()

// create express
const app = express()
app.use(express.json())
app.use(cors())

// routes
app.use(loginRouter)
app.use(productsRouter)

// port
const port = process.env.PORT || 5000
app.listen(port)
