import { Cake, Order, Prisma } from '@prisma/client'

export interface OrdersRepository {
  create(data: Prisma.OrderUncheckedCreateInput): Promise<Order>
  update(order: Order): Promise<Order>
  delete(order: Order): Promise<void>

  fetchAllOrders(page?: number, limit?: number): Promise<Order[]>
  fetchById(orderId: string): Promise<Order | null>
  markCakeAsSold(
    cake: Cake,
    data: Prisma.OrderUncheckedCreateInput,
  ): Promise<Order>
}
