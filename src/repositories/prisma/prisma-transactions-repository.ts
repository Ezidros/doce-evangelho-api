import { Prisma, Transaction } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { TransactionssRepository } from '../transactions-repository'

export class PrismaTransactionsRepository implements TransactionssRepository {
  async fetchAllTransactions(): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany()

    return transactions
  }

  async fetchById(transactionsId: string): Promise<Transaction | null> {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: transactionsId,
      },
    })

    return transaction
  }

  async create(data: Prisma.TransactionCreateInput): Promise<Transaction> {
    const transaction = await prisma.transaction.create({
      data,
    })

    return transaction
  }

  async update(transaction: Transaction): Promise<Transaction> {
    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: transaction.id,
      },
      data: transaction,
    })

    return updatedTransaction
  }

  async delete(transaction: Transaction): Promise<void> {
    await prisma.transaction.delete({
      where: {
        id: transaction.id,
      },
    })
  }
}
