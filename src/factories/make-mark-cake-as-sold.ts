import { PrismaCakeRepository } from '../repositories/prisma/prisma-cakes-repository'
import { PrismaOrderRepository } from '../repositories/prisma/prisma-orders-repository'
import { MarkCakeAsSoldUseCase } from '../use-cases/orders/mark-cake-as-sold'

export function makeMarkCakeAsSold() {
  const ordersRepository = new PrismaOrderRepository()
  const cakesRepository = new PrismaCakeRepository()
  const markCakeAsSoldUseCase = new MarkCakeAsSoldUseCase(
    ordersRepository,
    cakesRepository,
  )

  return markCakeAsSoldUseCase
}
