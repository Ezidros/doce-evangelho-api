import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCakesRepository } from '../../repositories/in-memory/in-memory-cakes-repository'
import { DeleteCakeUseCase } from './delete-cake'

let cakesRepository: InMemoryCakesRepository
let sut: DeleteCakeUseCase

describe('create cakes', () => {
  beforeEach(() => {
    cakesRepository = new InMemoryCakesRepository()
    sut = new DeleteCakeUseCase(cakesRepository)
  })

  it('should be able to create a new cake', async () => {
    const createCake = await cakesRepository.create({
      flavor: 'Chocolate',
      filling: 'Brigadeiro',
      description: 'Um delicioso bolo com recheio de brigadeiro',
      price: 8,
    })

    await sut.execute({
      cakeId: createCake.id,
    })

    expect(cakesRepository.items).toHaveLength(0)
  })
})
