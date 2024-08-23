import Joi from 'joi'
import { OrdersDetailInterface } from '../interfaces/ordersDetail.interface'

export const orderDetailValidation = (payload: OrdersDetailInterface) => {
  const schema = Joi.object({
    productId: Joi.number().required(),
    orderId: Joi.number().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required()
  })

  return schema.validate(payload)
}
