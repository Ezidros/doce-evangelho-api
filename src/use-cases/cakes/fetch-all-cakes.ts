import { Cake } from '@prisma/client'
import { CakesRepository } from '../../repositories/cakes-repository'

interface FetchAllCakesUseCaseResponse {
  cakes: Cake[]
}

export class FetchAllCakesUseCase {
  constructor(public cakeRepository: CakesRepository) {}

  async execute(): Promise<FetchAllCakesUseCaseResponse> {
    const cakes = await this.cakeRepository.fetchAllCakes()

    return { cakes }
  }
}
