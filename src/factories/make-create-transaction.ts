import { PrismaTransactionsRepository } from '../repositories/prisma/prisma-transactions-repository'
import { CreateTransactionUseCase } from '../use-cases/transactions/create-transaction'

export function makeCreateTransaction() {
  const transactionRepository = new PrismaTransactionsRepository()
  const createTransactionRepository = new CreateTransactionUseCase(
    transactionRepository,
  )

  return createTransactionRepository
}
