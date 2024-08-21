import Joi from 'joi'
import { ProductInterface } from '../interfaces/product.interface'

export const productValidation = (payload: ProductInterface) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow('', null), // dengan menambahkan allow null artinya title boleh kosong, karena title dan lain-alin tidak selelu doubah ketika melakukan update
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    categoryId: Joi.number().required()
  })

  //   payload data yang dikirim harus sesuai dengan skema yang telah dibuat dengan package Joi
  return schema.validate(payload)
}
