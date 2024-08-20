import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeFetchAllOrders } from '../../factories/make-get-all-orders'

export async function getAllOrdersController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/fetch/orders',
    {
      schema: {
        tags: ['orders'],
        summary: 'Fetch all orders with pagination',
        querystring: z.object({
          page: z.coerce.number().int().min(1).default(1),
          limit: z.coerce.number().int().min(1).max(100).default(10),
        }),
      },
    },
    async (request) => {
      const { page, limit } = request.query

      const getAllOrders = makeFetchAllOrders()

      const { orders } = await getAllOrders.execute(page, limit)

      return { orders }
    },
  )
}
