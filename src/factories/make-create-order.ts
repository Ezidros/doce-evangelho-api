import { PrismaOrderRepository } from '../repositories/prisma/prisma-orders-repository'
import { CreateOrderUseCase } from '../use-cases/orders/create-order'

export function makeCreateOrder() {
  const orderRepository = new PrismaOrderRepository()
  const createOrderRepository = new CreateOrderUseCase(orderRepository)

  return createOrderRepository
}
