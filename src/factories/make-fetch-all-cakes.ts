import { PrismaCakeRepository } from '../repositories/prisma/prisma-cakes-repository'
import { FetchAllCakesUseCase } from '../use-cases/cakes/fetch-all-cakes'

export function makeFetchAllCakes() {
  const cakeRepository = new PrismaCakeRepository()
  const fatchAllCakes = new FetchAllCakesUseCase(cakeRepository)

  return fatchAllCakes
}
