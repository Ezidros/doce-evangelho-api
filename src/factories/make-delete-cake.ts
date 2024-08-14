import { PrismaCakeRepository } from '../repositories/prisma/prisma-cakes-repository'
import { DeleteCakeUseCase } from '../use-cases/cakes/delete-cake'

export function makeDeleteCake() {
  const cakeRepository = new PrismaCakeRepository()
  const deleteCakeRepository = new DeleteCakeUseCase(cakeRepository)

  return deleteCakeRepository
}
