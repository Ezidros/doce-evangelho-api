import { Cake, Order, Prisma } from '@prisma/client'
import { OrdersRepository } from '../orders-repository'
import { prisma } from '../../lib/prisma'

export class PrismaOrderRepository implements OrdersRepository {
  async fetchAllOrders(page: number = 1, limit: number = 10): Promise<Order[]> {
    const skip = (page - 1) * limit

    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    })

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

  async markCakeAsSold(
    cake: Cake,
    data: Prisma.OrderUncheckedCreateInput,
  ): Promise<Order> {
    const newQuantity = cake.quantity! - 1

    const currentCake = await prisma.cake.update({
      where: {
        id: cake.id,
      },
      data: {
        isSolded: cake.isSolded,
        quantity: newQuantity,
      },
      select: {
        id: true,
        price: true,
        isSolded: true,
        quantity: true,
      },
    })

    const totalOrders = await prisma.order.count()

    const revenue = currentCake.price * 0.4
    const benefit = currentCake.price * 0.6

    const order = await prisma.order.create({
      data: {
        cakeId: currentCake.id,
        amount: currentCake.price,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        revenue,
        benefit,
        totalOrders,
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
