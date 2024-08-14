import { PrismaOrderRepository } from '../repositories/prisma/prisma-orders-repository'
import { FetchAllOrdersUseCase } from '../use-cases/orders/fetch-all-orders'

export function makeFetchAllOrders() {
  const orderRepository = new PrismaOrderRepository()
  const fetchAllOrders = new FetchAllOrdersUseCase(orderRepository)

  return fetchAllOrders
}
