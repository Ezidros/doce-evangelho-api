import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCakesRepository } from '../../repositories/in-memory/in-memory-cakes-repository'
import { FetchAllCakesUseCase } from './fetch-all-cakes'

let cakesRepository: InMemoryCakesRepository
let sut: FetchAllCakesUseCase

describe('fetch all cakes', () => {
  beforeEach(() => {
    cakesRepository = new InMemoryCakesRepository()
    sut = new FetchAllCakesUseCase(cakesRepository)
  })

  it('should be able to create a new cake', async () => {
    await cakesRepository.create({
      flavor: 'Chocolate',
      filling: 'Brigadeiro',
      description: 'Um delicioso bolo com recheio de brigadeiro',
      price: 'R$ 8,00',
    })

    await cakesRepository.create({
      flavor: 'Maracuja',
      filling: 'Chocolate',
      description: 'Um delicioso bolo de maracuja com recheio de chocolate',
      price: 'R$ 10,00',
    })

    const { cakes } = await sut.execute()

    expect(cakes).toHaveLength(2)
  })
})
