import { PrismaCakeRepository } from '../repositories/prisma/prisma-cakes-repository'
import { CountCakeUseCase } from '../use-cases/cakes/count-cakes'

export function makeCountNewCakes() {
  const cakeRepository = new PrismaCakeRepository()
  const countCakes = new CountCakeUseCase(cakeRepository)

  return countCakes
}
