import { prisma } from '../config/prisma'

export const checkWalletById = async (id: number) => {
  try {
    const wallet = await prisma.wallets.findUnique({
      where: {
        id
      }
    })
    if (!wallet) {
      return null
    }
    return wallet
  } catch (error) {
    console.log('🚀 ~ checkWalletById ~ error:', error)
  }
}
