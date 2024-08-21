import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { productValidation } from '../validations/product.validation'

const prisma = new PrismaClient()

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.products.findMany()
    return res.status(200).send({
      success: true,
      statusCode: 200,
      message: 'Success get all products',
      data: products
    })
  } catch (error) {
    return res.status(200).send({
      success: false,
      statusCode: 500,
      message: "Can't get all products",
      data: null
    })
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const validation = productValidation(req.body)
    if (!validation.success) {
      return res.status(422).send({
        success: false,
        statusCode: 422,
        message: validation.error.errors[0].message,
        data: null
      })
    }
    const product = await prisma.products.create({
      data: {
        title: validation.data.title,
        description: validation.data.description,
        price: validation.data.price,
        quantity: validation.data.quantity
      }
    })
    return res.status(201).send({
      success: true,
      statusCode: 201,
      message: 'Success create product',
      data: product
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      statusCode: 500,
      message: "Can't create product",
      data: null
    })
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const product = await prisma.products.delete({
      where: {
        id: Number(id)
      }
    })
    return res.status(200).send({
      success: true,
      statusCode: 200,
      message: 'Success delete product',
      data: product
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      statusCode: 500,
      message: "Can't delete product",
      data: null
    })
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, description, price, quantity, category } = req.body
    if (!title || !price || !quantity || !category || !description) {
      return res.status(400).send({
        success: false,
        statusCode: 400,
        message: 'Missing required field',
        data: null
      })
    }
    const product = await prisma.products.update({
      where: {
        id: Number(id)
      },
      data: {
        title,
        description,
        price,
        quantity
      }
    })
    return res.status(200).send({
      success: true,
      statusCode: 200,
      message: 'Success update product',
      data: product
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      statusCode: 500,
      message: "Can't update product",
      data: null
    })
  }
}
