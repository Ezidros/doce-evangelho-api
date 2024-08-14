import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCakesRepository } from '../../repositories/in-memory/in-memory-cakes-repository'
import { CreateCakeUseCase } from './create-cake'

let cakesRepository: InMemoryCakesRepository
let sut: CreateCakeUseCase

describe('create cakes', () => {
  beforeEach(() => {
    cakesRepository = new InMemoryCakesRepository()
    sut = new CreateCakeUseCase(cakesRepository)
  })

  it('should be able to create a new cake', async () => {
    const { cake } = await sut.execute({
      flavor: 'Chocolate',
      filling: 'Brigadeiro',
      description: 'Um delicioso bolo com recheio de brigadeiro',
      price: 'R$ 8,00',
    })

    expect(cake.id).toEqual(expect.any(String))
  })
})
