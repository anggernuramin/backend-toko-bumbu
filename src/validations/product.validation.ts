import { z } from 'zod'
import { ProductInterface } from '../interfaces/product.interface'

export const productValidation = (payload: ProductInterface) => {
  const schema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    description: z.string().nullable(),
    price: z.number().min(0, { message: 'Price must be a positive number' }),
    quantity: z.number().int().min(0, { message: 'Quantity must be a non-negative integer' })
  })

  // payload data yang dikirim harus sesuai dengan skema yang telah dibuat dengan package Zod
  return schema.safeParse(payload)
}
