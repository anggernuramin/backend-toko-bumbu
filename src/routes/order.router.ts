import { Router } from 'express'
import { createOrder, deleteOrder, getOrderById, getOrders, updateOrder } from '../controllers/order.controller'

export const OrderRouter: Router = Router()

OrderRouter.get('/', getOrders)
OrderRouter.get('/:id', getOrderById)
OrderRouter.post('/', createOrder)
OrderRouter.patch('/:id', updateOrder)
OrderRouter.delete('/:id', deleteOrder)
