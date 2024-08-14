import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { makeFetchAllCakes } from '../../factories/make-fetch-all-cakes'

export async function fetchAllCakeController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/fetch/cakes',
    {
      schema: {
        tags: ['cakes'],
        summary: 'Creates a new cake',
      },
    },
    async () => {
      const fetchAllCakes = makeFetchAllCakes()

      const { cakes } = await fetchAllCakes.execute()

      return { cakes }
    },
  )
}
