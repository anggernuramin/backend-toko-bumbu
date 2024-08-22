import { Request, Response } from 'express'
import { prisma } from '../config/prisma'
import { checkWalletById } from '../services/wallet.service'
import { walletValidation } from '../validations/wallet.validation'
import { checkCustomerById } from '../services/customer.service'

export const getWallets = async (req: Request, res: Response) => {
  try {
    const wallets = await prisma.wallets.findMany({
      include: {
        customer: {
          select: {
            email: true
          }
        }
      }
    })
    return res.status(200).send({
      success: true,
      statusCode: 200,
      message: 'Success get all wallets',
      data: wallets
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      statusCode: 500,
      message: "Can't get all wallets",
      data: null
    })
  }
}

export const getWalletById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const wallet = checkWalletById(Number(id))
    if (wallet === null) {
      return res.status(404).send({
        success: false,
        statusCode: 404,
        message: 'Wallet not found',
        data: null
      })
    }

    return res.status(200).send({
      success: true,
      statusCode: 200,
      message: 'Success get wallet by id',
      data: wallet
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      statusCode: 500,
      message: "Can't get wallet by id",
      data: null
    })
  }
}

export const createWallet = async (req: Request, res: Response) => {
  try {
    const { error, value } = walletValidation(req.body)
    if (error) {
      return res.status(422).send({
        success: false,
        statusCode: 422,
        message: error.details[0].message,
        data: null
      })
    }

    // check apakah customerId ada di tabel customers
    const customer = await checkCustomerById(value.customerId)
    if (customer === null) {
      return res.status(404).send({
        success: false,
        statusCode: 404,
        message: 'Customer not found',
        data: null
      })
    }

    const wallet = await prisma.wallets.create({
      data: value
    })
    return res.status(200).send({
      success: true,
      statusCode: 200,
      message: 'Success create wallet',
      data: wallet
    })
  } catch (dbError: any) {
    if (dbError.code === 'P2002') {
      // Unique constraint violation
      return res.status(409).send({
        success: false,
        statusCode: 409,
        message: 'Customer Id Tidak boleh duplikat',
        data: null
      })
    }

    return res.status(500).send({
      success: false,
      statusCode: 500,
      message: "Can't create wallet",
      data: null
    })
  }
}

export const updateWallet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const wallet = await checkWalletById(Number(id))
    if (wallet === null) {
      return res.status(404).send({
        success: false,
        statusCode: 404,
        message: 'Wallet not found',
        data: null
      })
    }

    const { error, value } = walletValidation(req.body)
    if (error) {
      return res.status(422).send({
        success: false,
        statusCode: 422,
        message: error.details[0].message,
        data: null
      })
    }

    // check apakah customerId ada di tabel customers
    const customer = await checkCustomerById(value.customerId)
    if (customer === null) {
      return res.status(404).send({
        success: false,
        statusCode: 404,
        message: 'Customer not found',
        data: null
      })
    }

    const updateWallet = await prisma.wallets.update({
      where: {
        id: Number(id)
      },
      data: value
    })
    return res.status(200).send({
      success: true,
      statusCode: 200,
      message: 'Success update wallet',
      data: updateWallet
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

export const deleteWallet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params // id wallet
    const wallet = await checkWalletById(Number(id))
    if (wallet === null) {
      return res.status(404).send({
        success: false,
        statusCode: 404,
        message: 'Wallet not found',
        data: null
      })
    }
    await prisma.wallets.delete({
      where: {
        id: Number(id)
      }
    })
    return res.status(200).send({
      success: true,
      statusCode: 200,
      message: 'Success delete wallet',
      data: null
    })
  } catch (dbError: any) {
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
      message: "Can't delete wallet",
      data: null
    })
  }
}
