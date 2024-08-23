import { Request, Response } from 'express'
import { prisma } from '../config/prisma'
import { checkProdukById } from '../services/product.service'
import { orderDetailValidation } from '../validations/orderDetail.validation'
import { checkOrderById } from '../services/order.service'

// Fetch all orders details
export const getOrdersDetail = async (req: Request, res: Response) => {
  try {
    const ordersDetail = await prisma.orders_detail.findMany({
      include: {
        products: true,
        orders: true
      }
    })
    return res.status(200).send({
      success: true,
      statusCode: 200,
      message: 'Success get all orders Detail',
      data: ordersDetail
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

// Fetch order detail by order ID
export const getOrderDetailByOrder = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)

    const order = await checkOrderById(id)
    if (order === null) {
      return res.status(404).send({
        success: false,
        statusCode: 404,
        message: 'Order not found',
        data: null
      })
    }

    const orderDetails = await prisma.orders_detail.findMany({
      where: {
        orderId: id
      },
      include: {
        products: true,
        orders: true
      }
    })

    return res.status(200).send({
      success: true,
      statusCode: 200,
      message: 'Success get order details by order ID',
      data: orderDetails
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

// Fetch order detail by product ID
export const getOrderDetailByProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)

    const product = await checkProdukById(id)
    if (product === null) {
      return res.status(404).send({
        success: false,
        statusCode: 404,
        message: 'Product not found',
        data: null
      })
    }

    const orderDetails = await prisma.orders_detail.findMany({
      where: {
        productId: id
      },
      include: {
        products: true,
        orders: true
      }
    })

    return res.status(200).send({
      success: true,
      statusCode: 200,
      message: 'Success get order details by product ID',
      data: orderDetails
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

// Create order detail
export const createOrderDetail = async (req: Request, res: Response) => {
  try {
    const { error, value } = orderDetailValidation(req.body)
    if (error) {
      return res.status(422).send({
        success: false,
        statusCode: 422,
        message: error.details[0].message,
        data: null
      })
    }

    const product = await checkProdukById(Number(value.productId))
    if (product === null) {
      return res.status(404).send({
        success: false,
        statusCode: 404,
        message: 'Product not found',
        data: null
      })
    }

    const order = await checkOrderById(Number(value.orderId))
    if (order === null) {
      return res.status(404).send({
        success: false,
        statusCode: 404,
        message: 'Order not found',
        data: null
      })
    }

    const orderDetail = await prisma.orders_detail.create({
      data: value
    })
    return res.status(201).send({
      success: true,
      statusCode: 201,
      message: 'Success create order detail',
      data: orderDetail
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

// // Update order detail
// export const updateOrderDetail = async (req: Request, res: Response) => {
//   try {
//     const id = Number(req.params.id)

//     const { error, value } = orderDetailValidation(req.body)
//     if (error) {
//       return res.status(400).send({
//         success: false,
//         statusCode: 400,
//         message: error.details[0].message,
//         data: null
//       })
//     }

//     const product = await checkProdukById(Number(value.productId))
//     if (product === null) {
//       return res.status(404).send({
//         success: false,
//         statusCode: 404,
//         message: 'Product not found',
//         data: null
//       })
//     }

//     const order = await checkOrderById(Number(value.orderId))
//     if (order === null) {
//       return res.status(404).send({
//         success: false,
//         statusCode: 404,
//         message: 'Order not found',
//         data: null
//       })
//     }

//     const orderDetail = await prisma.orders_detail.update({
//       where: {
//         id: Number(id)
//       },
//       data: value
//     })

//     return res.status(200).send({
//       success: true,
//       statusCode: 200,
//       message: 'Success update order detail',
//       data: orderDetail
//     })
//   } catch (error: any) {
//     return res.status(500).send({
//       success: false,
//       statusCode: 500,
//       message: error.message,
//       data: null
//     })
//   }
// }
