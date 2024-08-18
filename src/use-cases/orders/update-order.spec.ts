import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCakesRepository } from '../../repositories/in-memory/in-memory-cakes-repository'
import { UpdateOrderUseCase } from './update-order'
import { InMemoryOrdersRepository } from '../../repositories/in-memory/in-memory-orders-repository'

let cakesRepository: InMemoryCakesRepository

let ordersRepository: InMemoryOrdersRepository
let sut: UpdateOrderUseCase

describe('update order', () => {
  beforeEach(() => {
    cakesRepository = new InMemoryCakesRepository()

    ordersRepository = new InMemoryOrdersRepository(cakesRepository)
    sut = new UpdateOrderUseCase(ordersRepository)
  })

  it('should be able to update order', async () => {
    const cake = await cakesRepository.create({
      flavor: 'Chocolate',
      filling: 'Brigadeiro',
      description: 'Um delicioso bolo com recheio de brigadeiro',
      price: 'R$ 8,00',
    })

    const createdOrder = await ordersRepository.create({
      id: 'order-id-1',
      benefit: 'R$ 3,00',
      revenue: 'R$ 5,00',
      amount: cake.price,
      cakeId: cake.id,
    })

    const { order } = await sut.execute({
      orderId: createdOrder.id,
      benefit: 'R$ 6,00',
      revenue: createdOrder.revenue,
    })

    expect(order.benefit).toEqual('R$ 6,00')
  })
})
