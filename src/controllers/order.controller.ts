import { Request, Response } from 'express'
import { prisma } from '../config/prisma'
import { checkOrderById } from '../services/order.service'
import { orderValidation } from '../validations/order.validation'

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.orders.findMany()
    return res.status(200).send({
      success: true,
      statusCode: 200,
      message: 'Success get all orders',
      data: orders
    })
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      statusCode: 500,
      message: error.message,
      data: null
    })
  }
}

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const order = await checkOrderById(id)

    if (order === null) {
      return res.status(404).send({
        success: false,
        statusCode: 404,
        message: 'order not found',
        data: null
      })
    }

    return res.status(200).send({
      success: true,
      statusCode: 200,
      message: 'Success get by id',
      data: order
    })
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      statusCode: 500,
      message: error.message,
      data: null
    })
  }
}

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { error, value } = orderValidation(req.body)
    if (error) {
      return res.status(422).send({
        success: false,
        statusCode: 422,
        message: error.details[0].message,
        data: null
      })
    }

    const order = await prisma.orders.create({
      data: value
    })

    return res.status(201).send({
      success: true,
      statusCode: 201,
      message: 'Success create order',
      data: order
    })
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      statusCode: 500,
      message: error?.message,
      data: null
    })
  }
}

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const order = await checkOrderById(Number(id))
    if (order === null) {
      return res.status(404).send({
        success: false,
        statusCode: 404,
        message: 'order not found',
        data: null
      })
    }

    const { error, value } = orderValidation(req.body)
    if (error) {
      return res.status(422).send({
        success: false,
        statusCode: 422,
        message: error.details[0].message,
        data: null
      })
    }

    const updateOrder = await prisma.orders.update({
      where: {
        id: Number(id)
      },
      data: value
    })

    return res.status(200).send({
      success: true,
      statusCode: 200,
      message: 'Success update order',
      data: updateOrder
    })
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      statusCode: 500,
      message: error.message,
      data: null
    })
  }
}

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const order = await checkOrderById(Number(id))
    if (order === null) {
      return res.status(404).send({
        success: false,
        statusCode: 404,
        message: 'order not found',
        data: null
      })
    }

    await prisma.orders.delete({
      where: {
        id: Number(id)
      }
    })

    return res.status(200).send({
      success: true,
      statusCode: 200,
      message: 'Success delete order',
      data: null
    })
  } catch (dbError: any) {
    // Handle Prisma dbError specifically for foreign key constraints // artinya foregn key di categories digunakan di dalama table products
    if (dbError.code === 'P2003') {
      // Foreign key constraint failed
      return res.status(400).send({
        success: false,
        statusCode: 400,
        message: 'Cannot delete order. Karena data category masih digunakan di table product.',
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
