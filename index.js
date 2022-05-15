import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import loginRouter from "./routes/loginRouter.js"
import checkoutRouter from "./routes/checkoutRouter.js"

dotenv.config()

// create express
const app = express()
app.use(express.json())
app.use(cors())

// routes
app.use(loginRouter)
app.use(checkoutRouter)

// port
const port = process.env.PORT || 5000
app.listen(port)
