import { PrismaOrderRepository } from '../repositories/prisma/prisma-orders-repository'
import { UpdateOrderUseCase } from '../use-cases/orders/update-order'

export function makeUpdateOrder() {
  const orderRepository = new PrismaOrderRepository()
  const updateOrderRepository = new UpdateOrderUseCase(orderRepository)

  return updateOrderRepository
}
