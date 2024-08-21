import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTransactionsRepository } from '../../repositories/in-memory/in-memory-transactions-repository'
import { UpdateTransactionUseCase } from './update-transaction'

let transactionsRepository: InMemoryTransactionsRepository
let sut: UpdateTransactionUseCase

describe('update transaction', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new UpdateTransactionUseCase(transactionsRepository)
  })

  it('should be able to update a transaction', async () => {
    const newTransaction = await transactionsRepository.create({
      name: 'Batedeira',
      amount: 240,
      description: 'Batedeira eletrolux vermelha',
      expense: true,
    })

    const { transaction } = await sut.execute({
      transactionId: newTransaction.id,
      name: 'Batedeira',
      amount: 300,
      description: 'Batedeira eletrolux vermelha',
      expense: true,
    })

    expect(transaction.amount).toEqual(300)
  })
})
