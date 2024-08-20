import { Order } from '@prisma/client'
import { OrdersRepository } from '../../repositories/orders-repository'

interface CreateOrderUseCaseRequest {
  amount: number
  benefit: number
  revenue: number
  cakeId: string
}

interface CreateOrderUseCaseResponse {
  order: Order
}

export class CreateOrderUseCase {
  constructor(public orderRepository: OrdersRepository) {}

  async execute({
    amount,
    benefit,
    revenue,
    cakeId,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const order = await this.orderRepository.create({
      amount,
      benefit,
      revenue,
      cakeId,
    })

    return { order }
  }
}
