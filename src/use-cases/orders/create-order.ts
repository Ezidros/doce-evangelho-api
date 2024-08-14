import { Order } from '@prisma/client'
import { OrdersRepository } from '../../repositories/orders-repository'

interface CreateOrderUseCaseRequest {
  clientName: string
  amount: string
  benefit: string
  revenue: string
  cakeId: string
}

interface CreateOrderUseCaseResponse {
  order: Order
}

export class CreateOrderUseCase {
  constructor(public orderRepository: OrdersRepository) {}

  async execute({
    clientName,
    amount,
    benefit,
    revenue,
    cakeId,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const order = await this.orderRepository.create({
      clientName,
      amount,
      benefit,
      revenue,
      cakeId,
    })

    return { order }
  }
}
