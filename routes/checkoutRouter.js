import { Router } from "express"

import { token } from "../middlewares/token.js"
import { getCheckout } from "../controllers/checkoutController"

const checkoutRouter = Router()

checkoutRouter.get("/checkout", token, getCheckout)

export default checkoutRouter
