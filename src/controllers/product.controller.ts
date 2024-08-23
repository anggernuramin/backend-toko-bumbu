import { Request, Response } from 'express'
import { productValidation } from '../validations/product.validation'
import { prisma } from '../config/prisma'
import { checkProdukById } from '../services/product.service'
import { checkCategoryById } from '../services/category.service'

export const getProducts = async (req: Request, res: Response) => {
  try {
    // mengampil paramaeter dari request query strin
    // as string (artinya variabel tersebut diubah ke string)
    const page = parseInt(req.query.page as string) || 1 // jika page 0 maka otomastis di set ke 1
    const limit = parseInt(req.query.limit as string) || 10 // jika limit 0 maka otomastis di set ke 10
    const search = (req.query.search as string) || '' // jika search null maka otomastis di set ke ''

    // page: Parameter yang menentukan halaman yang ingin ditampilkan.
    // limit: Parameter yang menentukan jumlah item per halaman.
    // offset: Dihitung berdasarkan page dan limit, digunakan untuk melewati sejumlah item pada query.

    // Menghitung offset untuk pagination
    const offset: number = (page - 1) * limit

    // Mengambil produk dengan pagination dan fulltextsearch
    const where: any = {}
    if (search) {
      // gunakan constrains untuk search agar ketika kosong menampikan semua
      where.title = { contains: search.toLowerCase(), mode: 'insensitive' } // mode insensitive artinya semua huruf di search harus ada di dalam title
    }

    const products = await prisma.products.findMany({
      where,
      include: {
        categories: {
          select: {
            title: true
          }
        }
      },
      skip: offset,
      take: limit
    })

    // Mengitung total jumalh produk hasil search
    const totalProducts = await prisma.products.count({
      // gunakan count untuk menghitung dan agar balikannya number
      where: {
        title: {
          contains: search
        }
      }
    })

    // Menghitung jumlah total halaman dan membulatkan ke atas
    const totalPages = Math.ceil(totalProducts / limit)

    return res.status(200).send({
      success: true,
      statusCode: 200,
      message: 'Success get all products',
      data: products,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalItems: totalProducts,
        itemsPerPage: limit
      }
    })
  } catch (error: any) {
    return res.status(200).send({
      success: false,
      statusCode: 500,
      message: error?.message,
      data: null
    })
  }
}
export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)

    // cek produk by id
    const product = await checkProdukById(id)
    if (product === null) {
      return res.status(404).send({
        success: false,
        statusCode: 404,
        message: 'product not found',
        data: null
      })
    }

    return res.status(200).send({
      success: true,
      statusCode: 200,
      message: 'Success get product by id',
      data: product
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      statusCode: 500,
      message: "Can't get all product",
      data: null
    })
  }
}
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { error, value } = productValidation(req.body)
    if (error) {
      return res.status(422).send({
        success: false,
        statusCode: 422,
        message: error.details[0].message,
        data: null
      })
    }

    // cek category by id karena tabel ini berelasi dengan table categories
    const category = await checkCategoryById(Number(value.categoryId))
    if (category === null) {
      return res.status(404).send({
        success: false,
        statusCode: 404,
        message: 'category not found',
        data: null
      })
    }

    const product = await prisma.products.create({
      data: value
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
    const productId = await checkProdukById(Number(id))

    if (productId === null) {
      return res.status(404).send({
        success: false,
        statusCode: 404,
        message: 'product not found',
        data: null
      })
    }
    await prisma.products.delete({
      where: {
        id: Number(id)
      }
    })
    return res.status(200).send({
      success: true,
      statusCode: 200,
      message: 'Success delete product',
      data: null
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
    const productId = await checkProdukById(Number(id))
    if (productId === null) {
      return res.status(404).send({
        success: false,
        statusCode: 404,
        message: 'product not found',
        data: null
      })
    }

    const { error, value } = productValidation(req.body)
    if (error) {
      return res.status(400).send({
        success: false,
        statusCode: 400,
        message: error.details[0].message,
        data: null
      })
    }

    // ceck category by id karena tabel ini berelasi dengan table categories
    const category = await checkCategoryById(value.categoryId)
    if (category === null) {
      return res.status(404).send({
        success: false,
        statusCode: 404,
        message: 'category not found',
        data: null
      })
    }

    const product = await prisma.products.update({
      where: {
        id: Number(id)
      },
      data: value
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
