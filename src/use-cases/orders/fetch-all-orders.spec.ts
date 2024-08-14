import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCakesRepository } from '../../repositories/in-memory/in-memory-cakes-repository'
import { FetchAllOrdersUseCase } from './fetch-all-orders'
import { InMemoryOrdersRepository } from '../../repositories/in-memory/in-memory-orders-repository'

let cakesRepository: InMemoryCakesRepository

let ordersRepository: InMemoryOrdersRepository
let sut: FetchAllOrdersUseCase

describe('fetch all orders', () => {
  beforeEach(() => {
    cakesRepository = new InMemoryCakesRepository()

    ordersRepository = new InMemoryOrdersRepository()
    sut = new FetchAllOrdersUseCase(ordersRepository)
  })

  it('should be able to fetch all orders', async () => {
    const cake = await cakesRepository.create({
      flavor: 'Chocolate',
      filling: 'Brigadeiro',
      description: 'Um delicioso bolo com recheio de brigadeiro',
      price: 'R$ 8,00',
    })

    await ordersRepository.create({
      clientName: 'John doe',
      benefit: 'R$ 3,00',
      revenue: 'R$ 5,00',
      amount: cake.price,
      cakeId: cake.id,
    })

    const { orders } = await sut.execute()

    expect(orders).toHaveLength(1)
  })
})
