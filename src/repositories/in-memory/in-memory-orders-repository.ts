import { Cake, Order, Prisma } from '@prisma/client'
import { OrdersRepository } from '../orders-repository'
import { InMemoryCakesRepository } from './in-memory-cakes-repository'

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = []

  constructor(private cakesRepository: InMemoryCakesRepository) {}

  async fetchAllOrders(): Promise<Order[]> {
    const orders = this.items

    return orders
  }

  async fetchById(orderId: string): Promise<Order | null> {
    const order = this.items.find((order) => order.id === orderId)

    if (!order) {
      return null
    }

    return order
  }

  async markCakeAsSold(
    cake: Cake,
    data: Prisma.OrderUncheckedCreateInput,
  ): Promise<Order> {
    const currentCake = await this.cakesRepository.fetchById(cake.id)

    if (!currentCake) {
      throw new Error()
    }

    const soldCake = await this.cakesRepository.update({
      isSolded: true,
      id: currentCake?.id,
      description: currentCake?.description,
      flavor: currentCake?.flavor,
      filling: currentCake?.filling,
      isSpecialFlavor: currentCake?.isSpecialFlavor,
      price: currentCake?.price,
      quantity: currentCake?.quantity,
      createdAt: currentCake?.createdAt,
      updatedAt: currentCake?.updatedAt,
    })

    const revenue = Number(soldCake.price) * 0.4
    const benefit = Number(soldCake.price) * 0.6

    const order = {
      id: data.id ?? 'order-id',
      amount: soldCake.price,
      benefit: benefit.toString(),
      revenue: revenue.toString(),
      cakeId: soldCake.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(order)

    return order
  }

  async create(data: Prisma.OrderUncheckedCreateInput): Promise<Order> {
    const order = {
      id: data.id ?? 'order-id',
      amount: data.amount,
      benefit: data.benefit,
      revenue: data.revenue,
      cakeId: data.cakeId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(order)

    return order
  }

  async update(order: Order): Promise<Order> {
    const index = this.items.findIndex((item) => item.id === order.id)

    if (index >= 0) {
      this.items[index] = order
    }

    return order
  }

  async delete(order: Order): Promise<void> {
    const index = this.items.findIndex((item) => item.id === order.id)

    this.items.splice(index, 1)
  }
}
