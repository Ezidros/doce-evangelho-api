import { Transaction } from '@prisma/client'
import { TransactionssRepository } from '../../repositories/transactions-repository'

interface UpdateTransactionUseCaseRequest {
  transactionId: string
  name: string
  description: string | null
  amount: number
  expense: boolean
}

interface UpdateTransactionUseCaseResponse {
  transaction: Transaction
}

export class UpdateTransactionUseCase {
  constructor(public transactionRepository: TransactionssRepository) {}

  async execute({
    transactionId,
    name,
    description,
    amount,
    expense,
  }: UpdateTransactionUseCaseRequest): Promise<UpdateTransactionUseCaseResponse> {
    const transaction =
      await this.transactionRepository.fetchById(transactionId)

    if (!transaction) {
      throw new Error()
    }

    transaction.name = name
    transaction.amount = amount
    transaction.description = description ?? ''
    transaction.expense = expense

    await this.transactionRepository.update(transaction)

    return { transaction }
  }
}
