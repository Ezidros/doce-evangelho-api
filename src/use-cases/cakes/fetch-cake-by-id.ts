import { Cake } from '@prisma/client'
import { CakesRepository } from '../../repositories/cakes-repository'

interface FetchCakeByIdUseCaseRequest {
  cakeId: string
}

interface FetchCakeByIdUseCaseResponse {
  cake: Cake | null
}

export class FetchCakeByIdUseCase {
  constructor(public cakeRepository: CakesRepository) {}

  async execute({
    cakeId,
  }: FetchCakeByIdUseCaseRequest): Promise<FetchCakeByIdUseCaseResponse> {
    const cake = await this.cakeRepository.fetchById(cakeId)

    if (!cake) {
      throw new Error()
    }

    return { cake }
  }
}
