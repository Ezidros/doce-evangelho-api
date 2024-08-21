import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTransactionsRepository } from '../../repositories/in-memory/in-memory-transactions-repository'
import { FetchAllTransactionsUseCase } from './fetch-all-transactions'

let transactionsRepository: InMemoryTransactionsRepository
let sut: FetchAllTransactionsUseCase

describe('fetch all transactions', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new FetchAllTransactionsUseCase(transactionsRepository)
  })

  it('should be able to create a new transaction', async () => {
    await transactionsRepository.create({
      name: 'Batedeira',
      amount: 240,
      description: 'Batedeira eletrolux vermelha',
      expense: true,
    })

    await transactionsRepository.create({
      name: 'Mixer',
      amount: 150,
      description: 'Mixer tramontina',
      expense: true,
    })

    const { transactions } = await sut.execute()

    expect(transactions).toHaveLength(2)
  })
})
