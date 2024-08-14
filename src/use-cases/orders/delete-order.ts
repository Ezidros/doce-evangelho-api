import { OrdersRepository } from '../../repositories/orders-repository'

interface DeleteOrderUseCaseRequest {
  orderId: string
}

export class DeleteOrderUseCase {
  constructor(public orderRepository: OrdersRepository) {}

  async execute({ orderId }: DeleteOrderUseCaseRequest) {
    const order = await this.orderRepository.fetchById(orderId)

    if (!order) {
      throw new Error()
    }

    await this.orderRepository.delete(order)
  }
}
