import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeCountNewCakes } from '../../factories/make-count-cakes'

export async function countCakesController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/count/cake/:cakeId',
    {
      schema: {
        tags: ['cakes'],
        summary: 'Count cakes',
        params: z.object({
          cakeId: z.string().uuid(),
        }),
      },
    },
    async (request) => {
      const { cakeId } = request.params

      const countCakes = makeCountNewCakes()

      const { count } = await countCakes.execute({
        cakeId,
      })

      return { count }
    },
  )
}
