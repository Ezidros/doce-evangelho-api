import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeDeleteCake } from '../../factories/make-delete-cake'

export async function deleteCakeController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/delete/cake/:cakeId',
    {
      schema: {
        tags: ['cakes'],
        summary: 'Delete cake data',
        params: z.object({
          cakeId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { cakeId } = request.params

      const deleteCake = makeDeleteCake()

      await deleteCake.execute({
        cakeId,
      })

      return reply.status(204).send()
    },
  )
}
