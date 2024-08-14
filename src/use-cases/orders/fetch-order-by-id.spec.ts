import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCakesRepository } from '../../repositories/in-memory/in-memory-cakes-repository'
import { FetchOrderByIdUseCase } from './fetch-order-by-id'
import { InMemoryOrdersRepository } from '../../repositories/in-memory/in-memory-orders-repository'

let cakesRepository: InMemoryCakesRepository

let ordersRepository: InMemoryOrdersRepository
let sut: FetchOrderByIdUseCase

describe('fetch order by id', () => {
  beforeEach(() => {
    cakesRepository = new InMemoryCakesRepository()

    ordersRepository = new InMemoryOrdersRepository()
    sut = new FetchOrderByIdUseCase(ordersRepository)
  })

  it('should be able to fetch an order by id', async () => {
    const cake = await cakesRepository.create({
      id: 'cake-1',
      flavor: 'Chocolate',
      filling: 'Brigadeiro',
      description: 'Um delicioso bolo com recheio de brigadeiro',
      price: 'R$ 8,00',
    })

    await ordersRepository.create({
      id: 'order-id-1',
      clientName: 'John doe',
      benefit: 'R$ 3,00',
      revenue: 'R$ 5,00',
      amount: cake.price,
      cakeId: cake.id,
    })

    const { order } = await sut.execute({
      orderId: 'order-id-1',
    })

    expect(order?.revenue).toEqual('R$ 6,00')
  })
})
