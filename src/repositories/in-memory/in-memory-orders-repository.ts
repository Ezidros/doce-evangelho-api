import { Order, Prisma } from '@prisma/client'
import { OrdersRepository } from '../orders-repository'

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = []

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

  async create(data: Prisma.OrderUncheckedCreateInput): Promise<Order> {
    const order = {
      id: data.id ?? 'order-id',
      clientName: data.clientName,
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
