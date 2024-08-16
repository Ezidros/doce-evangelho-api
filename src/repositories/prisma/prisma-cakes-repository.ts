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

  async countCakes(cakeId: string): Promise<number> {
    const cake = await prisma.cake.count({
      where: {
        id: cakeId,
      },
    })

    return cake
  }

  async addCakeById(cakeId: string): Promise<number> {
    const cake = await prisma.cake.count({
      where: {
        id: cakeId,
      },
    })

    return cake + 1
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
