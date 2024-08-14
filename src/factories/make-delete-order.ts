import { PrismaOrderRepository } from '../repositories/prisma/prisma-orders-repository'
import { DeleteOrderUseCase } from '../use-cases/orders/delete-order'

export function makeDeleteOrder() {
  const orderRepository = new PrismaOrderRepository()
  const deleteOrderRepository = new DeleteOrderUseCase(orderRepository)

  return deleteOrderRepository
}
