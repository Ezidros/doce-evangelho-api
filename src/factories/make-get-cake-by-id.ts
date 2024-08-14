import { PrismaCakeRepository } from '../repositories/prisma/prisma-cakes-repository'
import { FetchCakeByIdUseCase } from '../use-cases/cakes/fetch-cake-by-id'

export function makeFetchCakeById() {
  const cakeRepository = new PrismaCakeRepository()
  const fetchCakeById = new FetchCakeByIdUseCase(cakeRepository)

  return fetchCakeById
}
