import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrdersRepository } from '../../repositories/in-memory/in-memory-orders-repository'
import { InMemoryCakesRepository } from '../../repositories/in-memory/in-memory-cakes-repository'
import { MarkCakeAsSoldUseCase } from './mark-cake-as-sold'

let cakesRepository: InMemoryCakesRepository

let ordersRepository: InMemoryOrdersRepository
let sut: MarkCakeAsSoldUseCase

describe('mark cake as sold', () => {
  beforeEach(() => {
    cakesRepository = new InMemoryCakesRepository()

    ordersRepository = new InMemoryOrdersRepository(cakesRepository)
    sut = new MarkCakeAsSoldUseCase(ordersRepository, cakesRepository)
  })

  it('should be able to create a new order', async () => {
    const cake = await cakesRepository.create({
      flavor: 'Chocolate',
      filling: 'Brigadeiro',
      description: 'Um delicioso bolo com recheio de brigadeiro',
      price: 'R$ 8,00',
    })

    const { order } = await sut.execute({
      cakeId: cake.id,
    })

    expect(order.id).toEqual(expect.any(String))
    expect(cake.isSolded).toEqual(true)
  })
})
