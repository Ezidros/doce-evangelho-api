import { PrismaTransactionsRepository } from '../repositories/prisma/prisma-transactions-repository'
import { FetchTransactionByIdUseCase } from '../use-cases/transactions/fetch-one-transaction-by-id'

export function makeFetchOneTransactions() {
  const transactionRepository = new PrismaTransactionsRepository()
  const fetchoneTransactionsRepository = new FetchTransactionByIdUseCase(
    transactionRepository,
  )

  return fetchoneTransactionsRepository
}
