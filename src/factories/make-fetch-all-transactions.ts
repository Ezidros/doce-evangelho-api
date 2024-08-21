import { PrismaTransactionsRepository } from '../repositories/prisma/prisma-transactions-repository'
import { FetchAllTransactionsUseCase } from '../use-cases/transactions/fetch-all-transactions'

export function makeFetchAllTransactions() {
  const transactionRepository = new PrismaTransactionsRepository()
  const fetchallTransactionsRepository = new FetchAllTransactionsUseCase(
    transactionRepository,
  )

  return fetchallTransactionsRepository
}
