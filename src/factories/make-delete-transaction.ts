import { PrismaTransactionsRepository } from '../repositories/prisma/prisma-transactions-repository'
import { DeleteTransactionUseCase } from '../use-cases/transactions/delete-transaction'

export function makeDeleteTransaction() {
  const transactionRepository = new PrismaTransactionsRepository()
  const deleteTransactionRepository = new DeleteTransactionUseCase(
    transactionRepository,
  )

  return deleteTransactionRepository
}
