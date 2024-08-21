import { Router } from 'express'
import { createCategory, deleteCategory, getCategory, updateCategory } from '../controllers/category.controller'

export const CategoryRouter: Router = Router()

CategoryRouter.get('/', getCategory)
CategoryRouter.post('/', createCategory)
CategoryRouter.patch('/:id', updateCategory)
CategoryRouter.delete('/:id', deleteCategory)
