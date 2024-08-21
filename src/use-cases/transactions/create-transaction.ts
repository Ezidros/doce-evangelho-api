import { Transaction } from '@prisma/client'
import { TransactionssRepository } from '../../repositories/transactions-repository'

interface CreateTransactionUseCaseRequest {
  name: string
  description: string | null
  amount: number
  expense: boolean
}

interface CreateTransactionUseCaseResponse {
  transaction: Transaction
}

export class CreateTransactionUseCase {
  constructor(public transactionRepository: TransactionssRepository) {}

  async execute({
    name,
    description,
    amount,
    expense,
  }: CreateTransactionUseCaseRequest): Promise<CreateTransactionUseCaseResponse> {
    const transaction = await this.transactionRepository.create({
      name,
      description: description ?? '',
      amount,
      expense,
    })

    return { transaction }
  }
}
