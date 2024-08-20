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
      price: 8,
    })

    const createdOrder = await ordersRepository.create({
      id: 'order-id-1',
      benefit: 3,
      revenue: 5,
      amount: cake.price,
      cakeId: cake.id,
    })

    const { order } = await sut.execute({
      orderId: createdOrder.id,
      benefit: 6,
      revenue: createdOrder.revenue,
    })

    expect(order.benefit).toEqual(6)
  })
})
