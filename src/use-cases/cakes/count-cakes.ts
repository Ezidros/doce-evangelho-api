import { CakesRepository } from '../../repositories/cakes-repository'

interface CountCakeUseCaseRequest {
  cakeId: string
}

interface CountCakeUseCaseResponse {
  count: number
}

export class CountCakeUseCase {
  constructor(public cakeRepository: CakesRepository) {}

  async execute({
    cakeId,
  }: CountCakeUseCaseRequest): Promise<CountCakeUseCaseResponse> {
    const count = await this.cakeRepository.countCakes(cakeId)

    return { count }
  }
}
