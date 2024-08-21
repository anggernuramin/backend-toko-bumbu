import { Router } from 'express'
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller'

export const ProductRouter: Router = Router()

ProductRouter.get('/', getProducts)
ProductRouter.post('/', createProduct)
ProductRouter.delete('/:id', deleteProduct)
ProductRouter.patch('/:id', updateProduct)
