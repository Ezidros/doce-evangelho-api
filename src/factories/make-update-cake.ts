import { PrismaCakeRepository } from '../repositories/prisma/prisma-cakes-repository'
import { UpdateCakeUseCase } from '../use-cases/cakes/update-cake'

export function makeUpdateCake() {
  const cakeRepository = new PrismaCakeRepository()
  const updateCakeRepository = new UpdateCakeUseCase(cakeRepository)

  return updateCakeRepository
}
