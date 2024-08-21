import { Transaction, Prisma } from '@prisma/client'
import { TransactionssRepository } from '../transactions-repository'

export class InMemoryTransactionsRepository implements TransactionssRepository {
  public items: Transaction[] = []

  async fetchAllTransactions(): Promise<Transaction[]> {
    const transactions = this.items

    return transactions
  }

  async fetchById(transactionId: string): Promise<Transaction | null> {
    const transaction = this.items.find(
      (transaction) => transaction.id === transactionId,
    )

    if (!transaction) {
      return null
    }

    return transaction
  }

  async create(data: Prisma.TransactionCreateInput): Promise<Transaction> {
    const transaction = {
      id: data.id ?? 'transactions-id',
      name: data.name,
      description: data.description ?? '',
      amount: data.amount,
      expense: data.expense,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.items.push(transaction)

    return transaction
  }

  async update(transaction: Transaction): Promise<Transaction> {
    const index = this.items.findIndex((item) => item.id === transaction.id)

    if (index >= 0) {
      this.items[index] = transaction
    }

    return transaction
  }

  async delete(transaction: Transaction): Promise<void> {
    const index = this.items.findIndex((item) => item.id === transaction.id)

    this.items.splice(index, 1)
  }
}
