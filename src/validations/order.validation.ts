import Joi from 'joi'
import { OrderInterface } from '../interfaces/order.interface'

export const orderValidation = (payload: OrderInterface) => {
  const schema = Joi.object({
    total: Joi.number().required()
  })

  return schema.validate(payload)
}
