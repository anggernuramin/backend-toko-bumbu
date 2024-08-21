import Joi from 'joi'
import { CategoryInterface } from '../interfaces/category.interface'

export const categoryValidation = (payload: CategoryInterface) => {
  const schema = Joi.object({
    title: Joi.string().required()
  })
  return schema.validate(payload)
}
