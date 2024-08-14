import { Order } from '@prisma/client'
import { OrdersRepository } from '../../repositories/orders-repository'

interface FetchAllOrdersUseCaseResponse {
  orders: Order[]
}

export class FetchAllOrdersUseCase {
  constructor(public orderRepository: OrdersRepository) {}

  async execute(): Promise<FetchAllOrdersUseCaseResponse> {
    const orders = await this.orderRepository.fetchAllOrders()

    return { orders }
  }
}
