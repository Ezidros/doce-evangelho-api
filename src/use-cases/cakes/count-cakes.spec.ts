import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCakesRepository } from '../../repositories/in-memory/in-memory-cakes-repository'
import { CountCakeUseCase } from './count-cakes'

let cakesRepository: InMemoryCakesRepository
let sut: CountCakeUseCase

describe('count cakes', () => {
  beforeEach(() => {
    cakesRepository = new InMemoryCakesRepository()
    sut = new CountCakeUseCase(cakesRepository)
  })

  it('should be able to count cakes by id', async () => {
    const createCake = await cakesRepository.create({
      flavor: 'Chocolate',
      filling: 'Brigadeiro',
      description: 'Um delicioso bolo com recheio de brigadeiro',
      price: 'R$ 8,00',
    })

    const { count } = await sut.execute({
      cakeId: createCake.id,
    })

    expect(count).toEqual(1)
  })
})
