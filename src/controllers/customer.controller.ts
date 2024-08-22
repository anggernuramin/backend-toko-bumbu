import { Request, Response } from 'express'
import { prisma } from '../config/prisma'
import { customerValidation } from '../validations/customer.validation'
import { checkCustomerById } from '../services/customer.service'

export const getCustomer = async (req: Request, res: Response) => {
  try {
    const customers = await prisma.customers.findMany({
      include: {
        // nama wallet diambil dari nama key saat membuat schema prisma yaitu sebelum menyebutkan nama table
        wallet: true
      }
    })
    return res.status(200).send({
      success: true,
      statusCode: 200,
      message: 'Success get all customers',
      data: customers
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      statusCode: 500,
      message: "Can't get all customers",
      data: null
    })
  }
}

export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const customer = await checkCustomerById(id)

    if (customer === null) {
      return res.status(404).send({
        success: false,
        statusCode: 404,
        message: 'Customer not found',
        data: null
      })
    }

    return res.status(200).send({
      success: true,
      statusCode: 200,
      message: 'Success get by id',
      data: customer
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      statusCode: 500,
      message: "Can't get all customers",
      data: null
    })
  }
}

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const { error, value } = customerValidation(req.body)
    console.log('🚀 ~ createCustomer ~ value:', value)
    if (error) {
      return res.status(422).send({
        success: false,
        statusCode: 422,
        message: error.details[0].message,
        data: null
      })
    }

    const customer = await prisma.customers.create({
      data: value
    })

    return res.status(201).send({
      success: true,
      statusCode: 201,
      message: 'Success create customer',
      data: customer
    })
  } catch (dbError: any) {
    // Handle Prisma error karena title diset @unique di database
    if (dbError.code === 'P2002') {
      // Unique constraint violation
      return res.status(409).send({
        success: false,
        statusCode: 409,
        message: 'Email sudah ada di database',
        data: null
      })
    }

    return res.status(500).send({
      success: false,
      statusCode: 500,
      message: dbError.message,
      data: null
    })
  }
}

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const customer = await checkCustomerById(Number(id))

    if (customer === null) {
      return res.status(404).send({
        success: false,
        statusCode: 404,
        message: 'Customer not found',
        data: null
      })
    }

    const { error, value } = customerValidation(req.body)
    if (error) {
      return res.status(422).send({
        success: false,
        statusCode: 422,
        message: error.details[0].message,
        data: null
      })
    }

    const newCustomer = await prisma.customers.update({
      where: {
        id: Number(id)
      },
      data: value
    })

    return res.status(200).send({
      success: true,
      statusCode: 200,
      message: 'Success update customer',
      data: newCustomer
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      statusCode: 500,
      message: "Can't update customer",
      data: null
    })
  }
}

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const customer = await checkCustomerById(Number(id))
    if (customer === null) {
      return res.status(404).send({
        success: false,
        statusCode: 404,
        message: 'Customer not found',
        data: null
      })
    }

    await prisma.customers.delete({
      where: {
        id: Number(id)
      }
    })

    return res.status(200).send({
      success: true,
      statusCode: 200,
      message: 'Success delete customer',
      data: null
    })
  } catch (dbError: any) {
    // Handle Prisma dbError specifically for foreign key constraints // artinya foregn key di categories digunakan di dalama table products
    if (dbError.code === 'P2003') {
      // Foreign key constraint failed
      return res.status(400).send({
        success: false,
        statusCode: 400,
        message: 'Cannot delete email. Karena data email masih digunakan di table order.',
        data: null
      })
    }
    return res.status(500).send({
      success: false,
      statusCode: 500,
      message: "Can't delete customer",
      data: null
    })
  }
}
