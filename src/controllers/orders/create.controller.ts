import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeCreateOrder } from '../../factories/make-create-order'

export async function createOrderController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/create/order/:cakeId',
    {
      schema: {
        tags: ['orders'],
        summary: 'Creates a new order',
        params: z.object({
          cakeId: z.string().uuid(),
        }),
        body: z.object({
          amount: z.coerce.number(),
          benefit: z.coerce.number(),
          revenue: z.coerce.number(),
        }),
      },
    },
    async (request, reply) => {
      const data = request.body
      const { cakeId } = request.params

      const createOrder = makeCreateOrder()

      await createOrder.execute({
        cakeId,
        amount: data.amount,
        benefit: data.benefit,
        revenue: data.revenue,
      })

      return reply.status(201).send()
    },
  )
}
