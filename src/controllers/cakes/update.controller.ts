import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeUpdateCake } from '../../factories/make-update-cake'

export async function updateCakeController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/update/cake/:cakeId',
    {
      schema: {
        tags: ['cakes'],
        summary: 'Update cake data',
        params: z.object({
          cakeId: z.string().uuid(),
        }),
        body: z.object({
          flavor: z.string(),
          filling: z.string(),
          description: z.string(),
          price: z.string(),
          quantity: z.coerce.number().nullable(),
          isSpecialFlavor: z.boolean().default(false),
          isSolded: z.boolean().default(false),
        }),
      },
    },
    async (request, reply) => {
      const data = request.body
      const { cakeId } = request.params

      const createCake = makeUpdateCake()

      await createCake.execute({
        cakeId,
        flavor: data.flavor,
        filling: data.filling,
        price: data.price,
        quantity: data.quantity,
        description: data.description,
        isSolded: data.isSolded ?? false,
        isSpecialFlavor: data.isSpecialFlavor ?? false,
      })

      return reply.status(204).send()
    },
  )
}
