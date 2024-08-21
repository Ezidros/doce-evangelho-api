import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeCreateTransaction } from '../../factories/make-create-transaction'

export async function createTransactionController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/create/transaction',
    {
      schema: {
        tags: ['transactions'],
        summary: 'Creates a new transaction',
        body: z.object({
          name: z.string(),
          description: z.string().nullable().optional(),
          amount: z.coerce.number(),
          expense: z.boolean(),
        }),
      },
    },
    async (request, reply) => {
      const { name, description, amount, expense } = request.body

      const createTransaction = makeCreateTransaction()

      await createTransaction.execute({
        name,
        amount,
        expense,
        description: description ?? '',
      })

      return reply.status(204).send()
    },
  )
}
