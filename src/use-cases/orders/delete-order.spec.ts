import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCakesRepository } from '../../repositories/in-memory/in-memory-cakes-repository'
import { DeleteOrderUseCase } from './delete-order'
import { InMemoryOrdersRepository } from '../../repositories/in-memory/in-memory-orders-repository'

let cakesRepository: InMemoryCakesRepository

let ordersRepository: InMemoryOrdersRepository
let sut: DeleteOrderUseCase

describe('delete orders', () => {
  beforeEach(() => {
    cakesRepository = new InMemoryCakesRepository()

    ordersRepository = new InMemoryOrdersRepository(cakesRepository)
    sut = new DeleteOrderUseCase(ordersRepository)
  })

  it('should be able to delete an order', async () => {
    const cake = await cakesRepository.create({
      flavor: 'Chocolate',
      filling: 'Brigadeiro',
      description: 'Um delicioso bolo com recheio de brigadeiro',
      price: 8,
    })

    const order = await ordersRepository.create({
      benefit: 3,
      revenue: 5,
      amount: cake.price,
      cakeId: cake.id,
    })

    await sut.execute({
      orderId: order.id,
    })

    expect(ordersRepository.items).toHaveLength(0)
  })
})
