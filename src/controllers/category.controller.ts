import { Request, Response } from 'express'
import { prisma } from '../config/prisma'
import { categoryValidation } from '../validations/category.vaidation'
import { checkCategoryById } from '../services/category.service'

export const getCategory = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.categories.findMany()
    return res.status(200).send({
      success: true,
      statusCode: 200,
      message: 'Success get all categories',
      data: categories
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      statusCode: 500,
      message: "Can't get all categories",
      data: null
    })
  }
}

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const category = await checkCategoryById(id)

    if (category === null) {
      return res.status(404).send({
        success: false,
        statusCode: 404,
        message: 'category not found',
        data: null
      })
    }

    return res.status(200).send({
      success: true,
      statusCode: 200,
      message: 'Success get by id',
      data: category
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      statusCode: 500,
      message: "Can't get all category",
      data: null
    })
  }
}

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { error, value } = categoryValidation(req.body)
    if (error) {
      return res.status(422).send({
        success: false,
        statusCode: 422,
        message: error.details[0].message,
        data: null
      })
    }

    const category = await prisma.categories.create({
      data: value
    })

    return res.status(201).send({
      success: true,
      statusCode: 201,
      message: 'Success create category',
      data: category
    })
  } catch (dbError: any) {
    // Handle Prisma error karena title diset @unique di database
    if (dbError.code === 'P2002') {
      // Unique constraint violation
      return res.status(409).send({
        success: false,
        statusCode: 409,
        message: 'Category title sudah ada di database',
        data: null
      })
    }

    return res.status(500).send({
      success: false,
      statusCode: 500,
      message: "Can't create category",
      data: null
    })
  }
}

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const category = await checkCategoryById(Number(id))
    if (category === null) {
      return res.status(404).send({
        success: false,
        statusCode: 404,
        message: 'category not found',
        data: null
      })
    }

    const { error, value } = categoryValidation(req.body)
    if (error) {
      return res.status(422).send({
        success: false,
        statusCode: 422,
        message: error.details[0].message,
        data: null
      })
    }

    const newCategory = await prisma.categories.update({
      where: {
        id: Number(id)
      },
      data: value
    })

    return res.status(200).send({
      success: true,
      statusCode: 200,
      message: 'Success update category',
      data: newCategory
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      statusCode: 500,
      message: "Can't update category",
      data: null
    })
  }
}

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const category = await checkCategoryById(Number(id))
    if (category === null) {
      return res.status(404).send({
        success: false,
        statusCode: 404,
        message: 'category not found',
        data: null
      })
    }

    await prisma.categories.delete({
      where: {
        id: Number(id)
      }
    })

    return res.status(200).send({
      success: true,
      statusCode: 200,
      message: 'Success delete category',
      data: null
    })
  } catch (dbError: any) {
    // Handle Prisma dbError specifically for foreign key constraints // artinya foregn key di categories digunakan di dalama table products
    if (dbError.code === 'P2003') {
      // Foreign key constraint failed
      return res.status(400).send({
        success: false,
        statusCode: 400,
        message: 'Cannot delete category. Karena data category masih digunakan di table product.',
        data: null
      })
    }
    return res.status(500).send({
      success: false,
      statusCode: 500,
      message: "Can't delete category",
      data: null
    })
  }
}
