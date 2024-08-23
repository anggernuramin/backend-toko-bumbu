import { prisma } from '../config/prisma'

export const checkOrderById = async (id: number) => {
  try {
    const order = await prisma.orders.findUnique({
      where: {
        id
      }
    })
    if (!order) {
      return null
    }
    return order
  } catch (error) {
    console.log('🚀 ~ checkorderById ~ error:', error)
  }
}
