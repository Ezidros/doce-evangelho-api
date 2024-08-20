import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCakesRepository } from '../../repositories/in-memory/in-memory-cakes-repository'
import { UpdateCakeUseCase } from './update-cake'

let cakesRepository: InMemoryCakesRepository
let sut: UpdateCakeUseCase

describe('update cakes', () => {
  beforeEach(() => {
    cakesRepository = new InMemoryCakesRepository()
    sut = new UpdateCakeUseCase(cakesRepository)
  })

  it('should be able to update a cake', async () => {
    const createCake = await cakesRepository.create({
      flavor: 'Chocolate',
      filling: 'Brigadeiro',
      description: 'Um delicioso bolo com recheio de brigadeiro',
      price: 8,
    })

    const { cake } = await sut.execute({
      cakeId: createCake.id,
      description: createCake.description,
      filling: createCake.filling,
      quantity: createCake.quantity,
      price: createCake.price,
      flavor: 'Morango',
    })

    expect(cake.flavor).toEqual('Morango')
  })
})
