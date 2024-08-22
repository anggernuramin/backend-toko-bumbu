import Joi from 'joi'
import { InterfaceCustomer } from '../interfaces/customer.interface'

export const customerValidation = (payload: InterfaceCustomer) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().allow('', null) // dengan menambahkan allow null artinya title boleh kosong, karena title dan lain-alin tidak selelu doubah ketika melakukan update
  })

  //   payload data yang dikirim harus sesuai dengan skema yang telah dibuat dengan package Joi
  return schema.validate(payload)
}
