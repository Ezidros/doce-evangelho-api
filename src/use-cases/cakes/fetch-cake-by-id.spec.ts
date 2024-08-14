import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCakesRepository } from '../../repositories/in-memory/in-memory-cakes-repository'
import { FetchCakeByIdUseCase } from './fetch-cake-by-id'

let cakesRepository: InMemoryCakesRepository
let sut: FetchCakeByIdUseCase

describe('fetch cake by id', () => {
  beforeEach(() => {
    cakesRepository = new InMemoryCakesRepository()
    sut = new FetchCakeByIdUseCase(cakesRepository)
  })

  it('should be able to create a new cake', async () => {
    await cakesRepository.create({
      id: 'cake-1',
      flavor: 'Chocolate',
      filling: 'Brigadeiro',
      description: 'Um delicioso bolo com recheio de brigadeiro',
      price: 'R$ 8,00',
    })

    await cakesRepository.create({
      id: 'cake-2',
      flavor: 'Maracuja',
      filling: 'Chocolate',
      description: 'Um delicioso bolo de maracuja com recheio de chocolate',
      price: 'R$ 10,00',
    })

    const { cake } = await sut.execute({
      cakeId: 'cake-2',
    })

    expect(cake?.flavor).toEqual('Maracuja')
  })
})
