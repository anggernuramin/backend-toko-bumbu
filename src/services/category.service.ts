import { prisma } from '../config/prisma'

export const checkCategoryById = async (id: number) => {
  try {
    const category = await prisma.categories.findUnique({
      where: {
        id
      }
    })
    if (!category) {
      return null
    }
    return category
  } catch (error) {
    console.log('🚀 ~ checkcategoryById ~ error:', error)
  }
}
