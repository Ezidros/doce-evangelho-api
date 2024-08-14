import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeCreateCake } from '../../factories/make-create-cake'

export async function createCakeController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/create/cake',
    {
      schema: {
        tags: ['cakes'],
        summary: 'Creates a new cake',
        body: z.object({
          flavor: z.string(),
          filling: z.string(),
          description: z.string(),
          price: z.string(),
          isSpecialFlavor: z.boolean().default(false),
          isSolded: z.boolean().default(false),
        }),
      },
    },
    async (request, reply) => {
      const data = request.body

      const createCake = makeCreateCake()

      await createCake.execute({
        flavor: data.flavor,
        filling: data.filling,
        price: data.price,
        description: data.description,
        isSolded: data.isSolded ?? false,
        isSpecialFlavor: data.isSpecialFlavor ?? false,
      })

      return reply.status(201).send()
    },
  )
}
