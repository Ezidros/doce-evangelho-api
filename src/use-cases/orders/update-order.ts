import { Order } from '@prisma/client'
import { OrdersRepository } from '../../repositories/orders-repository'

interface UpdateOrderUseCaseRequest {
  orderId: string
  benefit: number
  revenue: number
}

interface UpdateOrderUseCaseResponse {
  order: Order
}

export class UpdateOrderUseCase {
  constructor(public orderRepository: OrdersRepository) {}

  async execute({
    benefit,
    orderId,
    revenue,
  }: UpdateOrderUseCaseRequest): Promise<UpdateOrderUseCaseResponse> {
    const order = await this.orderRepository.fetchById(orderId)

    if (!order) {
      throw new Error()
    }

    order.benefit = benefit
    order.revenue = revenue

    await this.orderRepository.update(order)

    return { order }
  }
}
