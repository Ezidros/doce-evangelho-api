import { Order } from '@prisma/client'
import { OrdersRepository } from '../../repositories/orders-repository'

interface UpdateOrderUseCaseRequest {
  orderId: string
  clientName: string
  benefit: string
  revenue: string
}

interface UpdateOrderUseCaseResponse {
  order: Order
}

export class UpdateOrderUseCase {
  constructor(public orderRepository: OrdersRepository) {}

  async execute({
    clientName,
    benefit,
    orderId,
    revenue,
  }: UpdateOrderUseCaseRequest): Promise<UpdateOrderUseCaseResponse> {
    const order = await this.orderRepository.fetchById(orderId)

    if (!order) {
      throw new Error()
    }

    order.clientName = clientName
    order.benefit = benefit
    order.revenue = revenue

    await this.orderRepository.update(order)

    return { order }
  }
}
