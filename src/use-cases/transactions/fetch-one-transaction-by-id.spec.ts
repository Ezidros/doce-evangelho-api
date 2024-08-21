import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTransactionsRepository } from '../../repositories/in-memory/in-memory-transactions-repository'
import { FetchTransactionByIdUseCase } from './fetch-one-transaction-by-id'

let transactionsRepository: InMemoryTransactionsRepository
let sut: FetchTransactionByIdUseCase

describe('fetch one transaction by id', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new FetchTransactionByIdUseCase(transactionsRepository)
  })

  it('should be able to create a new transaction', async () => {
    await transactionsRepository.create({
      id: 'transaction-1',
      name: 'Batedeira',
      amount: 240,
      description: 'Batedeira eletrolux vermelha',
      expense: true,
    })

    await transactionsRepository.create({
      id: 'transaction-2',
      name: 'Mixer',
      amount: 150,
      description: 'Mixer tramontina',
      expense: true,
    })

    const { transaction } = await sut.execute({
      transactionId: 'transaction-1',
    })

    expect(transaction?.id).toEqual('transaction-1')
  })
})
