import express from 'express'
import { createOrder } from '../controllers/orderController.js'

const router = express.Router()

router.route('/orders').post(createOrder)

export default router
