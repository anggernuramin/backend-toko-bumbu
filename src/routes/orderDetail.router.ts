import { Router } from 'express'
import {
  createOrderDetail,
  getOrderDetailByOrder,
  getOrderDetailByProduct,
  getOrdersDetail
} from '../controllers/orderDetail.controller'

export const OrderDetailRouter: Router = Router()

OrderDetailRouter.get('/', getOrdersDetail)
OrderDetailRouter.get('/order/:id', getOrderDetailByOrder)
OrderDetailRouter.get('/product/:id', getOrderDetailByProduct)
OrderDetailRouter.post('/', createOrderDetail)
