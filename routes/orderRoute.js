import express from 'express'
import { createOrder, getMyOrders } from '../controllers/orderController.js'
import { requireSignIn } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/orders').post(requireSignIn, createOrder)
router.route('/orders/myorders').get(requireSignIn, getMyOrders)

export default router
