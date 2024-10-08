import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeUpdateOrder } from '../../factories/make-update-order'

export async function updateOrderController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/update/order/:orderId',
    {
      schema: {
        tags: ['orders'],
        summary: 'Updates a new order',
        params: z.object({
          orderId: z.string().uuid(),
        }),
        body: z.object({
          benefit: z.coerce.number(),
          revenue: z.coerce.number(),
        }),
      },
    },
    async (request, reply) => {
      const data = request.body
      const { orderId } = request.params

      const updateOrder = makeUpdateOrder()

      await updateOrder.execute({
        orderId,
        benefit: data.benefit,
        revenue: data.revenue,
      })

      return reply.status(204).send()
    },
  )
}
