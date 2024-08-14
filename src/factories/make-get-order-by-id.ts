import { PrismaOrderRepository } from '../repositories/prisma/prisma-orders-repository'
import { FetchOrderByIdUseCase } from '../use-cases/orders/fetch-order-by-id'

export function makeFetchOrderById() {
  const ordersRepository = new PrismaOrderRepository()
  const fetchOrderById = new FetchOrderByIdUseCase(ordersRepository)

  return fetchOrderById
}
