import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCakesRepository } from '../../repositories/in-memory/in-memory-cakes-repository'
import { AddCakeUseCase } from './add-cakes'

let cakesRepository: InMemoryCakesRepository
let sut: AddCakeUseCase

describe('add new cakes', () => {
  beforeEach(() => {
    cakesRepository = new InMemoryCakesRepository()
    sut = new AddCakeUseCase(cakesRepository)
  })

  it('should be able to add a new cake to the total count', async () => {
    const createCake = await cakesRepository.create({
      flavor: 'Chocolate',
      filling: 'Brigadeiro',
      description: 'Um delicioso bolo com recheio de brigadeiro',
      price: 8,
    })

    const { cake } = await sut.execute({
      cakeId: createCake.id,
      quantity: 10,
    })

    expect(cake.quantity).toEqual(10)
  })
})
