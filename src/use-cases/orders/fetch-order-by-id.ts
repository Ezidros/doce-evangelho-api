import { Order } from '@prisma/client'
import { OrdersRepository } from '../../repositories/orders-repository'

interface FetchOrderByIdUseCaseRequest {
  orderId: string
}

interface FetchOrderByIdUseCaseResponse {
  order: Order | null
}

export class FetchOrderByIdUseCase {
  constructor(public orderRepository: OrdersRepository) {}

  async execute({
    orderId,
  }: FetchOrderByIdUseCaseRequest): Promise<FetchOrderByIdUseCaseResponse> {
    const order = await this.orderRepository.fetchById(orderId)

    if (!order) {
      throw new Error()
    }

    return { order }
  }
}
