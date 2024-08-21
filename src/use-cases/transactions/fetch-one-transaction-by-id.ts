import { Transaction } from '@prisma/client'
import { TransactionssRepository } from '../../repositories/transactions-repository'

interface FetchTransactionByIdUseCaseRequest {
  transactionId: string
}

interface FetchTransactionByIdUseCaseResponse {
  transaction: Transaction | null
}

export class FetchTransactionByIdUseCase {
  constructor(public transactionRepository: TransactionssRepository) {}

  async execute({
    transactionId,
  }: FetchTransactionByIdUseCaseRequest): Promise<FetchTransactionByIdUseCaseResponse> {
    const transaction =
      await this.transactionRepository.fetchById(transactionId)

    if (!transaction) {
      throw new Error()
    }

    return { transaction }
  }
}
