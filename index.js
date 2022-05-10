import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

// create express
const app = express()
app.use(express.json())
app.use(cors())

// port
const port = process.env.PORT || 5000
app.listen(port)
