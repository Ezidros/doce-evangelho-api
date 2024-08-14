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

    ordersRepository = new InMemoryOrdersRepository()
    sut = new DeleteOrderUseCase(ordersRepository)
  })

  it('should be able to delete an order', async () => {
    const cake = await cakesRepository.create({
      flavor: 'Chocolate',
      filling: 'Brigadeiro',
      description: 'Um delicioso bolo com recheio de brigadeiro',
      price: 'R$ 8,00',
    })

    const order = await ordersRepository.create({
      clientName: 'John doe',
      benefit: 'R$ 3,00',
      revenue: 'R$ 5,00',
      amount: cake.price,
      cakeId: cake.id,
    })

    await sut.execute({
      orderId: order.id,
    })

    expect(ordersRepository.items).toHaveLength(0)
  })
})
