import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTransactionsRepository } from '../../repositories/in-memory/in-memory-transactions-repository'
import { DeleteTransactionUseCase } from './delete-transaction'

let transactionsRepository: InMemoryTransactionsRepository
let sut: DeleteTransactionUseCase

describe('delete transaction', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new DeleteTransactionUseCase(transactionsRepository)
  })

  it('should be able to update a transaction', async () => {
    const newTransaction = await transactionsRepository.create({
      name: 'Batedeira',
      amount: 240,
      description: 'Batedeira eletrolux vermelha',
      expense: true,
    })

    await sut.execute({
      transactionId: newTransaction.id,
    })

    expect(transactionsRepository.items).toHaveLength(0)
  })
})
