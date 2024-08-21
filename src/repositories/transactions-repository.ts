import { Transaction, Prisma } from '@prisma/client'

export interface TransactionssRepository {
  fetchAllTransactions(): Promise<Transaction[]>
  fetchById(transactionsId: string): Promise<Transaction | null>

  create(data: Prisma.TransactionCreateInput): Promise<Transaction>
  update(transactions: Transaction): Promise<Transaction>
  delete(transactions: Transaction): Promise<void>
}
