import { Router } from 'express'
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct
} from '../controllers/product.controller'

export const ProductRouter: Router = Router()

ProductRouter.get('/', getProducts)
ProductRouter.get('/:id', getProductById)
ProductRouter.post('/', createProduct)
ProductRouter.delete('/:id', deleteProduct)
ProductRouter.patch('/:id', updateProduct)
