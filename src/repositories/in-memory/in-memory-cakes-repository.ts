import { Cake, Prisma } from '@prisma/client'
import { CakesRepository } from '../cakes-repository'

export class InMemoryCakesRepository implements CakesRepository {
  public items: Cake[] = []

  async fetchAllCakes(): Promise<Cake[]> {
    const cakes = this.items

    return cakes
  }

  async fetchById(cakeId: string): Promise<Cake | null> {
    const cake = this.items.find((cake) => cake.id === cakeId)

    if (!cake) {
      return null
    }

    return cake
  }

  async countCakes(cakeId: string): Promise<number> {
    return this.items.filter((cake) => cake.id === cakeId).length
  }

  async addCakeById(cakeId: string): Promise<number> {
    const cakes = this.items.filter((cake) => cake.id === cakeId).length

    return cakes + 1
  }

  async create(data: Prisma.CakeCreateInput): Promise<Cake> {
    const cake = {
      id: data.id ?? 'cake-id',
      flavor: data.flavor,
      filling: data.filling,
      description: data.description,
      price: data.price,
      isSpecialFlavor: data.isSpecialFlavor ?? false,
      isSolded: data.isSolded ?? false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(cake)

    return cake
  }

  async update(cake: Cake): Promise<Cake> {
    const index = this.items.findIndex((item) => item.id === cake.id)

    if (index >= 0) {
      this.items[index] = cake
    }

    return cake
  }

  async delete(cake: Cake): Promise<void> {
    const index = this.items.findIndex((item) => item.id === cake.id)

    this.items.splice(index, 1)
  }
}
