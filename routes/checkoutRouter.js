import { Router } from "express"

import { token } from "../middlewares/token.js"
import { deleteCheckout, getCheckout, updateCheckout } from "../controllers/checkoutController.js"

const checkoutRouter = Router()

checkoutRouter.get("/checkout", token, getCheckout)
checkoutRouter.post("/checkout/:id", token, updateCheckout)
checkoutRouter.delete("/checkout/:id", token, deleteCheckout)

export default checkoutRouter
