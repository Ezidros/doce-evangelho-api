import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeMarkCakeAsSold } from '../../factories/make-mark-cake-as-sold'

export async function markCakeAsSoldController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sold/order/:cakeId',
    {
      schema: {
        tags: ['orders'],
        summary: 'Mark a cake as sold and create a new order',
        params: z.object({
          cakeId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { cakeId } = request.params

      const createOrder = makeMarkCakeAsSold()

      await createOrder.execute({ cakeId })

      return reply.status(201).send()
    },
  )
}
