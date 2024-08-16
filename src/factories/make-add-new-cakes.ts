import { PrismaCakeRepository } from '../repositories/prisma/prisma-cakes-repository'
import { AddCakeUseCase } from '../use-cases/cakes/add-cakes'

export function makeAddNewCakes() {
  const cakeRepository = new PrismaCakeRepository()
  const addCakes = new AddCakeUseCase(cakeRepository)

  return addCakes
}
