import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTransactionsRepository } from '../../repositories/in-memory/in-memory-transactions-repository'
import { CreateTransactionUseCase } from './create-transaction'

let transactionsRepository: InMemoryTransactionsRepository
let sut: CreateTransactionUseCase

describe('create transactions', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new CreateTransactionUseCase(transactionsRepository)
  })

  it('should be able to create a new transaction', async () => {
    const { transaction } = await sut.execute({
      name: 'Batedeira',
      amount: 240,
      description: 'Batedeira eletrolux vermelha',
      expense: true,
    })

    expect(transaction.id).toEqual(expect.any(String))
  })
})
