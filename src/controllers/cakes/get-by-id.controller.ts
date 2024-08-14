import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeFetchCakeById } from '../../factories/make-get-cake-by-id'

export async function getCakeByIdController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/fetch/cake/:cakeId',
    {
      schema: {
        tags: ['cakes'],
        summary: 'Update cake data',
        params: z.object({
          cakeId: z.string().uuid(),
        }),
      },
    },
    async (request) => {
      const { cakeId } = request.params

      const cakeById = makeFetchCakeById()

      const { cake } = await cakeById.execute({
        cakeId,
      })

      return { cake }
    },
  )
}
