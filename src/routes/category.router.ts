import { Router } from 'express'
import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategoryById,
  updateCategory
} from '../controllers/category.controller'

export const CategoryRouter: Router = Router()

CategoryRouter.get('/', getCategory)
CategoryRouter.get('/:id', getCategoryById)
CategoryRouter.post('/', createCategory)
CategoryRouter.patch('/:id', updateCategory)
CategoryRouter.delete('/:id', deleteCategory)
