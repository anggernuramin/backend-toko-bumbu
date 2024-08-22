import { prisma } from '../config/prisma'

export const checkProdukById = async (id: number) => {
  try {
    const product = await prisma.products.findUnique({
      where: {
        id
      }
    })
    if (!product) {
      return null
    }
    return product
  } catch (error) {
    console.log('🚀 ~ checkCustomerById ~ error:', error)
  }
}
