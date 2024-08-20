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

    ordersRepository = new InMemoryOrdersRepository(cakesRepository)
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
      benefit: 'R$ 3,00',
      revenue: 'R$ 5,00',
      amount: cake.price,
      cakeId: cake.id,
    })

    const { orders } = await sut.execute()

    expect(orders).toHaveLength(1)
  })

  it('should return the correct number of orders per page', async () => {
    const cake = await cakesRepository.create({
      flavor: 'Chocolate',
      filling: 'Brigadeiro',
      description: 'Um delicioso bolo com recheio de brigadeiro',
      price: 'R$ 8,00',
    })

    for (let i = 0; i < 15; i++) {
      await ordersRepository.create({
        benefit: 'R$ 3,00',
        revenue: 'R$ 5,00',
        amount: cake.price,
        cakeId: cake.id,
      })
    }

    // Paginar com limit de 5 por página e verificar se retorna 5 itens
    const { orders: page1Orders } = await sut.execute(1, 5)
    expect(page1Orders).toHaveLength(5)

    // Paginar a segunda página e verificar se retorna mais 5 itens
    const { orders: page2Orders } = await sut.execute(2, 5)
    expect(page2Orders).toHaveLength(5)

    // Paginar a terceira página e verificar se retorna os 5 últimos itens
    const { orders: page3Orders } = await sut.execute(3, 5)
    expect(page3Orders).toHaveLength(5)

    // Paginar além do limite e verificar se retorna 0 itens
    const { orders: page4Orders } = await sut.execute(4, 5)
    expect(page4Orders).toHaveLength(0)
  })
})
