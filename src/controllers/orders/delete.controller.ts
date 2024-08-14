import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeDeleteOrder } from '../../factories/make-delete-order'

export async function deleteOrderController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/delete/order/:orderId',
    {
      schema: {
        tags: ['orders'],
        summary: 'Delete a new order',
        params: z.object({
          orderId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { orderId } = request.params

      const deleteOrder = makeDeleteOrder()

      await deleteOrder.execute({
        orderId,
      })

      return reply.status(204).send()
    },
  )
}
