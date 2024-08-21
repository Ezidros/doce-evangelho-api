import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeUpdateTransaction } from '../../factories/make-update-transaction'

export async function updateTransactionController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/update/transaction/:transactionId',
    {
      schema: {
        tags: ['transactions'],
        summary: 'Update a transaction',
        params: z.object({
          transactionId: z.string().uuid(),
        }),
        body: z.object({
          name: z.string(),
          description: z.string().nullable().optional(),
          amount: z.coerce.number(),
          expense: z.boolean(),
        }),
      },
    },
    async (request, reply) => {
      const { transactionId } = request.params
      const { name, description, amount, expense } = request.body

      const updateTransaction = makeUpdateTransaction()

      await updateTransaction.execute({
        transactionId,
        name,
        amount,
        expense,
        description: description ?? '',
      })

      return reply.status(201).send()
    },
  )
}
