import { Order } from '@prisma/client'
import { OrdersRepository } from '../../repositories/orders-repository'
import { CakesRepository } from '../../repositories/cakes-repository'

interface MarkCakeAsSoldUseCaseRequest {
  cakeId: string
}

interface MarkCakeAsSoldUseCaseResponse {
  order: Order
}

export class MarkCakeAsSoldUseCase {
  constructor(
    public orderRepository: OrdersRepository,
    public cakesRepository: CakesRepository,
  ) {}

  async execute({
    cakeId,
  }: MarkCakeAsSoldUseCaseRequest): Promise<MarkCakeAsSoldUseCaseResponse> {
    const cake = await this.cakesRepository.fetchById(cakeId)

    if (!cake) {
      throw new Error()
    }

    cake.isSolded = true

    await this.cakesRepository.update(cake)

    const revenue = cake.price * 0.4
    const benefit = cake.price * 0.6

    const order = await this.orderRepository.create({
      amount: cake.price,
      cakeId: cake.id,
      benefit,
      revenue,
    })

    return { order }
  }
}
