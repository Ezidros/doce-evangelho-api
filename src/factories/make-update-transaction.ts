import { PrismaTransactionsRepository } from '../repositories/prisma/prisma-transactions-repository'
import { UpdateTransactionUseCase } from '../use-cases/transactions/update-transaction'

export function makeUpdateTransaction() {
  const transactionRepository = new PrismaTransactionsRepository()
  const updateTransactionRepository = new UpdateTransactionUseCase(
    transactionRepository,
  )

  return updateTransactionRepository
}
