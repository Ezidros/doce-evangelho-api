import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCakesRepository } from '../repositories/in-memory/in-memory-cakes-repository'
import { UpdateCakeUseCase } from './update-cake'

let cakesRepository: InMemoryCakesRepository
let sut: UpdateCakeUseCase

describe('create cakes', () => {
  beforeEach(() => {
    cakesRepository = new InMemoryCakesRepository()
    sut = new UpdateCakeUseCase(cakesRepository)
  })

  it('should be able to create a new cake', async () => {
    const createCake = await cakesRepository.create({
      flavor: 'Chocolate',
      filling: 'Brigadeiro',
      description: 'Um delicioso bolo com recheio de brigadeiro',
      price: 'R$ 8,00',
    })

    const { cake } = await sut.execute({
      cakeId: createCake.id,
      description: createCake.description,
      filling: createCake.filling,
      price: createCake.price,
      flavor: 'Morango',
    })

    expect(cake.flavor).toEqual('Morango')
  })
})
