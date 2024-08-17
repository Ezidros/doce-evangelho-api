import { Cake, Prisma } from '@prisma/client'
import { CakesRepository } from '../cakes-repository'
import { prisma } from '../../lib/prisma'

export class PrismaCakeRepository implements CakesRepository {
  async fetchAllCakes(): Promise<Cake[]> {
    const cakes = await prisma.cake.findMany()

    return cakes
  }

  async fetchById(cakeId: string): Promise<Cake | null> {
    const cake = await prisma.cake.findUnique({
      where: {
        id: cakeId,
      },
    })

    return cake
  }

  async addCakeById(cake: Cake): Promise<number | null> {
    const quanityCake = await prisma.cake.update({
      select: {
        quantity: true,
      },
      where: {
        id: cake.id,
      },
      data: {
        quantity: cake.quantity,
      },
    })

    return quanityCake.quantity!
  }

  async create(data: Prisma.CakeCreateInput): Promise<Cake> {
    const cake = await prisma.cake.create({
      data,
    })

    return cake
  }

  async update(cake: Cake): Promise<Cake> {
    const updatedCake = await prisma.cake.update({
      where: {
        id: cake.id,
      },
      data: cake,
    })

    return updatedCake
  }

  async delete(cake: Cake): Promise<void> {
    await prisma.cake.delete({
      where: {
        id: cake.id,
      },
    })
  }
}
