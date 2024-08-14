import { PrismaCakeRepository } from '../repositories/prisma/prisma-cakes-repository'
import { CreateCakeUseCase } from '../use-cases/cakes/create-cake'

export function makeCreateCake() {
  const cakeRepository = new PrismaCakeRepository()
  const createCakeRepository = new CreateCakeUseCase(cakeRepository)

  return createCakeRepository
}
