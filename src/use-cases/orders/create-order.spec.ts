import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrderUseCase } from './create-order'
import { InMemoryOrdersRepository } from '../../repositories/in-memory/in-memory-orders-repository'
import { InMemoryCakesRepository } from '../../repositories/in-memory/in-memory-cakes-repository'

let cakesRepository: InMemoryCakesRepository

let ordersRepository: InMemoryOrdersRepository
let sut: CreateOrderUseCase

describe('create order', () => {
  beforeEach(() => {
    cakesRepository = new InMemoryCakesRepository()

    ordersRepository = new InMemoryOrdersRepository(cakesRepository)
    sut = new CreateOrderUseCase(ordersRepository)
  })

  it('should be able to create a new order', async () => {
    const cake = await cakesRepository.create({
      flavor: 'Chocolate',
      filling: 'Brigadeiro',
      description: 'Um delicioso bolo com recheio de brigadeiro',
      price: 8,
    })

    const { order } = await sut.execute({
      benefit: 3,
      revenue: 5,
      amount: cake.price,
      cakeId: cake.id,
    })

    expect(order.id).toEqual(expect.any(String))
  })
})
