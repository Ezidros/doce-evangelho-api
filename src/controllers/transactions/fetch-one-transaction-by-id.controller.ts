import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeFetchOneTransactions } from '../../factories/make-fetch-one-transaction-by-id'

export async function getTransactionByIdController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/fetch/transaction/:transactionId',
    {
      schema: {
        tags: ['transactions'],
        summary: 'Update transaction data',
        params: z.object({
          transactionId: z.string().uuid(),
        }),
      },
    },
    async (request) => {
      const { transactionId } = request.params

      const transactionById = makeFetchOneTransactions()

      const { transaction } = await transactionById.execute({
        transactionId,
      })

      return { transaction }
    },
  )
}
