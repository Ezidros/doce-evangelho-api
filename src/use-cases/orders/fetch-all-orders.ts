import { Order } from '@prisma/client'
import { OrdersRepository } from '../../repositories/orders-repository'

interface FetchAllOrdersUseCaseResponse {
  orders: Order[]
}

export class FetchAllOrdersUseCase {
  constructor(public orderRepository: OrdersRepository) {}

  async execute(
    page: number = 1,
    limit: number = 10,
  ): Promise<FetchAllOrdersUseCaseResponse> {
    const orders = await this.orderRepository.fetchAllOrders(page, limit)

    return { orders }
  }
}
