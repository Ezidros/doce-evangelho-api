import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeAddNewCakes } from '../../factories/make-add-new-cakes'

export async function addCakesController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    '/add/cake/:cakeId',
    {
      schema: {
        tags: ['cakes'],
        summary: 'Add cakes',
        params: z.object({
          cakeId: z.string().uuid(),
        }),
        body: z.object({
          quantity: z.number().nullable(),
        }),
      },
    },
    async (request) => {
      const { cakeId } = request.params
      const { quantity } = request.body

      const addCakes = makeAddNewCakes()

      const { count } = await addCakes.execute({
        cakeId,
        quantity: quantity! + 1,
      })

      return { count }
    },
  )
}
