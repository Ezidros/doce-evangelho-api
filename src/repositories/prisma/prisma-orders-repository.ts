import { Order, Prisma } from '@prisma/client'
import { OrdersRepository } from '../orders-repository'
import { prisma } from '../../lib/prisma'

export class PrismaOrderRepository implements OrdersRepository {
  async fetchAllOrders(): Promise<Order[]> {
    const orders = await prisma.order.findMany()

    return orders
  }

  async fetchById(orderId: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    })

    return order
  }

  async create(data: Prisma.OrderUncheckedCreateInput): Promise<Order> {
    const order = await prisma.order.create({
      data,
    })

    return order
  }

  async update(order: Order): Promise<Order> {
    const updatedOrder = await prisma.order.update({
      where: {
        id: order.id,
      },
      data: order,
    })

    return updatedOrder
  }

  async delete(order: Order): Promise<void> {
    await prisma.order.delete({
      where: {
        id: order.id,
      },
    })
  }
}
