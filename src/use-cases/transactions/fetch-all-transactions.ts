import { Transaction } from '@prisma/client'
import { TransactionssRepository } from '../../repositories/transactions-repository'

interface FetchAllTransactionsUseCaseResponse {
  transactions: Transaction[]
}

export class FetchAllTransactionsUseCase {
  constructor(public transactionRepository: TransactionssRepository) {}

  async execute(): Promise<FetchAllTransactionsUseCaseResponse> {
    const transactions = await this.transactionRepository.fetchAllTransactions()

    return { transactions }
  }
}
