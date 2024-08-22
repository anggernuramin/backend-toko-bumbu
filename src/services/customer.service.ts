import { prisma } from '../config/prisma'

export const checkCustomerById = async (id: number) => {
  try {
    const customer = await prisma.customers.findUnique({
      where: {
        id
      }
    })
    if (!customer) {
      return null
    }
    return customer
  } catch (error) {
    console.log('🚀 ~ checkCustomerById ~ error:', error)
  }
}
