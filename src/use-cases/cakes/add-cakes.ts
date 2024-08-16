import { CakesRepository } from '../../repositories/cakes-repository'

interface AddCakeUseCaseRequest {
  cakeId: string
}

interface AddCakeUseCaseResponse {
  count: number
}

export class AddCakeUseCase {
  constructor(public cakeRepository: CakesRepository) {}

  async execute({
    cakeId,
  }: AddCakeUseCaseRequest): Promise<AddCakeUseCaseResponse> {
    const count = await this.cakeRepository.addCakeById(cakeId)

    return { count }
  }
}
