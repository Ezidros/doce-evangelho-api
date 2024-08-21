import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { makeFetchAllTransactions } from '../../factories/make-fetch-all-transactions'

export async function fetchAllTransactionsController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/fetch/transactions',
    {
      schema: {
        tags: ['transactions'],
        summary: 'Fetch all transactions',
      },
    },
    async () => {
      const fetchAllTransactions = makeFetchAllTransactions()

      const { transactions } = await fetchAllTransactions.execute()

      return { transactions }
    },
  )
}
