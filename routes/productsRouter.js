import { Router } from "express"

import { getProducts, postProducts } from "../controllers/productsController.js"

const productsRouter = Router()

productsRouter.get('/products', getProducts)
productsRouter.post('/purchase', postProducts)

export default productsRouter
