import { TransactionssRepository } from '../../repositories/transactions-repository'

interface DeleteTransactionUseCaseRequest {
  transactionId: string
}

export class DeleteTransactionUseCase {
  constructor(public transactionRepository: TransactionssRepository) {}

  async execute({ transactionId }: DeleteTransactionUseCaseRequest) {
    const transaction =
      await this.transactionRepository.fetchById(transactionId)

    if (!transaction) {
      throw new Error()
    }

    await this.transactionRepository.delete(transaction)
  }
}
