import { Router } from "express"

import { postSignUp } from "../controllers/loginController.js"

const loginRouter = Router()

loginRouter.post("/sign-up", postSignUp)

export default loginRouter
