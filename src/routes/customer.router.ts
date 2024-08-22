import { Router } from 'express'
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  updateCustomer,
  getCustomerById
} from '../controllers/customer.controller'

export const CustomerRouter: Router = Router()

CustomerRouter.get('/', getCustomer)
CustomerRouter.get('/:id', getCustomerById)
CustomerRouter.post('/', createCustomer)
CustomerRouter.patch('/:id', updateCustomer)
CustomerRouter.delete('/:id', deleteCustomer)
