import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { makeFetchAllOrders } from '../../factories/make-get-all-orders'

export async function getAllOrdersController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/fetch/orders',
    {
      schema: {
        tags: ['orders'],
        summary: 'Creates a new order',
      },
    },
    async () => {
      const getAllOrders = makeFetchAllOrders()

      const { orders } = await getAllOrders.execute()

      return { orders }
    },
  )
}
