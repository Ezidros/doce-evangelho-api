import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeFetchOrderById } from '../../factories/make-get-order-by-id'

export async function getOrderByIdController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/update/order/:orderId',
    {
      schema: {
        tags: ['orders'],
        summary: 'Fetch an order by id',
        params: z.object({
          orderId: z.string().uuid(),
        }),
      },
    },
    async (request) => {
      const { orderId } = request.params

      const fetchOrder = makeFetchOrderById()

      const { order } = await fetchOrder.execute({
        orderId,
      })

      return { order }
    },
  )
}
