import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createCakeController } from './controllers/cakes/create.controller'
import { updateCakeController } from './controllers/cakes/update.controller'
import { deleteCakeController } from './controllers/cakes/delete.controller'
import { fetchAllCakeController } from './controllers/cakes/get-all.controller'
import { getCakeByIdController } from './controllers/cakes/get-by-id.controller'
import { createOrderController } from './controllers/orders/create.controller'
import { updateOrderController } from './controllers/orders/update.controller'
import { deleteOrderController } from './controllers/orders/delete.controller'
import { getAllOrdersController } from './controllers/orders/get-all.controller'
import { getOrderByIdController } from './controllers/orders/get-by-id.controller'
import { addCakesController } from './controllers/cakes/add-cakes.controller'
import { markCakeAsSoldController } from './controllers/orders/mark-cake-as-sold.controller'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Daily diet',
      description: 'API for diet control',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

// Cakes
app.register(createCakeController)
app.register(updateCakeController)
app.register(deleteCakeController)
app.register(fetchAllCakeController)
app.register(getCakeByIdController)
app.register(addCakesController)

// Orders
app.register(createOrderController)
app.register(updateOrderController)
app.register(deleteOrderController)
app.register(getAllOrdersController)
app.register(getOrderByIdController)
app.register(markCakeAsSoldController)

app
  .listen({
    host: '0.0.0.0',
    port: 3333,
  })
  .then(() => console.log('HTTP server running!'))
